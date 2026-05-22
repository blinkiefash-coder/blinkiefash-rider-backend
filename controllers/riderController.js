const { Rider, RiderReview, RiderShift, SupportTicket, Notification, RiderPayout, User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    console.log('[login] attempt for phone:', phone);
    if (!phone || !password) return res.status(400).json({ message: 'Phone and password required' });
    const user = await User.findOne({ where: { phone, role: 'rider' } });
    console.log('[login] user found:', user ? user.id : 'NOT FOUND');
    if (!user) return res.status(404).json({ message: 'Rider not found' });
    const valid = await bcrypt.compare(password, user.password);
    console.log('[login] password valid:', valid);
    if (!valid) return res.status(401).json({ message: 'Invalid password' });
    const rider = await Rider.findOne({ where: { user_id: user.id } });
    console.log('[login] rider found:', rider ? rider.id : 'NOT FOUND');
    if (!rider) return res.status(404).json({ message: 'Rider profile not found' });
    const token = jwt.sign(
      { id: rider.id, userId: user.id, role: 'rider' },
      process.env.JWT_SECRET || 'secret'
    );
    res.json({ token, name: user.name });
  } catch (err) {
    console.error('[login] error:', err.message);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

exports.firebaseLogin = async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ message: 'idToken required' });
    const admin = require('firebase-admin');
    const decoded = await admin.auth().verifyIdToken(idToken);
    const phoneNumber = decoded.phone_number;
    if (!phoneNumber) return res.status(400).json({ message: 'Phone number not found in token' });
    const digits = phoneNumber.replace(/\D/g, '');
    const phone10 = digits.slice(-10);
    const { Op } = require('sequelize');
    const user = await User.findOne({
      where: { phone: { [Op.like]: `%${phone10}` }, role: 'rider' },
    });
    if (!user) return res.status(401).json({ message: 'Rider not found. Contact admin.' });
    const rider = await Rider.findOne({ where: { user_id: user.id } });
    const token = jwt.sign(
      { id: rider ? rider.id : user.id, userId: user.id, role: 'rider' },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '30d' }
    );
    res.json({ token, name: user.name });
  } catch (err) {
    console.error('[firebaseLogin] error:', err.message);
    res.status(500).json({ message: 'Authentication failed' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const rider = await Rider.findByPk(req.user.id);
    if (!rider) return res.status(404).json({ message: 'Not found' });
    const user = await User.findByPk(rider.user_id);
    res.json({ ...rider.toJSON(), name: user?.name, phone: user?.phone, email: user?.email });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile', error: err.message });
  }
};

exports.getKYC = async (req, res) => {
  // Implement KYC fetch logic
  res.json({ message: 'KYC details here' });
};

exports.getEarnings = async (req, res) => {
  try {
    const payouts = await RiderPayout.findAll({ where: { rider_id: req.user.id }, order: [['created_at', 'DESC']] });
    const rider = await Rider.findByPk(req.user.id);
    res.json({ payouts, balance: rider?.earnings_balance || 0 });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await RiderReview.findAll({ where: { rider_id: req.user.id }, order: [['created_at', 'DESC']] });
    res.json(reviews);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getShifts = async (req, res) => {
  try {
    const shifts = await RiderShift.findAll({ where: { rider_id: req.user.id }, order: [['start_time', 'DESC']] });
    res.json(shifts);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({ where: { user_id: req.user.userId }, order: [['created_at', 'DESC']] });
    res.json(notifications);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getSupportTickets = async (req, res) => {
  try {
    const tickets = await SupportTicket.findAll({ where: { rider_id: req.user.id }, order: [['created_at', 'DESC']] });
    res.json(tickets);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.toggleAvailability = async (req, res) => {
  try {
    const { is_available } = req.body;
    await Rider.update({ is_available }, { where: { id: req.user.id } });
    res.json({ is_available });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getKYC = async (req, res) => {
  res.json({ status: 'pending', message: 'Please visit office for document verification' });
};

exports.updateLocation = async (req, res) => {
  try {
    const { lat, lng } = req.body;
    if (lat == null || lng == null) return res.status(400).json({ message: 'lat and lng required' });
    await Rider.update(
      { current_lat: lat, current_lng: lng, last_active: new Date() },
      { where: { id: req.user.id } }
    );
    res.json({ message: 'Location updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.saveFcmToken = async (req, res) => {
  try {
    const { fcm_token } = req.body;
    if (!fcm_token) return res.status(400).json({ message: 'fcm_token required' });
    await Rider.update({ fcm_token }, { where: { id: req.user.id } });
    res.json({ message: 'FCM token saved' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
