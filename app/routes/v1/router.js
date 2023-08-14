'use strict';
const v1 = require('express').Router({mergeParams: true});

v1.use('/health', require('./health/router'));
v1.use('/projects', require('./projects/router'));


module.exports = v1;