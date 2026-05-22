const Sequelize = require('sequelize');
const { sequelize } = require('../db');

const SupportTicket = sequelize.define('SupportTicket', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  rider_id: { type: Sequelize.UUID, allowNull: false },
  subject: { type: Sequelize.STRING, allowNull: false },
  description: Sequelize.TEXT,
  status: Sequelize.STRING,
  created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  resolved_at: Sequelize.DATE,
}, {
  tableName: 'support_tickets',
  timestamps: false,
});

module.exports = SupportTicket;