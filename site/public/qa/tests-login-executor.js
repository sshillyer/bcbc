
suite('"Executor Login" Page Tests',function(){
  test('page should contain button to submit login information', function(){
    var expect = chai.expect;
	expect($('#login')).to.have.class('btn btn-default');
  });
  test('page should contain button to return to homepage', function(){
    var expect = chai.expect;
	expect($('#back')).to.have.class('btn btn-default');
  });
});