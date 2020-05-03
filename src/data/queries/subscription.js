import { GraphQLList } from "graphql";
import { SubscriptionType } from "../types/SubscriptionType";

export const subscription = {
  type: new GraphQLList(SubscriptionType),
  resolve() {
  },
};
