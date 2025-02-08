// backend/models/Service.js
const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String }, // URL for service image (or icon)
});

module.exports = mongoose.model('Service', ServiceSchema);
