const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String },
    image: { type: String },
});

module.exports = mongoose.model('Team', TeamSchema);
