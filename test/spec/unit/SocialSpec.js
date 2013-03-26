/**
 * Social Unit Tests
 */

describe("Social Unit Tests", function() {

  it("should call unlinkUserFromFacebook", function() {

    runs(function() {
      var model, params, method;

      var user = new StackMob.User({username: "testUser", password: "testUser"});

      expectEndpoint(user, [], 'unlinkUserFromFacebook', 'DELETE', 'user/unlinkUserFromFacebook');

    });

  });

  it("should call unlinkUserFromGigya", function() {

    runs(function() {
      var model, params, method;

      var user = new StackMob.User({username: "testUser", password: "testUser"});

      expectEndpoint(user, [], 'unlinkUserFromGigya', 'DELETE', 'user/unlinkUserFromGigya');

    });

  });

});
