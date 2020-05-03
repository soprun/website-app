import sequelize from '../sequelize';
import User from './User';
import UserProfile from './UserProfile';
// Billing
import Subscriber from './billing/Subscriber';
import Service from './billing/Service';
import Subscription from './billing/Subscription';

// User.hasOne(UserProfile, {
//   foreignKey: 'userId',
//   as: 'profile',
//   onUpdate: 'cascade',
//   onDelete: 'cascade',
// });

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
})

Subscription.belongsTo(Service, {
  foreignKey: 'serviceId',
  as: 'service',
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
