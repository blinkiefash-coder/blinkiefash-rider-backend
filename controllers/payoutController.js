const { RiderPayout } = require('../models');

exports.getPayouts = async (req, res) => {
  const payouts = await RiderPayout.findAll({ where: { rider_id: req.user.id } });
  res.json(payouts);
};

exports.requestPayout = async (req, res) => {
  const { amount } = req.body;
  const payout = await RiderPayout.create({
    rider_id: req.user.id,
    amount,
    payout_date: new Date(),
    status: 'pending',
  });
  res.json(payout);
};
