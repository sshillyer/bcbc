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

// Import bod-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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




/******************
* Start Server    *
******************/
app.listen(app.get('port'), function(){
  console.log('Express started on port ' + 
              app.get('port') + 
              '; press Ctrl-C to terminate.' );
});

// my AWS is http://52.26.146.27