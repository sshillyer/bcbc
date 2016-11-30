"use strict";

const controller = require('./executors-controller');
const Router = require('express').Router;
const router = new Router();
const User = require('../users/users-schema');
const Executor = require('./executors-schema');
const Vendor = require('../vendors/vendors-schema');
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;


// Route to get all users for an executor
router.route('/getUsers').post((req,res,next)=>{

	//Getting information about executor
	Executor.findOne({'username': req.body.executor}, function(err, execResult){

		if (execResult){
			console.log(execResult.toObject());
			var execResultJson = execResult.toObject();
			var execId = execResultJson._id;
			console.log(execId);
			
			User.find({'executor': execId}, function(err, userResult) {
				//Finding all users for given executor
				if (userResult) {
					console.log("userResult found:");
					console.log(userResult);
					res.status(200).json(userResult);
				}
				//If executor does not exist, set status and errorMessage sent to user in JSON
				else {
					console.log("userResult not found:\n");
				// username already taken
					res.status(400).json({
						errorMessage: 'Executor does not exist',
					});
				}
			});
		}

		else {
			console.log("getusers is faliing!!");
		}

		
	});

});


// Login route
router.route('/login').post((req, res, next) => {
    var username = req.body.username;

    Executor.findOne({ username: username}, function(err, result) {
        // If username not found, then we can create the new user
        if (result) {
            console.log(result.password);
            console.log(req.body.password);
            
            if (req.body.password == result.password) {
                res.status(202).json({
                    'authorized': 'true',
                });
            }
            else {
                res.status(401).json({
                    'authorized': 'false'
                });
            }
        }
        // username was not found, send back error message            
        else
            res.status(400).json({
            errorMessage: 'username or password not found',
        });
    });
});


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
			// IF username is found, update the record with the req.body data
			if (result) {
				var execId = result._id;
				console.log("Updated executor with _id: " + execId);
				req.params.id = execId;
				controller.update(req, res, next);
			}
			// If username not found, return errorMessage JSON 
			else {
				res.status(400).json({
					errorMessage: 'Username not found',
				});
			}
		});
});


// DELETE <baseURL>/executors/{username}/
// Delete the executor with the username in the URI
// UNIT TEST STATUS: Passing
// TODO: Need to ensure we sweep through users and delete the back-references pointing to their executor(s) ObjectIDs
router.route('/:username').delete((req,res,next) => {
	var userName = req.params.username;

	Executor.findOne( {'username': userName}, function(err, result) {
		// IF username is found, delete references to it in the users collection, then delete the executor
		if (result) {

			// TODO: Use .pull() or .pullall() to delete all references to this Executor from the Users that reference it
			// TODO: Check my users logic in /randomancer-api on github, should work here as well

			var execId = result._id;
			console.log("Deleting executor with _id: " + execId);
			req.params.id = execId;
			controller.remove(req, res, next);
		}
		// If username not found, return errorMessage JSON 
		else {
			res.status(400).json({
				errorMessage: 'Username not found',
			});
		}
	});
});








module.exports = router;
