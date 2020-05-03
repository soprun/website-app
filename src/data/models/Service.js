import DataType from 'sequelize';
import Model from '../sequelize';

const Service = Model.define(
  'service',
  {
    id: {
      type: DataType.UUIDV4,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
      validate: {
        isUUID: 4,
      },
    },
    name: {
      type: DataType.STRING(200),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataType.STRING(1000),
      allowNull: false,
    },
  }
);

export default Service;
