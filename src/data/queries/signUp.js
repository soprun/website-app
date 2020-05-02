import {
  GraphQLError,
  GraphQLNonNull as NonNull,
  GraphQLString as StringType,
} from 'graphql';
import UserType from '../types/UserType';
import { User } from '../models';

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
  resolve(root, { email, password }) {
    return User.create({
      email,
      password,
      emailConfirmed: false,
    }).then(user => user);
  },
};

export default signUp;
