
suite('"Manage Users" Page Tests',function(){
  test('page should contain table of user information', function(){
    var expect = chai.expect;
	expect($('#usertable')).to.have.class('table-striped');
  });
  test('page should contain button to return to homepage', function(){
    var expect = chai.expect;
	expect($('#back')).to.have.class('btn btn-default');
  });
});