const Sequelize = require('sequelize');
const { sequelize } = require('../db');

const DeliveryTracking = sequelize.define('DeliveryTracking', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  delivery_id: { type: Sequelize.UUID, allowNull: false },
  lat: Sequelize.DECIMAL,
  lng: Sequelize.DECIMAL,
  recorded_at: Sequelize.DATE,
}, {
  tableName: 'delivery_tracking',
  timestamps: false,
});

module.exports = DeliveryTracking;