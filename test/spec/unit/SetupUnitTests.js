_.extend(StackMob, {
  ajax: function(model, params, method, options){
    if (typeof options['done'] === "function")
      options['done'](model, params, method, options);
  },
  initiateRefreshSessionCall: function() {}
});