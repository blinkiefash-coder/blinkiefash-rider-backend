const Sequelize = require('sequelize');
const { sequelize } = require('../db');

const Rider = sequelize.define('Rider', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  user_id: { type: Sequelize.UUID, allowNull: false },
  vehicle_type: Sequelize.STRING,
  vehicle_number: Sequelize.STRING,
  license_number: Sequelize.STRING,
  is_available: Sequelize.BOOLEAN,
  is_verified: Sequelize.BOOLEAN,
  current_lat: Sequelize.DECIMAL,
  current_lng: Sequelize.DECIMAL,
  last_active: Sequelize.DATE,
  earnings_balance: { type: Sequelize.DECIMAL(12,2), defaultValue: 0 },
  fcm_token: Sequelize.STRING,
  created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  updated_at: Sequelize.DATE,
}, {
  tableName: 'Riders',
  timestamps: false,
});

module.exports = Rider;