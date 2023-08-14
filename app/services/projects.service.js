'use strict';
const mongoose = require('mongoose');
const Project = require('../models/projects');

module.exports.ProjectsService = class ProjectsService {

	async getAllProjects(req, res) {
		try {
			const projects = await Project.find();
			res.json(projects);
		} catch (error) {
			console.error('Error fetching projects:', error);
			res.status(500).json({ error: 'Server error' });
		}
  	}

	async getProjectById(req, res) {
		try {
			const projectId = req.params.projectId;
			if (!mongoose.Types.ObjectId.isValid(projectId)) {
				return res.status(422).send(`Invalid ID ${projectId}`);
			}
			
			const project = await Project.findById(projectId);
			if (!project) {
				return res.status(404).send(`No project found with id ${projectId}`);
			}

			res.json(project);
		} catch (err) {
			console.error('Error fetching project by ID:', err);
			res.status(500).json({ error: 'Server error' });
		}
	}
};
