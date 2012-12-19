
/*
 * This suite will try to create a user, login with that user, and logout
 * @param usr username
 */

describe("Login and logout ", function() {
	var usr = 'testuser';

	it("should create " + usr, function() {
		var user = new StackMob.User({
			username : usr,
			password : usr
		});

		var createdUser = null;

		user.create({
			success: function(model) {
				createdUser = model.toJSON();
			}
		});

		waitsFor(function() {
			return createdUser;
		}, "StackMob to create user '" + usr + "'");

	});


	it("should login '" + usr + "'", function() {
		var loggedIn = false;

		var user = new StackMob.User({
			username : usr,
			password : usr
		});

		user.login(false, {
			success : function(model) {
				loggedIn = true;
			}
		});

		waitsFor(function() {
			return loggedIn === true;
		}, "user logged in should be " + usr);

		runs(function() {
			expect(loggedIn).toBeTruthy();
		});
	});

	it("should logout " + usr, function() {
		var user = new StackMob.User({
			username : usr
		});

		var loggedOut = false;

		user.logout({
			success : function(model) {
				loggedOut = true;
			}
		});

		waitsFor(function() {
			return loggedOut === true;
		}, "user logged out should be " + usr);

		runs(function() {
			expect(loggedOut).toBeTruthy();
		});
	});

	deleteUser(usr);
});

describe("asyncronous authentication methods", function(){
	// Set a short session expiry time for testing
	StackMob._session_expiry = 3;
	var usr = 'asynctestuser';

	it("should create " + usr, function() {
		var user = new StackMob.User({
			username : usr,
			password : usr
		});

		var createdUser = null;

		user.create({
			success: function(model) {
				createdUser = model.toJSON();
			}
		});

		waitsFor(function() {
			return createdUser;
		}, "StackMob to create user '" + usr + "'");

	});

	it("should async login", function(){
		var loggedIn = false;

		var user = new StackMob.User({
			username : usr,
			password : usr
		});

		user.login(false, {
			success : function(model) {
				loggedIn = true;
			}
		});

		waitsFor(function() {
			return loggedIn === true;
		}, "user logged in should be " + usr);

		runs(function() {
			expect(loggedIn).toBeTruthy();
		});
	});

	it("should be logged in", function(){
		var loggedIn = false;

		runs(function(){
			StackMob.isUserLoggedIn(usr, {
	      yes: function(result){
	        loggedIn = true;
	      },
	      no: function(result){
	        loggedIn = false;
	      }
	    });
		});

    waitsFor(function(){
    	return loggedIn;
    }, "user '" + usr + "' should be logged in");

	});

  it("should get refresh token from isLoggedIn", function(){
  	var loggedIn = false;
  	waitsFor(function(){
  		return !StackMob.isLoggedIn();
  	}, "wait for session to expire locally");

  	runs(function(){
			StackMob.isLoggedIn({
	      yes: function(result){
	      	console.log(result);
	        loggedIn = true;
	      },
	      no: function(){
	        loggedIn = false;
	      }
	    });
  	});

		waitsFor(function(){
    	return loggedIn;
    }, "user should be logged in");

  });

  it("should get refresh token from isUserLoggedIn", function(){
  	var loggedIn = false;
  	waitsFor(function(){
  		return !StackMob.isLoggedIn();
  	}, "wait for session to expire locally");

  	runs(function(){
  		StackMob.isUserLoggedIn(usr, {
	      yes: function(result){
	      	console.log(result);
	        loggedIn = true;
	      },
	      no: function(){
	        loggedIn = false;
	      }
	    });
  	});

		waitsFor(function(){
    	return loggedIn;
    }, "user should be logged in");

  });

  it("should get refresh token from getLoggedInUser", function(){
  	var loggedIn = false;
  	waitsFor(function(){
  		return !StackMob.isLoggedIn();
  	}, "wait for session to expire locally");

  	runs(function(){
			StackMob.getLoggedInUser({
	      success: function(result){
	      	console.log(result);
	        loggedIn = true;
	      }
	    });
  	});

		waitsFor(function(){
    	return loggedIn;
    }, "user should be logged in");

  });

  it("should get refresh token from isLoggedOut", function(){
  	var loggedIn = false;
  	waitsFor(function(){
  		return !StackMob.isLoggedIn();
  	}, "wait for session to expire locally");

  	runs(function(){
			StackMob.isLoggedOut({
	      yes: function(){
	        loggedIn = false;
	      },
	      no: function(result){
	      	console.log(result);
	        loggedIn = true;
	      }
	    });
  	});

		waitsFor(function(){
    	return loggedIn;
    }, "user should be logged in");

  });

  deleteUser(usr);

});
