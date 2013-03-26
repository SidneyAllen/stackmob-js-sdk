// Save original for reverting late
StackMob.makeAPICall_original = StackMob.makeAPICall;

// Add Unit Test Handler
StackMob.ajaxOptions.unitTest = function(model, params, method){
  params['done'](model, params, method);
}

// Force Unit Test Callback Handler
StackMob.makeAPICall = function(model, params, method){
  return StackMob['ajaxOptions']['unitTest'](model, params, method);
}
