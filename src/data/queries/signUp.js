import { GraphQLNonNull as NonNull, GraphQLString as StringType, } from 'graphql';
import UserType from '../types/UserType';
import { User } from '../models';
import UserProfile from "../models/UserProfile";

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
    return User.create({
      email: email,
      password: password,
      emailConfirmed: false,
      profile: {
        language: 'en',
      }
    }, {
      include: [
        {
          model: UserProfile,
          as: 'profile'
        },
      ],
    }).then(user => user);
  },
};

export default signUp;
