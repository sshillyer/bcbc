suite('"Home" Page Tests',function(){
  test('page should contain link to executor signup page', function(){
    assert($('a[href="/signup/executor"]').length);
  });
  test('page should contain link to executor login page', function(){
    assert($('a[href="/login/executor"]').length);
  });
});
