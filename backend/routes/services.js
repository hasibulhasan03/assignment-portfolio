const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const authMiddleware = require('../middleware/auth');

// Public: Get services
router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Protected: Create a service
router.post('/', authMiddleware, async (req, res) => {
    const { title, description, image } = req.body;
    try {
        const service = new Service({ title, description, image });
        await service.save();
        res.status(201).json(service);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Protected: Update a service
router.put('/:id', authMiddleware, async (req, res) => {
    const { title, description, image } = req.body;
    try {
        const service = await Service.findByIdAndUpdate(
            req.params.id,
            { title, description, image },
            { new: true }
        );
        if (!service) return res.status(404).json({ message: 'Service not found' });
        res.json(service);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Protected: Delete a service
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        if (!service) return res.status(404).json({ message: 'Service not found' });
        res.json({ message: 'Service deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
