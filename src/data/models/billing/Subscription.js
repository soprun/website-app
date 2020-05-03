import DataType from 'sequelize';
import Model from '../../sequelize';

const Subscription = Model.define(
  'subscription',
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
    // начало срока действия
    beginning: {
      type: DataType.DATE,
      defaultValue: null,
      allowNull: false,
    },
    // истечение срока действия
    expiration: {
      type: DataType.DATE,
      defaultValue: null,
      allowNull: true,
    },
    // action: {
    //   type: DataType.ENUM('unknown', 'append', 'delete'),
    //   defaultValue: 'unknown',
    // }
  }
);

export default Subscription;
