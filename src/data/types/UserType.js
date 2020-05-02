import {
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from 'graphql';

const UserType = new ObjectType({
  name: 'User',
  fields: {
    id: {
      type: new NonNull(ID),
    },
    email: {
      type: new NonNull(StringType),
    },
  },
});

export default UserType;
