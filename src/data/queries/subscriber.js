import { GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";
import { SubscriberInput, SubscriberType } from "../types/SubscriberType";
import { ServiceInput, ServiceType } from "../types/ServiceType";
import { Service, Subscriber } from "../models";

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
  resolve(root, args) {
    console.log(args.id)
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
