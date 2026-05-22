const Sequelize = require('sequelize');
const { sequelize } = require('../db');

const OrderStatusLog = sequelize.define('OrderStatusLog', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  order_id: { type: Sequelize.UUID, allowNull: false },
  status: Sequelize.STRING,
  changed_at: Sequelize.DATE,
}, {
  tableName: 'order_status_logs',
  timestamps: false,
});

module.exports = OrderStatusLog;