import sequelize from '../sequelize';
import Service from './Service';
import Subscriber from './Subscriber';
import Subscription from './Subscription';
import User from './User';

// User
User.hasOne(Subscriber, {
  foreignKey: 'id',
  as: 'subscriber',
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
  Service,
  Subscriber,
  Subscription,
};
