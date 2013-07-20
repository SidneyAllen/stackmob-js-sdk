/**
 * This suite will test the three security modes of the SDK
 * Always - All requests will be made over HTTPS
 * Never - All requests will be made over HTTP
 * Mixed - Only authentication methods will be made over HTTPS
 */

describe("Unit tests for API Redirect", function() {

  // Mock Ajax Calls
  var mockCreate, mockRedirectedCreate;
  var running = true;

  it("should set up mock ajax", function() {
    mockCreate = $.mockjax({
      url: 'http://api.stackmob.com/thing',
      status: 302,
      type: 'POST',
      responseText: {
        sample: 'data'
      },
      headers: {
        location: 'http://api.redirected.com/thing'
      }
    });

    mockRedirectedCreate = $.mockjax({
      url: 'http://api.redirected.com/thing',
      status: 201,
      type: 'POST',
      responseText: {
        sample: 'data'
      }
    });
  });

  it("should redirect API on 302 response status", function() {
    var model, params, method;

    runs(function() {
      var Thing = StackMob.Model.extend({ schemaName: 'thing' });
      var thing = new Thing({ name: "testThing" });
      thing.create({
        done: function(mod,p,m){
          running = false;
          model = mod;
          params = p;
          method = m;
        }
      });

    });
    waitsFor(function() {
      return running === false;
    });

    runs(function() {
      console.log(params['url']);
      expect(params['url'].indexOf('http://api.redirected.com/')).toEqual(0);
    });
  });

  it("should clear ajax mocks", function() {
    runs(function() {
      clearAllAjaxMocks();
    });
  });

});