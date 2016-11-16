"use strict";

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const usersSchema = new Schema({
  username: { type: String, required: true },
  email:  { type: String },
  // executor: { type: ObjectId, ref: 'Executors'}
});



const User = mongoose.model('Users', usersSchema);
module.exports = User;



// Populate test data

User.find(function(err, users) {
	if(users.length) return;

	User.create({
		username: "user1",
		email: "hi@gmail.com",
		// execut
	}, function(err, res) {
			if (err) console.log(err); // if an error log it
			else console.log(res); // else log result (what we inserted)
	});

});
