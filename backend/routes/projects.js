// backend/routes/projects.js
const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const authMiddleware = require('../middleware/auth');

// Public: Get projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Protected: Create a project
router.post('/', authMiddleware, async (req, res) => {
    const { title, description, image, link } = req.body;
    try {
        const project = new Project({ title, description, image, link });
        await project.save();
        res.status(201).json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Protected: Update a project
router.put('/:id', authMiddleware, async (req, res) => {
    const { title, description, image, link } = req.body;
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            { title, description, image, link },
            { new: true }
        );
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Protected: Delete a project
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json({ message: 'Project deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
