import { GraphQLID, GraphQLNonNull, GraphQLObjectType } from 'graphql';

const TransactionType = new GraphQLObjectType({
  name: 'Transaction',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
});

export default TransactionType;
