import { GraphQLObjectType as ObjectType, GraphQLSchema as Schema, } from 'graphql';
import { service, services, serviceInput } from './queries/service';
import { subscriber, subscribers } from './queries/subscriber';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      service,
      service_all: services,
      subscriber,
      subscriber_all: subscribers,
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
