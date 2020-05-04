import DataType from 'sequelize';
import Model from '../sequelize';

const UserProfile = Model.define(
  'user_profile',
  {
    userId: {
      type: DataType.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataType.STRING(100),
      allowNull: false,
    },
    lastName: {
      type: DataType.STRING(100),
      allowNull: false,
    },
    emailConfirmed: {
      type: DataType.BOOLEAN,
      defaultValue: false,
    },
    phone: {
      type: DataType.STRING(50),
      allowNull: true,
      unique: true,
    },
    gender: {
      type: DataType.ENUM('unknown', 'male', 'female'),
      defaultValue: 'unknown',
      allowNull: false,
    },
    language: {
      type: DataType.ENUM('unknown', 'ru', 'en', 'kg', 'uz'),
      defaultValue: 'en',
      allowNull: false,
    },
    website: {
      type: DataType.STRING(255),
      allowNull: false,
    },
  }
);

export default UserProfile;
