const Sequelize = require('sequelize');
const { sequelize } = require('../db');

const User = sequelize.define('User', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  phone: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  role: Sequelize.STRING,
  is_active: Sequelize.BOOLEAN,
  last_login: Sequelize.DATE,
  created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  updated_at: Sequelize.DATE,
}, {
  tableName: 'users',
  timestamps: false,
});

module.exports = User;