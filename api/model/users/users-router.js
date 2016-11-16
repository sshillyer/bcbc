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
router.route('/').get((req,res,next) => {
	// TODO: Implement
});


// POST <baseURL>/users/
router.route('/').post((req,res,next) => {
	// TODO: Implement	
});

// PUT <baseURL>/users/
router.route('/').put((req,res,next) => {
	// TODO: Implement	
});

// DELETE <baseURL>/users/
router.route('/').delete((req,res,next) => {
	// TODO: Implement	
});

router.route('/').post((req, res, next) => {
	var userName = req.body.username;

	console.log(userName);

	User.findOne( {'username': userName}, function(err, result) {
		if (!result) {

			// var executorName = req.body.executor;

			controller.create(req, res, next);
			console.log(req.body.email);

			// TODO: implement email validation (regex)
			// TODO: verify email uniqueness

		}

		else // username already taken
			res.status(400).json({
				errorMessage: 'Username not unique',
			});
	});
});


// router.route('/login').post((req, res, next) => {
// 		// search for the username

// 		// check that the req.body.password == the username password stored in mongoDB

// 		// if not, return res.status(??).json()

// 		// (Note: on client )
// });


// GET /users/:username
// Returns JSON of user by username, populating out the executor
router.route('/:username').get((req, res, next) => {
	// In the .populate call, first string the the User attribute to expand, 
	// second string is space-dilineated string of attributes to fill in to the expanded property
	User.findOne({username: req.params.username})
	.populate('executor', 'title body') 
	.then(doc => res.status(200).json(doc))
	.catch(err => next(err));
});


module.exports = router;
