suite('"Home" Page Tests',function(){
  test('page should contain link to executor signup page', function(){
    var expect = chai.expect;
	expect($('#loginExecutor')).to.have.class('btn btn-default');
  });
  test('page should contain link to executor login page', function(){
    var expect = chai.expect;
	expect($('#signupExecutor')).to.have.class('btn btn-default');
  });
});
