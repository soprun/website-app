import { IncludeOptions, Instance, Model } from "sequelize";

class GraphQLResolve {
  args: any;
  model: Model;
  include: Array<Model<any, any> | IncludeOptions>;

  constructor(
    model: Model,
    include: Array<Model<any, any> | IncludeOptions>
  ) {
    this.model = model;
    this.include = include;
  }

  get id(): string {
    return this.args.id || this.args.input.id || '';
  }

  init(args: any): this {
    this.args = args;
    return this;
  }

  find(): Promise<Model | Instance | null> {
    return this.model.findOne({
      where: {
        id: this.id
      },
      include: this.include
    });
  }

  findAll(): Promise<Model | Instance | Array | null> {
    // offset: number, limit: number
    return this.model.findAll({
      offset: this.args.offset,
      limit: this.args.limit,
      include: this.include
    });
  }

  // dataTransfer(value: Array<string | number>) {
  //   return {
  //     id: value.id,
  //     dasd: value.name,
  //   }
  // }

  update() {
  }
}

export default GraphQLResolve
