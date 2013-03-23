/**
 * Social Unit Tests
 */

describe("Social Unit Tests", function() {

  it("should call unlinkUserFromFacebook", function() {

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

      expect(params['url'].indexOf('user/unlinkUserFromFacebook') > -1).toEqual(true);
    });

  });

});
