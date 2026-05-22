const Sequelize = require('sequelize');
const { sequelize } = require('../db');

const Notification = sequelize.define('Notification', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  user_id: { type: Sequelize.UUID, allowNull: false },
  title: Sequelize.STRING,
  message: Sequelize.STRING,
  is_read: Sequelize.BOOLEAN,
  created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  device_token: Sequelize.STRING,
}, {
  tableName: 'notifications',
  timestamps: false,
});

module.exports = Notification;