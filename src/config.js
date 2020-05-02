/* eslint-disable max-len */

if (process.env.BROWSER) {
  throw new Error(
    'Do not import `config.js` from inside the client-side code.',
  );
}

const base_url = `http://localhost:${process.env.PORT || 3000}`;
const clientUrl = process.env.API_CLIENT_URL || base_url;
const clientHost = clientUrl.replace(/http:\/\/|https:\/\//g, "");
const serverUrl = process.env.API_SERVER_URL || base_url;
const serverHost = serverUrl.replace(/http:\/\/|https:\/\//g, "");

module.exports = {
  // Node.js app
  port: process.env.PORT || 3000,

  // https://expressjs.com/en/guide/behind-proxies.html
  trustProxy: process.env.TRUST_PROXY || 'loopback',

  // default locale is the first one
  locales: ['en-US', 'ru-RU'],

  // API Gateway
  api: {
    // API URL to be used in the client-side code
    clientUrl: clientUrl,
    clientHost: clientHost,

    // API URL to be used in the server-side code
    serverUrl: serverUrl,
    serverHost: serverHost,
  },

  // Database
  databaseUrl: process.env.DATABASE_URL || 'sqlite:database.sqlite',

  // Web analytics
  analytics: {
    // https://analytics.google.com/
    googleTrackingId: process.env.GOOGLE_TRACKING_ID, // UA-XXXXX-X
  },

  cookie: {
    secret: process.env.COOKIE_SECRET || 'secret',
    options: {
      domain: clientHost,
      secure: true,
      httpOnly: true,
      // maxAge: 3600000,
      // expires: new Date(Date.now() + 3600000)
    }
  },

  session: {
    secret: process.env.SESSION_SECRET || 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
      // secure: true,
      httpOnly: true,
      maxAge: 10 * 60 * 1000,
    }
  },

  // Authentication
  auth: {
    jwt: {
      secret: process.env.JWT_SECRET || 'React Starter Kit',
      options: {
        expiresIn: 604800,
        // notBefore: 604800,
        algorithm: 'HS256',
        issuer: serverUrl,
        audience: clientUrl + '/protected',
      }
    },

    // https://developers.facebook.com/
    facebook: {
      id: process.env.FACEBOOK_APP_ID || '186244551745631',
      secret:
        process.env.FACEBOOK_APP_SECRET || 'a970ae3240ab4b9b8aae0f9f0661c6fc',
    },

    // https://cloud.google.com/console/project
    google: {
      id:
        process.env.GOOGLE_CLIENT_ID ||
        '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
      secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd',
    },

    // https://apps.twitter.com/
    twitter: {
      key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
      secret:
        process.env.TWITTER_CONSUMER_SECRET ||
        'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ',
    },
  },
};
