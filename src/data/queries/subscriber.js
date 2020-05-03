import { GraphQLID, GraphQLNonNull } from "graphql";
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
