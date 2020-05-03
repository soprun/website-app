import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { ServiceType } from "./ServiceType";

const fields = {
  service: {
    type: new GraphQLNonNull(ServiceType),
  },
  start: {
    type: new GraphQLNonNull(GraphQLString),
  },
  expiration: {
    type: GraphQLString,
  },
};

export const SubscriptionType = new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    ...fields
  },
});
