import { GraphQLObjectType as ObjectType, GraphQLSchema as Schema, } from 'graphql';
import { service, serviceInput } from './queries/service';
import { subscriber } from './queries/subscriber';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      service,
      subscriber,
    },
  }),
  mutation: new ObjectType({
    name: 'Mutation',
    fields: {
      serviceInput,
    },
  }),
});

export default schema;
