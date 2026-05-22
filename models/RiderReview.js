const Sequelize = require('sequelize');
const { sequelize } = require('../db');

const RiderReview = sequelize.define('RiderReview', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  rider_id: { type: Sequelize.UUID, allowNull: false },
  order_id: { type: Sequelize.UUID, allowNull: false },
  rating: { type: Sequelize.INTEGER, allowNull: false },
  comment: Sequelize.TEXT,
  created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
}, {
  tableName: 'rider_reviews',
  timestamps: false,
});

module.exports = RiderReview;