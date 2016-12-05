
suite('"Signup Executor" Page Tests',function(){
  test('page should contain submit button for signup form', function(){
	var expect = chai.expect;
	expect($('#signup')).to.have.class('btn btn-default');
  });
  test('page should contain cancel button for returning home', function(){
    var expect = chai.expect;
    expect($('#cancel')).to.have.class('btn btn-default');
  });
});
