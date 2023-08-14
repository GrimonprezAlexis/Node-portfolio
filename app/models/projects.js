const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	title: String,
	description: String
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;