import sequelize from '../sequelize';
import Service from './Service';
import Subscriber from './Subscriber';
import Subscription from './Subscription';
import User from './User';
import UserProfile from './UserProfile';

// User
User.hasOne(Subscriber, {
  foreignKey: 'id',
  as: 'subscriber',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasOne(UserProfile, {
  foreignKey: 'userId',
  as: 'profile',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

// Billing
Subscriber.belongsTo(User, {
  foreignKey: 'id',
  as: 'user',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Subscriber.hasMany(Subscription, {
  foreignKey: 'subscriberId',
  as: 'subscription',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Subscription.belongsTo(Subscriber, {
  foreignKey: 'subscriberId',
  as: 'subscriber',
  onUpdate: 'cascade',
  onDelete: 'cascade',
})

Subscription.belongsTo(Service, {
  foreignKey: 'serviceId',
  as: 'service',
  onUpdate: 'cascade',
  onDelete: 'cascade',
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
