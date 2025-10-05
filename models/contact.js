const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  favoriteColor: { type: String },
  birthday: { type: Date }
});

module.exports = mongoose.model('Contact', contactSchema);
