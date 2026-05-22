const { Notification } = require('../models');

exports.getNotifications = async (req, res) => {
  const notifications = await Notification.findAll({ where: { user_id: req.user.id } });
  res.json(notifications);
};
