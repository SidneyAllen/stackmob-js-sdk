_.extend(StackMob, {
  ajax: function(model, params, method) {
    if (params && params['done']) params['done'](model, params, method);
  },
  initiateRefreshSessionCall: function() {}
});

