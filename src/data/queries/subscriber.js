import { GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } from "graphql";
import { SubscriberInput, SubscriberType } from "../types/SubscriberType";
import { Subscriber, Subscription, UserProfile } from "../models";
import User from "../models/User";
import GraphQLResolve from "../../utils/GraphQLResolve";

const GQResolve = new GraphQLResolve(Subscriber, [
  {
    model: User,
    as: 'user',
    required: true,
    include: [
      {
        model: UserProfile,
        as: 'profile',
        required: true,
      }
    ]
  },
  {
    model: Subscription,
    as: 'subscription',
    required: false
  }
]);

function GraphQLResolveSerialize(Subscriber: Class<Subscriber>) {
  return {
    id: Subscriber.id,
    email: Subscriber.user.email,
    emailConfirmed: Subscriber.user.emailConfirmed,
    firstName: Subscriber.user.profile.firstName,
    lastName: Subscriber.user.profile.lastName,
    phone: Subscriber.user.profile.phone,
    phoneConfirmed: Subscriber.user.profile.phoneConfirmed,
    gender: Subscriber.user.profile.gender,
    language: Subscriber.user.profile.language,
    website: Subscriber.user.profile.website,
    subscription: Subscriber.subscription
  }
}

export const subscriber = {
  type: SubscriberType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    }
  },
  resolve(root, args) {
    return GQResolve
      .init(args)
      .find()
      .then(result => GraphQLResolveSerialize(result));
  },
};

export const subscriberAll = {
  type: new GraphQLList(SubscriberType),
  args: {
    offset: {
      type: GraphQLInt,
      defaultValue: 0
    },
    limit: {
      type: GraphQLInt,
      defaultValue: 10
    }
  },
  resolve(root, args) {
    return GQResolve
      .init(args)
      .findAll()
      .then(result => {
        return result.map((result) => GraphQLResolveSerialize(result))
      });
  },
};

export const subscriberInput = {
  type: SubscriberType,
  args: {
    input: {
      type: new GraphQLNonNull(SubscriberInput)
    }
  },
  resolve: function (root, args) {
    return GQResolve
      .init(args)
      .find()
      .then(result => GraphQLResolveSerialize(result));
  },
};
