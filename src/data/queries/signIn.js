import {
  GraphQLError,
  GraphQLNonNull as NonNull,
  GraphQLString as StringType,
} from 'graphql';
import UserType from '../types/UserType';
import { User } from '../models';

const signIn = {
  type: UserType,
  args: {
    email: {
      type: new NonNull(StringType),
    },
    password: {
      type: new NonNull(StringType),
    },
  },
  resolve(root, args) {
    return User.findOne({
      where: {
        email: args.email,
      },
    }).then(user => {
      // When user is not found
      if (!user) {
        throw new GraphQLError('An error occurred, an invalid email address.');
      }

      // When password is not correct
      if (args.password !== user.password) {
        throw new GraphQLError('An error occurred, an invalid password.');
      }

      return {
        id: user.id,
        email: user.email,
      };
    });
  },
};

export default signIn;
