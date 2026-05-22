const { RiderReview } = require('../models');

exports.getReviews = async (req, res) => {
  const reviews = await RiderReview.findAll({ where: { rider_id: req.user.id } });
  res.json(reviews);
};
