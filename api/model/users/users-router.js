"use strict";

const controller = require('./users-controller');
const Router = require('express').Router;
const router = new Router();
const User = require('./users-schema');
const Executor = require('../executors/executors-schema');
const Vendor = require('../vendors/vendors-schema');



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
	var userName = req.body.username;

	console.log(userName);

	User.findOne( {'username': userName}, function(err, result) {
		// IF username is not taken, create the user passed in
		if (!result) {
			// TODO: implement email validation (regex) -- Server side or client side??
			// TODO: verify email uniqueness -- not in story / requirements that it be unique, ask customer?
			controller.create(req, res, next);
			console.log(req.body.email);
		}
		// If username is taken, set status and errorMessage sent to user in JSON
		else // username already taken
			res.status(400).json({
				errorMessage: 'Username not unique',
			});
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
router.route('/:username').get((req, res, next) => {
	// In the .populate call, first string the the User attribute to expand, 
	// second string is space-dilineated string of attributes to fill in to the expanded property
	User.findOne({username: req.params.username})
	.populate('executor', 'name address contact') // Get the 'name' property of the executor from db
	.then(doc => res.status(200).json(doc))
	.catch(err => next(err));
});




// Potential login route concept
// router.route('/login').post((req, res, next) => {
// 		// search for the username

// 		// check that the req.body.password == the username password stored in mongoDB

// 		// if not, return res.status(??).json()

// 		// (Note: on client )
// });







module.exports = router;