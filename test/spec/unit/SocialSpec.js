/**
 * Social Unit Tests
 */

describe("Social Unit Tests", function() {

  function testEndPoint(obj, sdkMethod, verb, endPoint) {
    var calledBack = false;
    obj[sdkMethod]({
      done: function(model, params, method) {
        calledBack = true;
        expect(params['url'].indexOf(endPoint) > -1).toEqual(true);
        expect(params['type']).toEqual(verb);
      }
    });
    expect(calledBack).toEqual(true);
  }

  it("should call unlinkUserFromFacebook", function() {

    runs(function() {
      var model, params, method;

      var user = new StackMob.User({username: "testUser", password: "testUser"});

      testEndPoint(user, 'unlinkUserFromFacebook', 'DELETE', 'user/unlinkUserFromFacebook');

    });

  });

  it("should call unlinkUserFromGigya", function() {

    runs(function() {
      var model, params, method;

      var user = new StackMob.User({username: "testUser", password: "testUser"});

      testEndPoint(user, 'unlinkUserFromGigya', 'DELETE', 'user/unlinkUserFromGigya');

    });

  });

});
