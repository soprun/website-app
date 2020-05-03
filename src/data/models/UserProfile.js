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
    displayName: {
      type: DataType.STRING(100),
    },
    picture: {
      type: DataType.STRING(255),
    },
    gender: {
      type: DataType.STRING(50),
    },
    location: {
      type: DataType.STRING(100),
    },
    language: {
      type: DataType.STRING(50),
    },
    website: {
      type: DataType.STRING(255),
    },
  }
);

export default UserProfile;
