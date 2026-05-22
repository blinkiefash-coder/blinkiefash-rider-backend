const { SupportTicket } = require('../models');

exports.getTickets = async (req, res) => {
  const tickets = await SupportTicket.findAll({ where: { rider_id: req.user.id } });
  res.json(tickets);
};

exports.createTicket = async (req, res) => {
  const { subject, description } = req.body;
  const ticket = await SupportTicket.create({
    rider_id: req.user.id,
    subject,
    description,
    status: 'open',
    created_at: new Date(),
  });
  res.json(ticket);
};
