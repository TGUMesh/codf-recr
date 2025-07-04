const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  clubId: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  type: { type: String, enum: ['workshop', 'seminar', 'competition', 'cultural', 'sports', 'social'], required: true },
  status: { type: String, enum: ['upcoming', 'ongoing', 'completed', 'cancelled'], default: 'upcoming' },
  maxParticipants: { type: Number },
  registeredParticipants: { type: Number, default: 0 },
  organizer: { type: String, required: true },
  contactEmail: { type: String, required: true },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Event', eventSchema); 