describe("Unit tests for Custom Code", function() {

  it("should set http verb to POST", function() {

    var theMethod = 'cc-method';

    StackMob.customcode(theMethod, {'param': 'value'}, 'POST', {
      done: function(model, params, method, options){
        expect(method).toEqual(theMethod);
        expect(options['httpVerb']).toEqual('POST');
      }
    });

  });

  it("should have optional `verb` parameter", function() {

    var theMethod = 'cc-method';

    StackMob.customcode(theMethod, {'param': 'value'}, {
      done: function(model, params, method, options){
        expect(method).toEqual(theMethod);
        expect(options['httpVerb']).toEqual('GET');
      }
    });

  });

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