import {
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from 'graphql';

const UserProfileType = new ObjectType({
  name: 'UserProfile',
  fields: {
    displayName: {
      type: new NonNull(StringType),
    },
    picture: {
      type: new NonNull(StringType),
    },
    gender: {
      type: new NonNull(StringType),
    },
    location: {
      type: new NonNull(StringType),
    },
    language: {
      type: new NonNull(StringType),
    },
    website: {
      type: new NonNull(StringType),
    },
  },
});

export default UserProfileType;
