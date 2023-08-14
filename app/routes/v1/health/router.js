'use strict'

const _ = require('lodash');

const router = require('express').Router({mergeParams: true});
module.exports = router;

router.get('/check', (req, res, next) => {
    res.send(_.pick(require('../../../../package.json'), ['name', 'version']))
});