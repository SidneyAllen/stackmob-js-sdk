/**
 * Social Unit Tests
 */

describe("Social Unit Tests", function() {
  enableUnitTests();

  it("should ", function() {

    runs(function() {
      var model, params, method;

      var user = new StackMob.User({username: "testUser", password: "testUser"});
      user.unlinkUserFromFacebook({
        done: function(mod,p,m){
          model = mod;
          params = p;
          method = m;
        }
      });

      expect(params['url']).toEqual(StackMob.getBaseURL() + 'user/unlinkUserFromFacebook');
    });

  });

  disableUnitTests();
});
