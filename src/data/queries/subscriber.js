import { GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";
import { SubscriberType } from "../types/SubscriberType";

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

export const subscribers = {
  type: new GraphQLList(SubscriberType),
  resolve(root, args) {
    console.log(args.id)
  },
};
