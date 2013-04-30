/**
 * This suite will test custom code methods
 */

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

});
