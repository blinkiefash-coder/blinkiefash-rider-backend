const Sequelize = require('sequelize');
const { sequelize } = require('../db');

const Order = sequelize.define('Order', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  user_id: { type: Sequelize.UUID, allowNull: false },
  address_id: Sequelize.UUID,
  status: Sequelize.STRING,
  total_amount: Sequelize.DECIMAL(12,2),
  final_amount: Sequelize.DECIMAL(12,2),
  created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  discount_amount: Sequelize.DECIMAL(12,2),
  tax_amount: Sequelize.DECIMAL(12,2),
  payment_method: Sequelize.STRING,
  is_try_order: Sequelize.BOOLEAN,
  coupon_id: Sequelize.UUID,
}, {
  tableName: 'orders',
  timestamps: false,
});

module.exports = Order;