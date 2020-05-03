import { GraphQLObjectType as ObjectType, GraphQLSchema as Schema, } from 'graphql';
import { service, serviceAll, serviceInput } from './queries/service';
import { subscriber, subscriberAll, subscriberInput } from './queries/subscriber';
import signIn from "./queries/signIn";
import signUp from "./queries/signUp";

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      signIn,
      signUp,
      service,
      serviceAll,
      subscriber,
      subscriberAll,
    },
  }),
  mutation: new ObjectType({
    name: 'Mutation',
    fields: {
      service: serviceInput,
      subscriber: subscriberInput,
    },
  }),
});

export default schema;
