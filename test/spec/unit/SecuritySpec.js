/**
 * This suite will test the three security modes of the SDK
 * Always - All requests will be made over HTTPS
 * Never - All requests will be made over HTTP
 * Mixed - Only authentication methods will be made over HTTPS
 */

describe("Unit tests for security modes", function() {

  it("should set Security Mode to Mixed", function() {
    StackMob.secure = StackMob.SECURE_MIXED;
  });

  it("should use HTTP for non-authentication methods", function() {
    var model, params, method;
    runs(function() {
      var user = new StackMob.User({username: "testUser", password: "testUser"});
      user.create({
        done: function(mod,p,m){
          model = mod;
          params = p;
          method = m;
        }
      });
    });

    runs(function() {
      expect(params['url'].indexOf('http://')).toEqual(0);
    });
  });

  it("should use HTTPS for authentication methods", function() {
    var model, params, method;
    runs(function() {
      var user = new StackMob.User({username: "testUser", password: "testUser"});
      user.login(true, {
        done: function(mod,p,m){
          model = mod;
          params = p;
          method = m;
        }
      });
    });

    runs(function() {
      expect(params['url'].indexOf('https://')).toEqual(0);
    });
  });

  it("should set Security Mode to Always", function() {
    StackMob.secure = StackMob.SECURE_ALWAYS;
  });

  it("should use HTTPS for non-authentication methods", function() {
    var model, params, method;
    runs(function() {
      var user = new StackMob.User({username: "testUser", password: "testUser"});
      user.create({
        done: function(mod,p,m){
          model = mod;
          params = p;
          method = m;
        }
      });
    });

    runs(function() {
      expect(params['url'].indexOf('https://')).toEqual(0);
    });
  });

  it("should use HTTPS for authentication methods", function() {
    var model, params, method;
    runs(function() {
      var user = new StackMob.User({username: "testUser", password: "testUser"});
      user.login(true, {
        done: function(mod,p,m){
          model = mod;
          params = p;
          method = m;
        }
      });
    });

    runs(function() {
      expect(params['url'].indexOf('https://')).toEqual(0);
    });
  });

  it("should set Security Mode to Never", function() {
    StackMob.secure = StackMob.SECURE_NEVER;
  });

  it("should use HTTP for non-authentication methods", function() {
    var model, params, method;
    runs(function() {
      var user = new StackMob.User({username: "testUser", password: "testUser"});
      user.create({
        done: function(mod,p,m){
          model = mod;
          params = p;
          method = m;
        }
      });
    });

    runs(function() {
      expect(params['url'].indexOf('http://')).toEqual(0);
    });
  });

  it("should use HTTP for authentication methods", function() {
    var model, params, method;
    runs(function() {
      var user = new StackMob.User({username: "testUser", password: "testUser"});
      user.login(true, {
        done: function(mod,p,m){
          model = mod;
          params = p;
          method = m;
        }
      });
    });

    runs(function() {
      expect(params['url'].indexOf('http://')).toEqual(0);
    });
  });

  it("should use HTTPS for setting request to use secure", function() {
    var model, params, method;
    runs(function() {
      var user = new StackMob.User({username: "testUser", password: "testUser"});
      user.create({
        done: function(mod,p,m){
          model = mod;
          params = p;
          method = m;
        },
        secureRequest: true
      });
    });

    runs(function() {
      expect(params['url'].indexOf('https://')).toEqual(0);
    });
  });

});