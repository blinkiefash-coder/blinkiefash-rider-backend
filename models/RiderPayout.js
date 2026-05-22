const Sequelize = require('sequelize');
const { sequelize } = require('../db');

const RiderPayout = sequelize.define('RiderPayout', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  rider_id: { type: Sequelize.UUID, allowNull: false },
  amount: Sequelize.DECIMAL(12,2),
  payout_date: Sequelize.DATE,
  status: Sequelize.STRING,
  reference: Sequelize.STRING,
  created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
}, {
  tableName: 'rider_payouts',
  timestamps: false,
});

module.exports = RiderPayout;