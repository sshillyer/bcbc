"use strict";

const controller = require('./users-controller');
const Router = require('express').Router;
const router = new Router();
var User = require('./users-schema');


router.route('/').get((req,res,next) => {
	// get route
	controller.find(req, res, next);
});


// post route
router.route('/').post((req, res, next) => {
	var userName = req.body.username;

	console.log(userName);

	User.findOne( {'username': userName}, function(err, result) {
		if (!result) {
			controller.create(req, res, next);
			console.log(req.body.email);
		}

		else // username already taken
			res.status(400).json({
				errorMessage: 'Username not unique',
			});
	});
});


// router.route('/users/login').post((req, res, next) => {
// 		// search for the username

// 		// check that the req.body.password == the username password stored in mongoDB

// 		// if not, return res.status(??).json()

// 		// (Note: on client )
// });

module.exports = router;
