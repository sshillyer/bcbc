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
	// TODO: Implement
});


// POST <baseURL>/executors/
router.route('/').post((req,res,next) => {
	// TODO: Implement	
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
