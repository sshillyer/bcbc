/********************************************************
index.js
BCBC site
*********************************************************/

"use strict";

/*******************
* Setup middleware *
********************/

const baseUrl = 'http://52.26.146.27:8080';

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
// TODO: Extract the port out to a config file
// TODO: When doing so, also extract out the API's URL and port to a config file
// TODO: The point of that is that we can include instructions to the TA on how to set it up and direct them to one file
// 		 where they can change everything
app.set('port', process.env.PORT || 8055);
app.use(express.static(__dirname + '/public'));



/*******************
* ROUTES:          *
********************/

app.get('/', function(req, res){
	var context = {};

	res.render('home', context);

});



// LOGIN ROUTES -- Loads the "login" page for executors (the form)
// Status: Page loads
app.get('/login/executor', function(req, res){
	var context = {};

	res.render('login-executor', context);
});

// LOGIN ROUTES -- Loads the "login" page for users (the form)
// Status: Page loads
app.get('/login/user', function(req, res){
	var context = {};

	res.render('login-user', context);
});



app.post('/login/executor', function(req, res){
	// send HTTP POST to the BCBC api and make a login-decision, etc.
	var context = {};
	var routeSuffix = '/executors/login';
	var accountType = "Executor";
	var reroutePage = 'login-executor';

	login(req, res, routeSuffix, accountType, reroutePage); 
});

app.post('/login/user', function(req, res){
	// send HTTP POST to the BCBC api and make a login-decision, etc.
	var context = {};
	var routeSuffix = '/users/login';
	var accountType = "Beggar";
	var reroutePage = 'login-user';

	login(req, res, routeSuffix, accountType, reroutePage); 

});




// EXECUTOR SIGNUP ROUTES
// to do: handle non-unique usernames
app.get('/signup/executor', function(req, res) {
	var context = {};

	res.render('signup-executor', context);
});

app.post('/signup/executor', function(req, res, next) {
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
				url: baseUrl + '/executors',
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

// USER SIGNUP ROUTES
// to do: handle non-unique usernames
app.get('/signup/user', function(req, res) {  
	var context = {};

	res.render('signup-user', context);
});

app.post('/signup/user', function(req, res, next) {
	var context = {};
	if (req.body.pw == req.body.verifypw){
		if (req.body.email == req.body.verifyemail){
			var formData = {
				username: req.body.username,
  				name: {
  					first: req.body.fName,
  					last: req.body.lName,
	  				middle: req.body.mName,
	  				alias: req.body.alias,
  				},
  				password: req.body.pw,
  				contact: {
  					email:  req.body.email,
  					phone: req.body.phone,	
  		        },
  				//executor: { type: ObjectId, ref: 'Executors'}, //?? add hidden reference to executor on form (send executor id)??
				};
			var postInfo = {
				url: baseUrl + '/users',
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
	res.render('login-user');
});


/******************
* Start Server    *
******************/
app.listen(app.get('port'), function(){
  console.log('Express started on port ' + 
              app.get('port') + 
              '; press Ctrl-C to terminate.' );
});




/******************
* Login Function  *
******************/
function login(req, res, routeSuffix, accountType, reroutePage) {
	// send HTTP POST to the BCBC api and make a login-decision, etc.
	var context = {};

	//send get request to API with username from input
	var route = baseUrl + routeSuffix;

	request.post(route, {form:{username:req.body.username, password:req.body.password}}, function (err, httpResponse, body){
		if (err){
			console.error('ERROR: ' + routeSuffix + ' POST failed: ', err);
			context.errorMessage = "Server error. Please try again.";
			res.render(reroutePage, context);
		}
		console.log('Status code: ' + httpResponse.statusCode);
		context.login = 0;
		if (httpResponse.statusCode == 202) { 
			// correct username & password
			context.username = req.body.username;
			context.type = accountType;
			res.render('login-success', context);
		}
		else {
			context.errorMessage = "Invalid username or password";
			res.render(reroutePage, context);
		}
	});
}