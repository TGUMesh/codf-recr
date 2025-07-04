const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Club = require('../models/Club');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({ msg: 'User not found' });
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};

const checkRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ msg: 'Access denied' });
  }
  next();
};

const isPresidentOfClub = async (req, res, next) => {
  const club = await Club.findById(req.params.id);
  if (!club || club.presidentId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ msg: 'Not your club' });
  }
  next();
};

const isFacultyOfClub = async (req, res, next) => {
  const club = await Club.findById(req.params.id);
  if (!club || club.facultyCoordinatorId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ msg: 'Not your club' });
  }
  next();
};

module.exports = { authMiddleware, checkRole, isPresidentOfClub, isFacultyOfClub }; 