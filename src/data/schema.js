import {
  GraphQLObjectType as ObjectType,
  GraphQLSchema as Schema,
} from 'graphql';

import me from './queries/me';
import signIn from './queries/signIn';
import signUp from './queries/signUp';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      me,
      signIn,
    },
  }),
  mutation: new ObjectType({
    name: 'Mutation',
    fields: {
      signUp,
    },
  }),
});

export default schema;
