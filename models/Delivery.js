const Sequelize = require('sequelize');
const { sequelize } = require('../db');

const Delivery = sequelize.define('Delivery', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  order_id: { type: Sequelize.UUID, allowNull: false },
  rider_id: { type: Sequelize.UUID, allowNull: false },
  status: Sequelize.STRING,
  started_at: Sequelize.DATE,
  completed_at: Sequelize.DATE,
  store_id: Sequelize.UUID,
  delivery_fee: Sequelize.DECIMAL(10,2),
  distance: Sequelize.DECIMAL(8,2),
  estimated_time: Sequelize.INTEGER,
}, {
  tableName: 'deliveries',
  timestamps: false,
});

module.exports = Delivery;