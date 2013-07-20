/**
 * This suite will test the three security modes of the SDK
 * Always - All requests will be made over HTTPS
 * Never - All requests will be made over HTTP
 * Mixed - Only authentication methods will be made over HTTPS
 */

describe("Unit tests for security modes", function() {

  var HTTP  = "http://",
      HTTPS = "https://";

  // Mock Ajax Calls
  var mockCreate, mockFetch, mockPut, mockDelete;

  it("should set up mock ajax", function() {
    mockCreate = mockCreateAsSuccess();
    mockFetch = mockFetchAsSuccess();
    mockPut = mockUpdateAsSuccess();
    mockDelete = mockDeleteAsSuccess();
  });

  /******************************************
   ***** SETTING SECURITY MODE TO MIXED *****
   ******************************************/

  it("--Setting Security Mode to Mixed--", function() {
    StackMob.secure = StackMob.SECURE_MIXED;
  });

  it("(MIXED) should use HTTP for non authentication methods", function() {

    var params,
        running = true;

    runs(function() {
      var model, method;
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
      expect(params['url'].indexOf(HTTP)).toEqual(0);
    });
  });

  it("(MIXED) should use HTTPS for User.create", function() {
    var model, params, method, running = true;

    runs(function() {
      var user = new StackMob.User({username: "testUser", password: "testUser"});
      user.create({
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
      expect(params['url'].indexOf(HTTPS)).toEqual(0);
    });
  });

  it("(MIXED) should use HTTPS for linkUserWithFacebook", function() {
    var model, params, method, running = true;

    runs(function() {
      var user = new StackMob.User({username: "testUser", password: "testUser"});
      user.linkUserWithFacebook("fakeAccessToken", {
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
      expect(params['url'].indexOf(HTTPS)).toEqual(0);
    });
  });

  it("(MIXED) should use HTTPS for authentication methods", function() {
    var model, params, method, running = true;

    runs(function() {
      var user = new StackMob.User({username: "testUser", password: "testUser"});
      user.login(true, {
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
      expect(params['url'].indexOf(HTTPS)).toEqual(0);
    });
  });

  /*******************************************
   ***** SETTING SECURITY MODE TO ALWAYS *****
   *******************************************/

  it("--Setting Security Mode to Always--", function() {
    StackMob.secure = StackMob.SECURE_ALWAYS;
  });

  it("(ALWAYS) should use HTTPS for non-authentication methods", function() {
    var model, params, method, running = true;

    runs(function() {
      var user = new StackMob.User({username: "testUser", password: "testUser"});
      user.create({
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
      expect(params['url'].indexOf(HTTPS)).toEqual(0);
    });
  });

  it("(ALWAYS) should use HTTPS for authentication methods", function() {
    var model, params, method, running = true;

    runs(function() {
      var user = new StackMob.User({username: "testUser", password: "testUser"});
      user.login(true, {
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
      expect(params['url'].indexOf(HTTPS)).toEqual(0);
    });
  });

  /******************************************
   ***** SETTING SECURITY MODE TO NEVER *****
   ******************************************/

  it("--Setting Security Mode to Never--", function() {
    runs(function() {
      StackMob.secure = StackMob.SECURE_NEVER;
    });
  });

  it("(NEVER) should use HTTP for non-authentication methods", function() {
    var model, params, method, running = true;

    runs(function() {
      var user = new StackMob.User({username: "testUser", password: "testUser"});
      user.create({
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
      expect(params['url'].indexOf(HTTP)).toEqual(0);
    });
  });

  it("(NEVER) should use HTTP for authentication methods", function() {
    var model, params, method, running = true;

    runs(function() {
      var user = new StackMob.User({username: "testUser", password: "testUser"});
      user.login(true, {
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
      expect(params['url'].indexOf(HTTP)).toEqual(0);
    });
  });

  it("(NEVER) should use HTTPS for setting request to use secure", function() {
    var model, params, method, running = true;

    runs(function() {
      var user = new StackMob.User({username: "testUser", password: "testUser"});
      user.create({
        done: function(mod,p,m){
          running = false;
          model = mod;
          params = p;
          method = m;
        },
        secureRequest: true
      });
    });

    waitsFor(function() {
      return running === false;
    });

    runs(function() {
      expect(params['url'].indexOf(HTTPS)).toEqual(0);
    });
  });

  it("(NEVER) should use HTTP for linkUserWithFacebook", function() {
    var model, params, method, running = true;

    runs(function() {
      var user = new StackMob.User({username: "testUser", password: "testUser"});
      user.linkUserWithFacebook("fakeAccessToken", {
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
      expect(params['url'].indexOf(HTTP)).toEqual(0);
    });
  });

  it("(NEVER) should use HTTPS for linkUserWithFacebook when forced with secureRequest", function() {
    var model, params, method, running = true;

    runs(function() {
      var user = new StackMob.User({username: "testUser", password: "testUser"});
      user.linkUserWithFacebook("fakeAccessToken", {
        done: function(mod,p,m){
          running = false;
          model = mod;
          params = p;
          method = m;
        },
        secureRequest: true
      });
    });

    waitsFor(function() {
      return running === false;
    });

    runs(function() {
      expect(params['url'].indexOf(HTTPS)).toEqual(0);
    });
  });

  it("should clear ajax mocks", function() {
    runs(function() {
      clearAllAjaxMocks();
    });
  });

});