'use strict';
const _ = require('lodash');
const CommonService = require('./common.service');
const { ProjectsService } = require('./projects.service');

module.exports = (router) => {
    router.get('/health/check', (req, res, next) => {
        res.send(_.pick(require('./package.json'), ['name', 'version']))
    });

    router.get('/projects', async (req, res, next) => {    
        try {
            const projects = await CommonService.executeAndSendResult(
              async() => new ProjectsService().getAllProjects(res),
              res,
              next
            );
            res.json(projects);
          } catch (error) {
            next(error);
          }
    });
    
    router.get('/projects/:projectId', (req, res, next) => {
      CommonService.executeAndSendResult(async () => {
        return await new ProjectsService().getProjectById(req, res);
      }, res, next);
    });
    
    router.post('/projects', (req, res, next) => {
      CommonService.executeAndSendResult(async () => {
        return await new ProjectsService().createProject(req.body, res);
      }, res, next);
    });
    
    router.patch('/projects/:projectId', (req, res, next) => {
      CommonService.executeAndSendResult(async () => {
        return await new ProjectsService().updateProject(req, res);
      }, res, next);
    });
    
    router.delete('/projects/:projectId', (req, res, next) => {
      CommonService.executeAndSendResult(async () => {
        return await new ProjectsService().deleteProject(req, res);
      }, res, next);
    });

    return router;
}