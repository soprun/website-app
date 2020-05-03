import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import TransactionType from "./TransactionType";
import UserType from "./UserType";

const CustomerItemType = new GraphQLObjectType({
  name: 'CustomerItem',
  fields: {
    user: {
      type: new GraphQLNonNull(UserType),
    },
    transactions: {
      type: new GraphQLList(TransactionType),
    },
  },
});

export default CustomerItemType;
