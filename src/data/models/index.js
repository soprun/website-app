import sequelize from '../sequelize';
import User from './User';
import UserProfile from './UserProfile';

User.hasOne(UserProfile, {
  foreignKey: 'userId',
  as: 'profile',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

function sync(...args) {
  return sequelize.sync(...args);
}

export default {sync};
export { User, UserProfile };
