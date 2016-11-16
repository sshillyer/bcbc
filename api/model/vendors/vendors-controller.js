"use strict";

const Controller = require('../../lib/controller');
const vendorsModel  = require('./vendors-facade');


class VendorsController extends Controller {}

module.exports = new VendorsController(vendorsModel);
