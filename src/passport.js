/**
 * Passport.js reference implementation.
 * The database schema used in this sample is available at
 * https://github.com/membership/membership.db/tree/master/postgres
 */

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from './data/models';

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
      User.findOne(
        {
          where: {
            email,
          },
        },
        (err, user) => {
          // This is how you handle error
          if (err) return done(err);

          // When user is not found
          if (!user)
            return done(null, false, {
              message: 'An error occurred, an invalid email address.',
            });

          // When password is not correct
          if (password !== user.password) {
            return done(null, false, {
              message: 'An error occurred, an invalid password.',
            });
          }

          // When all things are good, we return the user
          return done(null, user);
        },
      );
    },
  ),
);

export default passport;
