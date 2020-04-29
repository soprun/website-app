/**
 * Passport.js reference implementation.
 * The database schema used in this sample is available at
 * https://github.com/membership/membership.db/tree/master/postgres
 */

import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {User} from './data/models';

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
        const find = await User.findOne({
          where: {
            email,
          },
        });

        if (find) {
          return done(null, {
            id: find.id,
            email: find.email,
          });
        }

        const user = await User.create(
          {
            email,
            password,
            emailConfirmed: false,
            profile: {
              displayName: 'displayName',
              gender: 'gender',
              picture: '',
            },
          },
          {
            include: [
              {
                model: UserProfile,
                as: 'profile',
              },
            ],
          },
        );

        return done(null, {
          id: user.id,
          email: user.email,
        });
      };

      promise().catch(done);
    },
  ),
);

export default passport;
