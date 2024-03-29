"use strict";

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const executorsSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  contact: {
  	phone: [String], // allow for multiples?
  	email: [String], // allow for multiples?
  },
  address: {
  	street1: {type: String },
  	street2: {type: String },
  	city: {type: String },
  	stateAbbrev: {type: String },
  	zip: {type: Number },
  },
  benefactors: { type: ObjectId, ref: 'Users'}, // NOTE: THIS IS NOT BEING USED
});

// TODO: Check the syntax for defining this function
// executorSchema.getIdFromUsername = new function(username) {

// }

const Executors = mongoose.model('Executors', executorsSchema); 
module.exports = Executors;


// Populate test data
Executors.find(function(err, executors) {
	if(executors.length) return;

	Executors.create({
		username: "h4humans",
		name: "Humans 4 Humans",
		address: {
			street1: "123 SW 1st Ave",
			street2: "Ste 300",
			city: "Portland",
			stateAbbrev: "OR",
			zip: 97214,
		},
	}, function(err, res) {
			if (err) console.log(err); // if an error log it
			else console.log(res); // else log result (what we inserted)
	});

});