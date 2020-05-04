import {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLID,
  GraphQLInterfaceType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

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

export const UserFields = {
  email: {
    type: new GraphQLNonNull(GraphQLString),
  },
  emailConfirmed: {
    type: new GraphQLNonNull(GraphQLBoolean),
  },
  firstName: {
    type: GraphQLString,
  },
  lastName: {
    type: GraphQLString,
  },
  phone: {
    type: GraphQLString,
  },
  phoneConfirmed: {
    type: new GraphQLNonNull(GraphQLBoolean),
  },
  gender: {
    type: new GraphQLNonNull(GraphQLString),
  },
  language: {
    type: new GraphQLNonNull(languageType),
  },
  website: {
    type: GraphQLString,
  },
};

export const UserInterfaceType = new GraphQLInterfaceType({
  name: 'UserInterface',
  fields: {
    ...UserFields
  }
});

export const UserType = new GraphQLObjectType({
  name: 'User',
  interfaces: [
    UserInterfaceType
  ],
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    ...UserFields
  },
});
