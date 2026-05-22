const Sequelize = require('sequelize');
const { sequelize } = require('../db');

const OrderItem = sequelize.define('OrderItem', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  order_id: { type: Sequelize.UUID, allowNull: false },
  variant_id: Sequelize.UUID,
  quantity: Sequelize.INTEGER,
  price: Sequelize.DECIMAL(12,2),
  item_status: Sequelize.STRING,
}, {
  tableName: 'order_items',
  timestamps: false,
});

module.exports = OrderItem;