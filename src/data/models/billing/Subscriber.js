import DataType from 'sequelize';
import Model from '../../sequelize';

const Subscriber = Model.define(
  'subscriber',
  {
    id: {
      type: DataType.UUIDV4,
      defaultValue: DataType.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
      validate: {
        isUUID: 4,
      },
    },
  }
);

export default Subscriber;
