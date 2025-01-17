import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressJwt, { UnauthorizedError as Jwt401Error } from 'express-jwt';
import { graphql } from 'graphql';
import expressGraphQL from 'express-graphql';
import jwt from 'jsonwebtoken';
import nodeFetch from 'node-fetch';
import React from 'react';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';
import App from './components/App';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import createFetch from './utils/createFetch';
import passport from './passport';
import router from './router';
import models from './data/models';
import schema from './data/schema';
// import assets from './asset-manifest.json'; // eslint-disable-line import/no-unresolved
import chunks from './chunk-manifest.json'; // eslint-disable-line import/no-unresolved
import config from './config';

process.on('unhandledRejection', (reason, p) => {
  console.error('An error occurred, reason:', reason);

  // console.error('Unhandled Rejection at:', p, 'reason:', reason);
  // send entire app down. Process manager will restart it
  // process.exit(1);
});

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

const app = express();

//
// If you are using proxy from external machine, you can set TRUST_PROXY env
// Default is to trust proxy headers only from loopback interface.
// -----------------------------------------------------------------------------
app.set('trust proxy', config.trustProxy);

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//
// Authentication
// -----------------------------------------------------------------------------
app.use(
  expressJwt({
    secret: config.auth.jwt.secret,
    credentialsRequired: false,
  }),
);

// Error handler for express-jwt
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  if (err instanceof Jwt401Error) {
    console.error('[express-jwt-error]', req.cookies.jwt);
    // `clearCookie`, otherwise user can't use web-app until cookie expires
    res.clearCookie('jwt');
  }
  next(err);
});

app.use(passport.initialize());

app.post(
  '/signIn',
  passport.authenticate('local', {
    failureRedirect: '/signIn?signIn=failure',
    session: false,
  }),
  (req, res) => {
    const token = jwt.sign(
      {
        id: req.user.id,
        email: req.user.email,
      },
      config.auth.jwt.secret,
      config.auth.jwt.options
    );

    const output = jwt.verify(
      token,
      config.auth.jwt.secret
    )

    output.token = token;

    res
      .status(200)
      .cookie('jwt', token, {
        httpOnly: true
      })
      .json(output);
  },
);

app.get('/profile',
  passport.authenticate('jwt', {session: false}),
  (req, res, next) => {
    res.json(req.user);
  }
);

// app.get('/logout', (req, res) => {
//   req.logout();
//   res.redirect('/');
// });

//
// Register API middleware
// -----------------------------------------------------------------------------
app.use(
  '/graphql',
  // passport.authenticate('jwt', {session: false}),
  expressGraphQL(req => ({
    schema,
    graphiql: __DEV__,
    rootValue: {request: req},
    pretty: __DEV__,
  })),
);

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*',
  // passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    try {
      const css = new Set();

      // Enables critical path CSS rendering
      // https://github.com/kriasoft/isomorphic-style-loader
      const insertCss = (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach(style => css.add(style._getCss()));
      };

      // Universal HTTP client
      const fetch = createFetch(nodeFetch, {
        baseUrl: config.api.serverUrl,
        cookie: req.headers.cookie,
        schema,
        graphql,
      });

      // Global (context) variables that can be easily accessed from any React component
      // https://facebook.github.io/react/docs/context.html
      const context = {
        fetch,
        // The twins below are wild, be careful!
        pathname: req.path,
        query: req.query,
      };

      const route = await router.resolve(context);

      if (route.redirect) {
        res.redirect(route.status || 302, route.redirect);
        return;
      }

      // todo: server-side rendering check isAuthenticated
      // if (route.isAuthenticated) {
      //   passport.authenticate('jwt', {
      //     failureRedirect: '/signIn?signIn=failure'
      //   })(req, res);
      //   return;
      // }

      const data = {...route};
      data.children = ReactDOM.renderToString(
        <App context={context} insertCss={insertCss}>
          {route.component}
        </App>,
      );
      data.styles = [{id: 'css', cssText: [...css].join('')}];

      const scripts = new Set();
      const addChunk = chunk => {
        if (chunks[chunk]) {
          chunks[chunk].forEach(asset => scripts.add(asset));
        } else if (__DEV__) {
          throw new Error(`Chunk with name '${chunk}' cannot be found`);
        }
      };
      addChunk('client');
      if (route.chunk) addChunk(route.chunk);
      if (route.chunks) route.chunks.forEach(addChunk);

      data.scripts = Array.from(scripts);
      data.app = {
        apiUrl: config.api.clientUrl,
      };

      const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
      res.status(route.status || 200);
      res.send(`<!doctype html>${html}`);
    } catch (err) {
      next(err);
    }
  });

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(pe.render(err));
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{id: 'css', cssText: errorPageStyle._getCss()}]} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err}/>)}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
const promise = models.sync().catch(err => console.error(err.stack));
if (!module.hot) {
  promise.then(() => {
    app.listen(config.port, () => {
      console.info(`The server is running at http://localhost:${config.port}/`);
    });
  });
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept('./router');
}

export default app;
