"use strict";

const controller = require('./vendors-controller');
const Router = require('express').Router;
const router = new Router();
const User = require('../users/users-schema');
const Executor = require('../executors/executors-schema');
const Vendor = require('./vendors-schema');



/***************************************************************************************
<baseURL>/vendors/
CRUD handled by GET, POST, PUT, DELETE routes
***************************************************************************************/
// GET <baseURL>/vendors/
router.route('/').get((req,res,next) => {
	// TODO: Implement
});


// POST <baseURL>/vendors/
router.route('/').post((req,res,next) => {
	// TODO: Implement	
});


// PUT <baseURL>/vendors/
router.route('/').put((req,res,next) => {
	// TODO: Implement	
});


// DELETE <baseURL>/vendors/
router.route('/').delete((req,res,next) => {
	// TODO: Implement	
});


module.exports = router;
