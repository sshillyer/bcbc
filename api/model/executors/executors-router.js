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
// Return JSON of all executors
// UNIT TEST STATUS: Passing
router.route('/').get((req,res,next) => {
	controller.find(req, res, next);
	
	// Note: In theory we would authenticate the user as administrator because this
	// sends back *all* data in the database as implemented. An alternate option would
	// be to send back a RESTful JSON response... the url's used to access the data
});


// POST <baseURL>/executors/
// Create a new executor entry in database
// UNIT TEST STATUS: Passing
router.route('/').post((req,res,next) => {
	var userName = req.body.username;

	// Check that required request body fields are not null
	var bodyHasRequiredFields = (req.body.username && req.body.name && req.body.password);
	if (bodyHasRequiredFields) {
		Executor.findOne( {'username': userName}, function(err, result) {
			// IF username is not taken, create executor with username passed in
			if (!result) {
				controller.create(req, res, next);
			}
			// Otherwise 
			else {
				res.status(400).json({
					errorMessage: 'Username not unique',
				});
			}
		});
	}

	// If no or incomplete body sent, return error message
	else {
		// TODO: Create empty POST unit test and verify works
		var errorCode = 400; // Look up HTTP respone for 'bad request' or similar
		var errResponse = {
			'developerMessage' : "POST requests to */executors/ must include a req.body.username, req.body.name, and req.body.password",
			'userMessage': "Information missing in your signup request",
			'errorCode' : errorCode, 
			"moreInfo" : "http://github.com/sshillyer/bcbc"
		};

		res.status(errorCode).json(errResponse);
	}
});


// PUT <baseURL>/executors/
// Invalid route - send back appropriate error response
// UNIT TEST STATUS: Passing
router.route('/').put((req,res,next) => {
	var errorCode = 405; // Look up HTTP respone for 'bad request' or similar
	var errResponse = {
		'developerMessage' : "PUT requests to */executors/ are not allowed. Specify an executor username at the end of route to update record. Example: /executor/h2human/  would update executor with username 'h2human'",
		'userMessage': "Error processing form. Please contact site administrator.",
		'errorCode' : errorCode, 
		"moreInfo" : "http://github.com/sshillyer/bcbc"
	};

	res.status(errorCode).json(errResponse);
});


// DELETE <baseURL>/executors/
// Invalid route - send back appropriate error response
// UNIT TEST STATUS: Passing
router.route('/').delete((req,res,next) => {
	// TODO: Test route and write POSTMAN unit test
	// TODO: Create empty POST unit test and verify works
	var errorCode = 405; // Look up HTTP respone for 'bad request' or similar
	var errResponse = {
		'developerMessage' : "DELETE requests to */executors/ are not allowed. Specify an executor username at the end of route to update record. Example: /executor/h2human/  would delete executor with username 'h2human'",
		'userMessage': "Error processing form. Please contact site administrator.",
		'errorCode' : errorCode, 
		"moreInfo" : "http://github.com/sshillyer/bcbc"
	};

	res.status(errorCode).json(errResponse);
});



/***************************************************************************************
<baseURL>/executors/{username}/
CRUD handled by GET, POST, PUT, DELETE routes
***************************************************************************************/

// GET <baseURL>/executors/{username}/
// Retrieve details about an executor by looking up username
// UNIT TEST STATUS: Passing
router.route('/:username').get((req,res,next) => {
	req.query.username = req.params.username; // try this??
	controller.findOne(req, res, next);
});


// POST <baseURL>/executors/{username}/
// Invalid route
// UNIT TEST STATUS: Passing
router.route('/:username').post((req,res,next) => {
	var errorCode = 405; // Look up HTTP respone for 'bad request' or similar
	var errResponse = {
		'developerMessage' : "POST requests to */executors/{username} are not allowed. To create new user, POST to /executors/  and to edit, PUT to /executors/{username}",
		'userMessage': "Error processing form. Please contact site administrator.",
		'errorCode' : errorCode, 
		"moreInfo" : "http://github.com/sshillyer/bcbc"
	};

	res.status(errorCode).json(errResponse);
});


// PUT <baseURL>/executors/{username}/
// Update executor document for the executor with the username in the URI
// UNIT TEST STATUS: Passing.
router.route('/:username').put((req,res,next) => {
	var userName = req.params.username;

	Executor.findOne( {'username': userName}, function(err, result) {
			// IF username is not taken, create executor with username passed in
			if (result) {
				var execId = result._id;
				console.log("Found executor's id: " + execId);
				req.params.id = execId;
				controller.update(req, res, next);
			}
			// Otherwise 
			else {
				res.status(400).json({
					errorMessage: 'Username not found',
				});
			}
		});
});


// DELETE <baseURL>/executors/{username}/
// Delete the executor with the username in the URI
router.route('/:username').delete((req,res,next) => {
	// TODO: Implement
	var username = req.params.username;

	// Find the ObjectID for the executor
	var execId = 0; // LOGIC GOES HERE

	// Save the ObjectID of the executor found
	req.params.id = execId; // next call expects this to be where ObjectId is stored

	// Use .pull() or .pullall() to delete all references to this Executor from the users that reference it
	// TODO: Check my users logic in /randomancer-api on github, should work here as well

	// Finally, delete the executor itself
	controller.remove(req, res, next);
});


module.exports = router;
