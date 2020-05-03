import { GraphQLID, GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

const fields = {
  name: {
    type: new GraphQLNonNull(GraphQLString),
  },
  description: {
    type: new GraphQLNonNull(GraphQLString),
  }
};

export const ServiceType = new GraphQLObjectType({
  name: 'Service',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    ...fields,
  },
});

export const ServiceInput = new GraphQLInputObjectType({
  name: 'ServiceInput',
  fields: {
    ...fields,
  }
});
