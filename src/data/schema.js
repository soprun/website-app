import {
  GraphQLObjectType as ObjectType,
  GraphQLSchema as Schema,
} from 'graphql';

import me from './queries/me';
import news from './queries/news';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      me,
      news,
    },
  }),
});

export default schema;
