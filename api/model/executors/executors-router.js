"use strict";


const controller = require('./executors-controller');
const Router = require('express').Router;
const router = new Router();

router.route('/').get((req,res,next) => {
	// get route
});

router.route('/:id').post((req, res, next) => {
	// post route

});


module.exports = router;
