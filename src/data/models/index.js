import sequelize from '../sequelize';
import Service from './Service';
import Subscriber from './Subscriber';
import Subscription from './Subscription';
import User from './User';

// Billing
User.hasOne(Subscriber, {
  foreignKey: 'id',
  as: 'subscriber',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Subscription.belongsTo(Subscriber, {
  foreignKey: 'subscriberId',
  as: 'subscriber',
  onUpdate: 'cascade',
  onDelete: 'set null',
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
  Service,
  Subscriber,
  Subscription,
};
