import sequelize from '../sequelize';
import Service from './Service';
import Subscriber from './Subscriber';
import Subscription from './Subscription';
import User from './User';
import UserProfile from './UserProfile';

User.hasOne(UserProfile, {
  foreignKey: 'userId',
  as: 'profile',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

// Billing
// Subscriber.hasOne(User, {
//   foreignKey: 'userId',
//   as: 'user',
//   onUpdate: 'cascade',
//   onDelete: 'set null',
// });

Subscription.belongsTo(Subscriber, {
  foreignKey: 'subscriberId',
  as: 'subscriber',
  // onUpdate: 'cascade',
  // onDelete: 'set null',
})

Subscription.belongsTo(Service, {
  foreignKey: 'serviceId',
  as: 'service',
  // onUpdate: 'cascade',
  // onDelete: 'set null',
})

function sync(...args) {
  return sequelize.sync(...args);
}

export default {sync};
export {
  User,
  UserProfile,
  Service,
  Subscriber,
  Subscription,
};
