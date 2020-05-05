import { GraphQLNonNull as NonNull, GraphQLString as StringType, } from 'graphql';
import { UserType } from '../types/UserType';
import { Subscriber, User, UserProfile } from '../models';

/**
 * @deprecated
 */
const signUp = {
  type: UserType,
  args: {
    email: {
      type: new NonNull(StringType),
    },
    password: {
      type: new NonNull(StringType),
    },
  },
  resolve(root, {email, password}) {
    return User.create(
      {
        email: email,
        password: password,
        profile: {},
        subscriber: {}
      }, {
        include: [
          {
            model: UserProfile,
            as: 'profile',
            required: true
          },
          {
            model: Subscriber,
            as: 'subscriber',
            required: true
          },
        ],
      }
    ).then(result => result);
  },
};

export default signUp;
