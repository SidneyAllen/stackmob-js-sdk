/**
 * Unit Test that `obj.sdkMethod` will hit `endPoint` with `verb` request.
 */
function testEndPoint(obj, sdkMethod, verb, endPoint) {
  var calledBack = false;
  obj[sdkMethod]({
    done: function(model, params, method) {
      calledBack = true;
      expect(params['url'].indexOf(endPoint) > -1).toEqual(true);
      expect(params['type']).toEqual(verb);
    }
  });
  expect(calledBack).toEqual(true);
}