describe('jasmine-node', function(){

  it('should pass', function(){
    expect(1+2).toEqual(3);
  });

  it('jquery should exist', function(){
    var a = (typeof jQuery === 'function');
    expect(a).toBe(true);
  });

});
