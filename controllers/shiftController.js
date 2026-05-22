const { RiderShift } = require('../models');

exports.getShifts = async (req, res) => {
  const shifts = await RiderShift.findAll({ where: { rider_id: req.user.id } });
  res.json(shifts);
};

exports.startShift = async (req, res) => {
  const shift = await RiderShift.create({
    rider_id: req.user.id,
    start_time: new Date(),
    status: 'active',
  });
  res.json(shift);
};

exports.endShift = async (req, res) => {
  const { shiftId } = req.body;
  await RiderShift.update({ end_time: new Date(), status: 'ended' }, { where: { id: shiftId, rider_id: req.user.id } });
  res.json({ message: 'Shift ended' });
};
