"use strict";

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const executorsSchema = new Schema({
  userName: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  address: {
  	street1: String,
  	street2: String
  	city: String,
  	stateAbbrev: String,
  	zip: Number,
  },
});


const Executors = mongoose.model('Executors', executorsSchema); 
module.exports = Executors;


// Populate test data
Executors.find(function(err, executors) {
	if(executors.length) return;

	Executors.create({
		userName: "h4humans",
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