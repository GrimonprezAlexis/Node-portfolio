const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	title: String,
	subtitle: String,
	technologies: String,
	description: String,
	links: Object,
	imageUrl: String
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;