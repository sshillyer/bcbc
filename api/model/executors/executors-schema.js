"use strict";

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const executorsSchema = new Schema({
  title: { type: String, required: true },
  body:  { type: String }
});


const Executors = mongoose.model('Executors', executorsSchema); 
module.exports = Executors;


// Populate test data
Executors.find(function(err, executors) {
	if(executors.length) return;

	Executors.create({
		title: "execTitle",
		body: "execBody",
		// execut
	}, function(err, res) {
			if (err) console.log(err); // if an error log it
			else console.log(res); // else log result (what we inserted)
	});

});