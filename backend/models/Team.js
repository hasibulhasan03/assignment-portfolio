// backend/models/Team.js
const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String },
    image: { type: String }, // URL to team member image
});

module.exports = mongoose.model('Team', TeamSchema);
