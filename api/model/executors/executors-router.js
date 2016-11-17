"use strict";

const controller = require('./executors-controller');
const Router = require('express').Router;
const router = new Router();
const User = require('../users/users-schema');
const Executor = require('./executors-schema');
const Vendor = require('../vendors/vendors-schema');



/***************************************************************************************
<baseURL>/executors/
CRUD handled by GET, POST, PUT, DELETE routes
***************************************************************************************/
// GET <baseURL>/executors/
router.route('/').get((req,res,next) => {
	// Send back JSON of all executors
	// TODO: Execute unit test in POSTMAN
	controller.find(req, res, next);
	
	// Note: In theory we would authenticate the user as administrator because this
	// sends back *all* data in the database as implemented. An alternate option would
	// be to send back a RESTful JSON response... the url's used to access the data
});


// POST <baseURL>/executors/
router.route('/').post((req,res,next) => {
	if (req.body) {
		// TODO: Implement unit test for creating an executor
		// TODO: Validate executor's username is unique and that each required
	}

	// If no body sent, return error message
	else {
		// TODO: Create empty POST unit test and verify works
		var errorCode = 400; // Look up HTTP respone for 'bad request' or similar
		var errResponse = {
			'developerMessage' : "POST requests to */executors/ must include a req.body",
			'userMessage': "Information missing in your signup request",
			'errorCode' : errorCode, 
			"moreInfo" : "http://github.com/sshillyer/bcbc"
		};

		res.status(errorCode).json(errResponse);
	}
});


// PUT <baseURL>/executors/
router.route('/').put((req,res,next) => {
	// TODO: Implement	
});


// DELETE <baseURL>/executors/
router.route('/').delete((req,res,next) => {
	// TODO: Implement	
});


module.exports = router;
