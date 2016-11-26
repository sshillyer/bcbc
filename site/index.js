/********************************************************
index.js
BCBC site
*********************************************************/

"use strict";

/*******************
* Setup middleware *
********************/

var express = require('express');
var app = express();

// Import body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Import form-data
var FormData = require('form-data');

// Import request
var request = require('request');

// Set up handlebars
var handlebars = require('express-handlebars').create({
	defaultLayout:'main'
});



app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Set port and public folder static content
app.set('port', process.env.PORT || 8055);
app.use(express.static(__dirname + '/public'));



/*******************
* ROUTES:          *
********************/

app.get('/', function(req, res){
	var context = {};

	res.render('home', context);

});



// LOGIN ROUTES
app.get('/login/executor', function(req, res){
	var context = {};

	res.render('login-executor', context);
});

app.post('/login/executor', function(req, res){
	// send HTTP POST to the BCBC api and make a login-decision, etc.

});


// SIGNUP ROUTES
app.get('/signup/executor', function(req, res) {
	var context = {};

	res.render('signup-executor', context);
});

app.post('/signup/executor/submit', function(req, res, next) {
	var context = {};
	if (req.body.pw == req.body.verifypw){
		if (req.body.email == req.body.verifyemail){
			var formData = {
				username: req.body.username,
				password: req.body.pw,
				name: req.body.pName,
				contact: {
				  	phone: req.body.phone, 
				  	email: req.body.email, 
				  },
				address: {
					street1: req.body.street1,
					street2: req.body.street2,
					city: req.body.city,
					stateAbbrev: req.body.state,
					zip: req.body.zip,
				  },
				};
			var postInfo = {
				url: 'http://52.26.146.27:8080/executors',
				method: "POST",
				json: true,
				body: formData 
			};

			request(postInfo, function (err, res, body){
				if (err){
					return console.error('upload failed:', err);
				}
				console.log('upload successful! API responded with:', body);
			});
		}
		else{
			console.log("emails are not the same");
		}
	}
	else{
		console.log("passwords are not the same");
	}
	console.log(formData);
	res.render('/login/executor');
});



/******************
* Start Server    *
******************/
app.listen(app.get('port'), function(){
  console.log('Express started on port ' + 
              app.get('port') + 
              '; press Ctrl-C to terminate.' );
});

// my AWS is http://52.26.146.27