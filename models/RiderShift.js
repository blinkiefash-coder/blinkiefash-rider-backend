const Sequelize = require('sequelize');
const { sequelize } = require('../db');

const RiderShift = sequelize.define('RiderShift', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  rider_id: { type: Sequelize.UUID, allowNull: false },
  start_time: { type: Sequelize.DATE, allowNull: false },
  end_time: Sequelize.DATE,
  status: Sequelize.STRING,
}, {
  tableName: 'rider_shifts',
  timestamps: false,
});

module.exports = RiderShift;