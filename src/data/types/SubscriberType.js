import { GraphQLID, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UserFields, UserInterfaceType } from "./UserType";
import { SubscriptionType } from "./SubscriptionType";

const SubscriberFields = {
  ...UserFields
};

export const SubscriberType = new GraphQLObjectType({
  name: 'Subscriber',
  interfaces: [
    UserInterfaceType
  ],
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    ...SubscriberFields,
    subscription: {
      type: new GraphQLList(SubscriptionType),
    }
  },
});

export const SubscriberInput = new GraphQLInputObjectType({
  name: 'SubscriberInput',
  fields: {
    id: {
      type: GraphQLID,
    },
    ...SubscriberFields,
  }
});
