import { GraphQLID, GraphQLNonNull } from "graphql";
import { Service } from "../models";
import { ServiceInput, ServiceType } from "../types/ServiceType";

export const service = {
  type: ServiceType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve(root, args) {
    return Service.findOne({
      where: {
        id: args.id,
      },
    }).then(result => result);
  },
};

export const serviceInput = {
  type: ServiceType,
  args: {
    input: {
      type: new GraphQLNonNull(ServiceInput)
    }
  },
  resolve(root, args) {
  },
};
