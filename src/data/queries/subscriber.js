import { GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } from "graphql";
import { SubscriberInput, SubscriberType } from "../types/SubscriberType";
import { Subscriber, Subscription, UserProfile } from "../models";
import User from "../models/User";

export const subscriber = {
  type: SubscriberType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    }
  },
  resolve(root, args) {
    console.log(args.id)
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
    return Subscriber.findAll({
      offset: args.offset,
      limit: args.limit,
      include: [
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
      ],
    })
      .then(result => {
        return result.map((result) => {
          return {
            id: result.id,
            email: result.user.email,
            emailConfirmed: result.user.emailConfirmed,
            firstName: result.user.profile.firstName,
            lastName: result.user.profile.lastName,
            phone: result.user.profile.phone,
            phoneConfirmed: result.user.profile.phoneConfirmed,
            gender: result.user.profile.gender,
            language: result.user.profile.language,
            website: result.user.profile.website,
            subscription: result.subscription
          }
        })
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
  resolve(root, args) {
    return Subscriber.create({
      ...args.input
    }).then(result => result);
  },
};
