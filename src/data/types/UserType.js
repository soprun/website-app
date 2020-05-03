import { GraphQLEnumType, GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString, } from 'graphql';

export const languageType = new GraphQLEnumType({
  name: 'language',
  values: {
    en: {
      value: 'en'
    },
    ru: {
      value: 'ru'
    },
  }
});

const fields = {
  email: {
    type: new GraphQLNonNull(GraphQLString),
  },
  phone: {
    type: GraphQLString,
  },
  language: {
    type: new GraphQLNonNull(languageType),
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
