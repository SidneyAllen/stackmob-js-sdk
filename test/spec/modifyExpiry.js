var setSessionExpiry = function(expires_in) {
  _.extend(StackMob, {
    prepareCredsForSaving : function(accessToken, refreshToken, macKey, expires, user) {
      //For convenience, the JS SDK will save the expiration date of these credentials locally so that the developer can check for it if need be.
      var unvalidated_expiretime = (new Date()).getTime() + (expires_in * 1000);
      var creds = {
        'oauth2.accessToken' : accessToken,
        'oauth2.macKey' : macKey,
        'oauth2.expires' : unvalidated_expiretime,
        'oauth2.user' : user
      };
      creds[StackMob.REFRESH_TOKEN_KEY] = refreshToken;

      return creds;
    }
  });
};