import { GraphQLID, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UserType } from "./UserType";
import { SubscriptionType } from "./SubscriptionType";

const fields = {
  user: {
    type: UserType
  },
};

export const SubscriberType = new GraphQLObjectType({
  name: 'Subscriber',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    ...fields,
    subscription: {
      type: new GraphQLList(SubscriptionType),
    }
  },
});

export const SubscriberInput = new GraphQLInputObjectType({
  name: 'SubscriberInput',
  fields: {
    ...fields,
  }
});
