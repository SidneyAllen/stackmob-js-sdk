/**
 * Unit Test that `obj.sdkMethod` will hit `endPoint` with `verb` request.
 */
function expectEndpoint(obj, methodParams, sdkMethod, verb, endPoint) {
  
  var methodParams = methodParams || [];
  methodParams.push({
    done: function(model, params, method) {
      calledBack = true;
      expect(params['url'].indexOf(endPoint) > -1).toEqual(true);
      expect(params['type']).toEqual(verb);
    }
  });
  var calledBack = false;
  obj[sdkMethod].apply(obj, methodParams);
  expect(calledBack).toEqual(true);
}