const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const authMiddleware = require('../middleware/auth');

// Public: Get team members
router.get('/', async (req, res) => {
    try {
        const team = await Team.find();
        res.json(team);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Protected: Create a team member
router.post('/', authMiddleware, async (req, res) => {
    const { name, role, image } = req.body;
    try {
        const member = new Team({ name, role, image });
        await member.save();
        res.status(201).json(member);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Protected: Update a team member
router.put('/:id', authMiddleware, async (req, res) => {
    const { name, role, image } = req.body;
    try {
        const member = await Team.findByIdAndUpdate(
            req.params.id,
            { name, role, image },
            { new: true }
        );
        if (!member) return res.status(404).json({ message: 'Team member not found' });
        res.json(member);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Protected: Delete a team member
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const member = await Team.findByIdAndDelete(req.params.id);
        if (!member) return res.status(404).json({ message: 'Team member not found' });
        res.json({ message: 'Team member deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
