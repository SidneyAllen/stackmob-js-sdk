/**
 * This suite will test the three security modes of the SDK
 * Always - All requests will be made over HTTPS
 * Never - All requests will be made over HTTP
 * Mixed - Only authentication methods will be made over HTTPS
 */

describe("Unit tests for API Redirect", function() {

  // Mock Ajax Calls
  var mockCreate, mockRedirectedCreate;

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

    mockRedirectedCreate = $.mockjax({
      url: 'http://api.redirected.com/anotherthing',
      status: 200,
      type: 'GET',
      responseText: {
        sample: 'data'
      }
    });
  });

  it("should redirect API on 302 response status", function() {
    var model, params, method, running = true;

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
      expect(params['url'].indexOf('http://api.redirected.com/')).toEqual(0);
    });
  });

  it("should redirect subsequent requests", function() {
    // Clear the 302 response mock
    $.mockjaxClear(mockCreate);

    var model, params, method, running = true;

    runs(function() {
      var Thing = StackMob.Model.extend({ schemaName: 'anotherthing' });
      var thing = new Thing({ id: "id" });
      thing.fetch({
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