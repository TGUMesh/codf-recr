const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'president', 'faculty'], required: true },
  clubId: { type: mongoose.Schema.Types.ObjectId, ref: 'Club' },
  department: { type: String },
  regNo: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema); 