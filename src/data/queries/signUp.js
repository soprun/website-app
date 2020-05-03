import { GraphQLNonNull as NonNull, GraphQLString as StringType, } from 'graphql';
import { UserType } from '../types/UserType';
import { Subscriber, User } from '../models';

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
      language: 'en',
      subscriber: {}
    }, {
      include: [
        {
          model: Subscriber,
          as: 'subscriber'
        },
      ],
    }).then(result => result);
  },
};

export default signUp;
