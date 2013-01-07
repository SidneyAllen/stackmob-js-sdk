describe("Custom Code OAuth Signing Tests", function() {
  
  var makeLegitOAuthCustomCodeCall = function(verb) {
    it("should recognize the logged in user in custom code " + verb + " requests", function() {
      var response = null;
      
      StackMob.customcode('hello_world', {}, verb, {
        success: function(result) {
          response = result;
        }
      });
      
      waitsFor(function() {
        return response;
      }, "to get result back from custom code", 20000);
      
      runs(function() {
        expect(response['msg']).toMatch(userpass)
      });
    });    
  }
  
  var makeIncorrectOAuthCustomCodeCall = function(verb) {
    it("should NOT recognize a logged in user in custom code " + verb + " requests", function() {
      var response = null;
      
      StackMob.customcode('hello_world', {}, verb, {
        success: function(result) {
          response = result;
        }
      });
      
      waitsFor(function() {
        return response;
      }, "to get result back from custom code", 20000);
      
      runs(function() {
        expect(response['msg']).toBeNull();
      });
    });    
  }
  
  var userpass = 'ccuser';
  
  createSimpleUser(userpass);
  loginUser(userpass);
  
  makeLegitOAuthCustomCodeCall('GET');
  makeLegitOAuthCustomCodeCall('POST');
  makeLegitOAuthCustomCodeCall('PUT');
  makeLegitOAuthCustomCodeCall('DELETE');
  
  logoutUser(userpass);
  
  makeIncorrectOAuthCustomCodeCall('GET');
  makeIncorrectOAuthCustomCodeCall('POST');
  makeIncorrectOAuthCustomCodeCall('PUT');
  makeIncorrectOAuthCustomCodeCall('DELETE');
  
  deleteUser(userpass);
  
});
