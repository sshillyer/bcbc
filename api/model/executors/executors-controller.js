"use strict";

const Controller = require('../../lib/controller');
const executorsModel  = require('./executors-facade');

class ExecutorsController extends Controller {}

module.exports = new ExecutorsController(executorsModel);
