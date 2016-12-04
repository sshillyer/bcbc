/*
const Browser = require('zombie'),
    assert = require('chai').assert;

Browser.localhost('localhost', 8055);

//var browser;

suite('Cross-Page Tests', function(){

  setup(function(){
    browser = new Browser();
  });

  test('pressing executor signup button from home page should ' +
      'populate the referrer field', function(done){
        var referrer = 'http://localhost:8055/';
        browser.visit(referrer, function(){
          browser.pressButton('signupExecutor', function(){
            assert(browser.element('form hidden[name=referrer]').value
                === referrer);
            done();
          });
        });
  });

  test('pressing executor login button from home page should ' +
      'populate the referrer field', function(done){
        var referrer = 'http://localhost:8055/';
        browser.visit(referrer, function(){
          browser.pressButton('loginExecutor', function(){
            assert(browser.element('form hidden[name=referrer]').value
                === referrer);
            done();
          });
        });
  });

  test('pressing donor signup button from home page should ' +
      'populate the referrer field', function(done){
        var referrer = 'http://localhost:8055/';
        browser.visit(referrer, function(){
          browser.pressButton('signupDonor', function(){
            assert(browser.element('form hidden[name=referrer]').value
                === referrer);
            done();
          });
        });
  });

  test('pressing donor login button from home page should ' +
      'populate the referrer field', function(done){
        var referrer = 'http://localhost:8055/';
        browser.visit(referrer, function(){
          browser.pressButton('loginDonor', function(){
            assert(browser.element('form hidden[name=referrer]').value
                === referrer);
            done();
          });
        });
  });

  test('visiting the "/signup/executor" page directly should result' +
      'in an empty referrer field', function(done){
        browser.visit('http://localhost:8055/signup/executor', function(){
            assert(browser.element('form hidden[name=referrer]').value
                === '');
            done();
       });
  });

  test('visiting the "/login/executor" page directly should result' +
      'in an empty referrer field', function(done){
        browser.visit('http://localhost:8055/signup/executor', function(){
            assert(browser.element('form hidden[name=referrer]').value
                === '');
            done();
        });
  });


});
  

describe('User visits executor signup page and completes', function() {

  const browser = new Browser();

  before(function(done) {
    browser.visit('/signup/executor', done);
  });

  describe('submits form', function() {

    before(function(done) {
      browser
        .fill('#username',    'executortestsuite1')
        .fill('#password', 'executortestsuite1')
        .fill('#verify-password', 'executortestsuite1')
        .fill('#email', 'executortestsuite1@bcbc.com')
        .fill('#verify-email', 'executortestsuite1@bcbc.com')
        .fill('#phone', '(555)555-5555')
        .fill('#public-name', 'Executortestsuite1')
        .pressButton('#signup',done);
    });

    it('should be successful', function() {
      browser.assert.success();
    });

    it('should see login page', function() {
      browser.assert.text('h1', 'Executor Login');
    });
  });
});

describe('User visits executor signup page and cancels', function() {

  const browser = new Browser();

  before(function(done) {
    browser.visit('/signup/executor', done);
  });

  describe('submits form', function() {

    before(function(done) {
      browser
        .pressButton('#cancel', done);
    });

    it('should be successful', function() {
      browser.assert.success();
    });

    it('should see home page', function() {
      browser.assert.text('h1', 'Beggars Can Be Choosers');
    });
  });
});

describe('User visits executor login page', function() {

  const browser = new Browser();

  before(function(done) {
    browser.visit('/login/executor', done);
  });

  describe('submits login', function() {

    before(function(done) {
      browser
        .fill('username',    'Testtest')
        .fill('password', 'Testtest2016')
        .pressButton('login', done);
    });

    it('should be successful', function() {
      browser.assert.success();
    });

    it('should see executor home page', function() {
      browser.assert.text('p', 'Hi, Testtest! You have logged in as a \'Executor\'');
    });
  });
});

*/
const Browser = require('zombie'),
    assert = require('chai').assert;

Browser.localhost('localhost', 8055);

describe("The Todo App", function() {
  var browser;

  //todoUrl = "http://localhost:3001/simple-todo";
/*
  before(function() {
    // before ALL the tests, start our node server (on a test port, 3001)
    server = app.listen(3001);
  });
*/
  beforeEach(function() {
    // before EACH test, create a new zombie browser
    // 
    // some useful options when things go wrong:
    // debug: true  =  outputs debug information for zombie
    // waitDuration: 500  =  will only wait 500 milliseconds
    //   for the page to load before moving on
    browser = new Browser();
  });
/*
  after(function() {
    // after ALL the tests, close the server
    server.close();
  });
*/
  it("should show the home page to begin", function(done) {
    browser.visit('/', function() {
      assert(browser.text("h1") === "Beggars Can Be Choosers",
        "page heading must match");
      
      // done with test
      done();
    });
  });

  describe("when signing up", function() {
    it("show sign up page", function(done) {
      browser.visit('/signup/executor').then(function() {
        browser
        .fill('#username',    'executortestsuite1')
        .fill('#password', 'executortestsuite1')
        .fill('#verify-password', 'executortestsuite1')
        .fill('#email', 'executortestsuite1@bcbc.com')
        .fill('#verify-email', 'executortestsuite1@bcbc.com')
        .fill('#phone', '(555)555-5555')
        .fill('#public-name', 'Executortestsuite1');
        return browser.pressButton("Login");
      }).then(function() {
        assert(browser.text("h1") === "Executor Login",
          "list heading must exist and match");
      }).then(done, done);
    });
  });

  describe("after logging in", function() {
    beforeEach(function(done) {
      browser.visit(todoUrl).then(function() {
        browser.fill("username", "Biff");
        return browser.pressButton("#signup");
      }).then(done, done);
    });
/*
    describe("when visiting the todo app again", function() {
      it("should show the list page", function(done) {
        browser.visit(todoUrl).then(function() {
          assert(browser.text("#list-heading") === "Things To Do",
            "list heading must exist and match");
        }).then(done, done);
      });
    });

    describe("when adding a todo item", function() {
      var todoContent = "fly a kite";

      before(function(done) {
        browser.fill("todo-content", todoContent);
        browser.pressButton("Add Todo").then(done, done);
      });

      it("should show the added todo", function(done) {
        assert(browser.query(".todo-content").value === todoContent,
          "todo content must match");
        // done with test
        done();
      });

      it("should be able to delete the todo", function(done) {
        browser.pressButton(".delete-todo", function() {
          assert.isNull(browser.query(".todo-content"),
            "todo should be deleted");
          // done with test
          done();
        });
      });
  

    });
    */
  });
  

});
