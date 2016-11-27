"use strict";

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const usersSchema = new Schema({
  username: { type: String },
  name: {
  	first: { type: String},
  	last: { type: String},
  	middle: { type: String},
  	alias: { type: String},
  },
  password: { type: String },
  contact: {
  	email:  { type: String },
  	phone: { type: String },	
  },
  balance: Number,
  executor: { type: ObjectId, ref: 'Executors'}, // Assumes each user has only one executor
});



const User = mongoose.model('Users', usersSchema);
module.exports = User;


// Populate test data
User.find(function(err, users) {
	if(users.length) return;

	User.create({
		username: "user1",
		// execut
	}, function(err, res) {
			if (err) console.log(err); // if an error log it
			else console.log(res); // else log result (what we inserted)
	});

});
