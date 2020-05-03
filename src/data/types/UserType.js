import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString, } from 'graphql';

const fields = {
  email: {
    type: new GraphQLNonNull(GraphQLString),
  },
  phone: {
    type: new GraphQLNonNull(GraphQLString),
  },
  language: {
    type: new GraphQLNonNull(GraphQLString),
  }
};

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    ...fields
  },
});
