describe("Unit tests for refresh tokens", function() {

  // Mock Ajax Calls
  var mockedLogin, mockedSave;

  it("should set up mock ajax", function() {
    $.mockjaxClear();
    mockedLogin = mockLoginAsSuccess();
    mockedSave = mockCreateAsSuccess();
  });

  var Thing = StackMob.Model.extend({
    schemaName: "thing"
  });

  var thing = new Thing({
    value: "value"
  });

  it("should get a refresh token", function() {
    
    var waiting = true,
        ranSuccess = false,
        loggedInCallback = false,
        loggedInPromise = false;

    runs(function() {
      
      var testUser = new StackMob.User({'username': 'testUser', password: 'testUser'});

      testUser.login(true, {
        success: function() {
          loggedInCallback = true;
        }
      });

    });

    waitsFor(function() {
      return loggedInCallback;
    });

    waitsFor(function() {
      return !StackMob.hasExpiredOAuth();
    });

    waitsFor(function() {
      return StackMob.hasExpiredOAuth();
    });

    runs(function() {
      console.log("Was logged in? " + loggedInPromise + " " + loggedInCallback);
      console.log("refresh token? " + StackMob.hasRefreshToken());
      expect(StackMob.hasExpiredOAuth()).toBeTruthy();

    });

  });

  it("should cleanup mock ajax methods ", function() {

    runs(function() {
        // Cleanup ajax mock
        $.mockjaxClear();
    });
  });

});