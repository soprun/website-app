import { GraphQLNonNull, GraphQLObjectType, GraphQLString, } from 'graphql';

const fields = {
  displayName: {
    type: new GraphQLNonNull(GraphQLString),
  },
  picture: {
    type: new GraphQLNonNull(GraphQLString),
  },
  gender: {
    type: new GraphQLNonNull(GraphQLString),
  },
  location: {
    type: new GraphQLNonNull(GraphQLString),
  },
  language: {
    type: new GraphQLNonNull(GraphQLString),
  },
  website: {
    type: new GraphQLNonNull(GraphQLString),
  },
};

export const UserProfileType = new GraphQLObjectType({
  name: 'UserProfile',
  fields: {
    ...fields
  },
});
