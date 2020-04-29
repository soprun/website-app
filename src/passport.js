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
      const promise = async () => {
        const user = await User.findOne({
          where: {
            email,
          },
        });

        if (!user) {
          return done(null, false, {
            message: 'An error occurred, an invalid email address.',
          });
        }

        if (password !== user.password) {
          return done(null, false, {
            message: 'An error occurred, an invalid password.',
          });
        }

        if (user) {
          return done(null, {
            id: user.id,
            email: user.email,
          });
        }
      };

      promise().catch(done);
    },
  ),
);

export default passport;
