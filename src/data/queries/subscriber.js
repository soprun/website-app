import { GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";
import { SubscriberInput, SubscriberType } from "../types/SubscriberType";
import { Subscriber } from "../models";
import User from "../models/User";

export const subscriber = {
  type: SubscriberType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    }
  },
  resolve(root, args) {
    console.log(args.id)
  },
};

export const subscriberAll = {
  type: new GraphQLList(SubscriberType),
  resolve() {
    return Subscriber.findAll({
      include: [
        {
          model: User,
          as: 'user',
          required: true
        }
      ],
    })
      .then(result => result);
  },
};

export const subscriberInput = {
  type: SubscriberType,
  args: {
    input: {
      type: new GraphQLNonNull(SubscriberInput)
    }
  },
  resolve(root, args) {
    return Subscriber.create({
      ...args.input
    }).then(result => result);
  },
};
