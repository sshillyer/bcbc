"use strict";

const controller = require('./users-controller');
const Router = require('express').Router;
const router = new Router();
const User = require('./users-schema');
const Executor = require('../executors/executors-schema');
const Vendor = require('../vendors/vendors-schema');



// Login route
router.route('/login').post((req, res, next) => {
	console.log("WUT UP");
    var username = req.body.username;

    User.findOne({ username: username}, function(err, result) {
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
<baseURL>/users/
CRUD handled by GET, POST, PUT, DELETE routes
***************************************************************************************/
// GET <baseURL>/users/
// Returns JSON of users
// UNIT TEST STATUS: Passing.
router.route('/').get((req,res,next) => {
	// TODO: Re-Implement if necessary. VERY unsafe (returns the password and all data)
	
	// Return users collection or whatever is in querystring (e.g /users?password=hi )
	controller.find(req, res, next);
});


// POST <baseURL>/users/
// Adds the user in the request.body JSON to the database, returns inserted user
// UNIT TEST STATUS: Passing.
router.route('/').post((req, res, next) => {
	var username = req.body.username;

	console.log(username);

	User.findOne( {'username': username}, function(err, result) {
		// IF username is not taken, create the user passed in
		if (!result) {
			// TODO: implement email validation (regex) -- Server side or client side??
			// TODO: verify email uniqueness -- not in story / requirements that it be unique, ask customer?
			controller.create(req, res, next);
			console.log(req.body.email);
		}
		// If username is taken, set status and errorMessage sent to user in JSON
		else {
		// username already taken
			res.status(400).json({
				errorMessage: 'username not unique',
			});
		}
	});
});


// PUT <baseURL>/users/
// Invalid route
// UNIT TEST STATUS: Passing
router.route('/').put((req,res,next) => {
	var errorCode = 405;
	var errResponse = {
		'developerMessage' : "PUT requests to */users/ are not allowed. Specify a user's username at the end of route to update record. Example: /users/jshoemaker/  would update user with username 'jshoemaker'",
		'userMessage': "Error processing form. Please contact site administrator.",
		'errorCode' : errorCode, 
		"moreInfo" : "http://github.com/sshillyer/bcbc"
	};

	res.status(errorCode).json(errResponse);
});

// DELETE <baseURL>/users/
// Invalid route - do not want to code into API a "delete all users" route
// UNIT TEST STATUS: Passing
router.route('/').delete((req,res,next) => {
	var errorCode = 405;
	var errResponse = {
		'developerMessage' : "DELETE requests to */users/ are not allowed. Specify a user's username at the end of route to delete record.",
		'userMessage': "Error processing form. Please contact site administrator.",
		'errorCode' : errorCode, 
		"moreInfo" : "http://github.com/sshillyer/bcbc"
	};

	res.status(errorCode).json(errResponse);
});




/***************************************************************************************
<baseURL>/users/:username
CRUD handled by GET, POST, PUT, DELETE routes
***************************************************************************************/
// GET /users/:username
// Returns JSON of user by username, populating out the executor
// UNIT TEST STATUS: ??
router.route('/:username').get((req, res, next) => {
	// In the .populate call, first string the the User attribute to expand, 
	// second string is space-dilineated string of attributes to fill in to the expanded property
	User.findOne({username: req.params.username})
	.populate('executor', 'name address contact') // Get the 'name' property of the executor from db
	.then(doc => res.status(200).json(doc))
	.catch(err => next(err));
});


// POST <baseURL>/users/{username}/
// Invalid route
// UNIT TEST STATUS: Passing
router.route('/:username').post((req,res,next) => {
	var errorCode = 405; // Look up HTTP respone for 'bad request' or similar
	var errResponse = {
		'developerMessage' : "POST requests to */users/{username} are not allowed. To create new user, POST to /users/  and to edit, PUT to /users/{username}",
		'userMessage': "Error processing form. Please contact site administrator.",
		'errorCode' : errorCode, 
		"moreInfo" : "http://github.com/sshillyer/bcbc"
	};

	res.status(errorCode).json(errResponse);
});


// PUT <baseURL>/users/{username}/
// Update users document for the users with the username in the URI
// UNIT TEST STATUS: Passing.
router.route('/:username').put((req,res,next) => {
	var username = req.params.username;

	User.findOne( {'username': username}, function(err, result) {
			// IF username is found, update the record with the req.body data
			if (result) {
				var execId = result._id;
				console.log("Updated user with _id: " + execId);
				req.params.id = execId;
				controller.update(req, res, next);
			}
			// If username not found, return errorMessage JSON 
			else {
				res.status(400).json({
					errorMessage: 'username not found',
				});
			}
		});
});


// DELETE <baseURL>/users/{username}/
// Delete the users with the username in the URI
// UNIT TEST STATUS: Passing
// TODO: Need to ensure we sweep through executors and delete the back-references pointing to their user(s) ObjectID(s)
router.route('/:username').delete((req,res,next) => {
	var username = req.params.username;

	User.findOne( {'username': username}, function(err, result) {
		// IF username is found, delete references to it in the users collection, then delete the executor
		if (result) {

			// TODO: Use .pull() or .pullall() to delete all references to this User from the Executors that reference it
			// TODO: Check my users logic in /randomancer-api on github, should work here as well

			var execId = result._id;
			console.log("Deleting user with _id: " + execId);
			req.params.id = execId;
			controller.remove(req, res, next);
		}
		// If username not found, return errorMessage JSON 
		else {
			res.status(400).json({
				errorMessage: 'username not found',
			});
		}
	});
});










module.exports = router;
