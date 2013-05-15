

describe("Custom Code Method has custom headers", function() {
  it("should have user headers in the call", function() {
    runs(function() {
      StackMob.customcode('hello_world', {}, 'GET', {
        headers: {'a': 'b'},
        done: function(model, param, method) {
          expect(param['headers']['a']).toEqual('b');
        }
      });

    });

  });

  it("should overwrite custom headers if in use by StackMob", function() {
    runs(function() {
      StackMob.customcode('hello_world', {}, 'GET', {
        headers: {'Accept': 'b'},
        done: function(model, param, method) {
          expect(param['headers']['Accept']).toNotEqual('b');
        }
      });

    });

  });  
});
