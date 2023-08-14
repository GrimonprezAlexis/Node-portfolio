'use strict';
const mongoose = require('mongoose');
const Project = require('../models/projects');
const CommonService = require('../helpers/common.service');

module.exports.ProjectsService = class ProjectsService {

    async getAllProjects(res) {
        try {
            const projects = await Project.find();
            CommonService.sendSuccessResponse(res, projects);
        } catch (error) {
            CommonService.handleError(res, error, 'Error fetching projects');
        }
    }

    async getProjectById(req, res) {
        const projectId = req.params.projectId;
        try {
            const project = await Project.findById(projectId);
            if (!project) {
                CommonService.handleNotFoundError(res, `No project found with id ${projectId}`);
            } else {
                CommonService.sendSuccessResponse(res, project);
            }
        } catch (err) {
            CommonService.handleError(res, err, 'Error fetching project by ID');
        }
    }

    async createProject(body, res) {
        CommonService.checkRequiredProperties(body, ['title', 'subtitle', 'technologies', 'description', 'links']);

        try {
            const newProject = new Project({
                _id: new mongoose.Types.ObjectId(),
                ...body
            });
            const savedProject = await newProject.save();
            CommonService.sendSuccessResponse(res, savedProject._id);
        } catch (error) {
            CommonService.handleError(res, error, 'Error creating project');
        }
    }

    async updateProject(req, res) {
        const projectId = req.params.projectId;
        const projectData = req.body;

        try {
            const updatedProject = await Project.findByIdAndUpdate(
                { _id: new mongoose.Types.ObjectId(projectId) },
                projectData,
                { new: true }
            );

            if (!updatedProject) {
                CommonService.handleNotFoundError(res, `No project found with id ${projectId}`);
            } else {
                CommonService.sendSuccessResponse(res, updatedProject._id);
            }

        } catch (error) {
            CommonService.handleError(res, error, 'Error updating project');
        }
    }

    async deleteProject(req, res) {
        const projectId = req.params.projectId;
        CommonService.checkAndHandleValidObjectId(projectId);

        try {
            const deletedProject = await Project.findByIdAndDelete(projectId);

            if (!deletedProject) {
                CommonService.handleNotFoundError(res, `No project found with id ${projectId}`);
            } else {
                CommonService.sendSuccessResponse(res, deletedProject._id);
            }

        } catch (error) {
            CommonService.handleError(res, error, 'Error deleting project');
        }
    }
};
