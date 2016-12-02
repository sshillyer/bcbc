/********************************************************
index.js
BCBC site
*********************************************************/

"use strict";

/*******************
* Setup middleware *
********************/
const baseUrl = 'http://localhost:8080';

//const baseUrl = 'http://52.26.146.27:8080';

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

//May be unecessary
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

// to do: wait for results before changing screens, if successful, go to log in page, if not, 
// prompt again for sign up with error-.
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
	res.render('login-executor');
});

// USER SIGNUP ROUTES
// to do: handle non-unique usernames
app.get('/signup/user', function(req, res) {  
	var context = {};
	context.executor = req.query.executor;
	context.type = req.query.type;
	res.render('signup-user', context);
});

// Signup a user -- POST
app.post('/signup/user', function(req, res, next) {
	var context = {};
	context.username = req.body.executor;
	context.type = req.body.type;
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
  				executor: req.body.executor, 
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
	res.render('executor-home',context);
});


//Manage Users Route
app.post('/manageUsers', function(req, res){
	var context = {};
	context.executor = req.body.executor;

	console.log("req.body.executor inside manageUsers route on site/index.js: " + req.body.executor);
	context.type = req.body.type;
	
	var route = baseUrl+'/executors/getUsers';

	request.post(route, {form:{executor:req.body.executor}}, function (err, httpResponse, body){
		if (err){
			console.log('ERROR: /manageUsers POST failed: ', err);
			context.errorMessage = "Server error. Please try again.";
			res.render('executor-home', context)
		}
		if(httpResponse)  {
			var parsedResponse = JSON.parse(httpResponse.body);
			context.response = parsedResponse;
			console.log(context.response);
			res.render('manage-users', context);
		}
	});
});


// Edit user page
app.post('/editUser', function(req, res){
	var context = {};
	var username = req.body.username;
	var executor = req.body.executor;
	// Debug console echos
	if (username) console.log("username is " + username);
	if (executor) console.log("executor name is " + executor);
	// End Debug console echos

	// Setup the URL to send and echo to console on site server
	var route = baseUrl + '/users/' + username;
	console.log('Directing to API POST route: ' + route);

	// Send get request, then set context and render the edit-user page
	request.get(route, {}, function(req2, res2) {
		console.log(res2.statusCode)
		if(res2.body) console.log(res2.body);

		context.executor = req.body.executor;
		var parsedResponse = JSON.parse(res2.body);
		context.response = parsedResponse;
		res.render('edit-user', context);
	});

	return;
});

// TODO: Implement this method. Called in edit-user.handlebars upon clicking the 'save' button
app.post('/saveUser', function(req, res){
	var context = {};
	var originalUsername = req.body.username;
	var executor = req.body.executor;
	console.log("/saveuser has username = " + originalUsername);
	console.log("/saveuser has executor username = " + executor);

	// Send a PUT to the below route
	var route = baseUrl + '/users/' + originalUsername;
	console.log('Directing to API PUT route: ' + route);

	// This reads data from the form
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
		};
	var putInfo = {
		url: route,
		method: "PUT",
		json: true,
		body: formData 
	};

	// This sends the put request
	request(putInfo, function (err, res2, body){
		if (err){
			console.error('upload failed:', err);
		}
		console.log('Save successful! API responded with:', body);
		// Reroute back to the manage-users page regardless of result
		route = baseUrl+'/executors/getUsers';
		context.executor = req.body.executor;
		request.post(route, {form:{executor:req.body.executor}}, function (err, httpResponse, body){
			if (err){
				console.log('ERROR: /manageUsers POST failed: ', err);
				context.errorMessage = "Server error. Please try again.";
				res2.render('executor-home', context)
			}
			if(httpResponse)  {
				var parsedResponse = JSON.parse(httpResponse.body);
				context.response = parsedResponse;
				console.log(context.response);
				res.render('manage-users', context);
			}
		});
	});

	return;
});


// TODO: Build .handlebars page for donors at some point (part 6 of priority list)
// Issues to address: We would need to get current balance before updating OR have access to the 
// current balance before passing in the new balance. 
// Update Balance route
// app.post('/updateBalance', function(req, res){
// 	var context = {};
// 	var context.donorUsername = req.body.donorUsername; // Saving our state of logged in user
	
// 	// Variables to send in
// 	var doneeUsername = req.body.doneeUsername;
// 	var amountChange = req.body.amount; // could be negative or positive
// 	// TODO: Cast amountChange to an integer?? I think mongoose does automagically

// 	var route = baseUrl + '/users/' + doneeUsername;


// 	request.put(route, {form:{balance: req.body.amount})

// 	res.render('donor-home', context);
// });




// LOGOUT ROUTE
app.get('/logOut', function(req, res) {  
	var context = {};
	context.executor = req.query.executor;

	res.render('home', context);
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
		if(httpResponse) {
			console.log('Status code: ' + httpResponse.statusCode);
	
			if (httpResponse.statusCode == 202) { 
				// correct username & password
				context.username = req.body.username;
				context.type = accountType;
				res.render('executor-home', context);
			}
			else {
				context.errorMessage = "Invalid username or password";
				res.render(reroutePage, context);
			}
		}
	});
}