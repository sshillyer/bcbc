"use strict";

const Controller = require('../../lib/controller');
const usersModel  = require('./users-facade');


class UsersController extends Controller {}

module.exports = new UsersController(usersModel);
