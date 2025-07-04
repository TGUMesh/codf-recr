const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  regNo: { type: String, required: true, unique: true },
  year: { type: Number, required: true },
  department: { type: String, required: true },
  phone: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema); 