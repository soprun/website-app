/**
 * Passport.js reference implementation.
 * The database schema used in this sample is available at
 * https://github.com/membership/membership.db/tree/master/postgres
 */

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { User } from './data/models';
import config from "./config";


passport.serializeUser((user, done) => {
  console.log('serializeUser', user)
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  User.findOne({where: {id}})
    .then((user) => {
      console.log('deserializeUser', user)
      done(null, user);
      return null;
    });
});

/**
 * Sign in
 */
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, done) => {
      User.findOne({
        where: {
          email,
        },
      }).then(user => {
        // When user is not found
        if (!user) {
          return done(null, false, {
            message: 'An error occurred, an invalid email address.',
          });
        }

        // When password is not correct
        if (password !== user.password) {
          return done(null, false, {
            message: 'An error occurred, an invalid password.',
          });
        }

        // When all things are good, we return the user
        return done(null, user);
      })
    },
  ),
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.auth.jwt.secret
    },
    (payload, done) => {
      console.log('JWTStrategy', payload)
    }
  )
);

export default passport;
