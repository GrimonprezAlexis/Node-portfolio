'use strict';

const router = require('express').Router({ mergeParams: true });
const CommonService = require('../../../helpers/common.service');
const { ProjectsService } = require('../../../services/projects.service');

router.get('/', async (req, res, next) => {    
    try {
        const projects = await CommonService.executeAndSendResult(
          async() => new ProjectsService().getAllProjects(req, res),
          res,
          next
        );
        res.json(projects);
      } catch (error) {
        next(error);
      }
});

router.get('/:projectId', (req, res, next) => {
  CommonService.executeAndSendResult(async () => {
    return await new ProjectsService().getProjectById(req, res);
  }, res, next);
});

module.exports = router;