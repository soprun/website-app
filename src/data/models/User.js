import DataType from 'sequelize';
import Model from '../sequelize';

const User = Model.define(
  'User',
  {
    id: {
      type: DataType.UUIDV4,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
      unique: true,
      validate: {
        isUUID: 4,
      },
    },

    email: {
      type: DataType.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    emailConfirmed: {
      type: DataType.BOOLEAN,
      defaultValue: false,
    },

    // TODO: move to UserLogin
    password: {
      type: DataType.STRING(64),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    indexes: [
      {
        fields: ['email'],
      },
    ],
  },
);

export default User;
