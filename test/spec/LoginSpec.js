/*
 * This suite will try to create a user, login with that user, and logout
 * @param usr username
 */

describe("Login and logout ", function() {
	var usr = 'testuser';
	
	createSimpleUser(usr);

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


	it("should log in '" + usr + "'", function() {
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
			return loggedIn == true;
		}, "user logged in should be " + usr);

		runs(function() {
			expect(user.isLoggedIn()).toBeTruthy();
			expect(StackMob.isLoggedOut()).toBeFalsy();
			expect(StackMob.isLoggedIn()).toBeTruthy();
			expect(StackMob.getLoggedInUser()).toNotBe(null);
		});
	});

	it("should log out " + usr, function() {
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
			return loggedOut == true;
		}, "user logged out should be " + usr);

		runs(function() {
			expect(user.isLoggedIn()).toBeFalsy();
			expect(StackMob.isLoggedOut()).toBeTruthy();
			expect(StackMob.isLoggedIn()).toBeFalsy();
			expect(StackMob.getLoggedInUser()).toBeNull();
		});
	});

	deleteUser(usr);
});

describe("asyncronous authentication methods", function(){
	var usr = 'asynctestuser';

	it("should override session expiry for testing", function(){
		runs(function(){
			setSessionExpiry(3);
		});
	});

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

		runs(function() {
			expect(user.isLoggedIn()).toBeFalsy();
			expect(StackMob.isLoggedOut()).toBeTruthy();
			expect(StackMob.isLoggedIn()).toBeFalsy();
			expect(StackMob.getLoggedInUser()).toBeNull();
		});

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
			expect(user.isLoggedIn()).toBeTruthy();
			expect(StackMob.isLoggedOut()).toBeFalsy();
			expect(StackMob.isLoggedIn()).toBeTruthy();
			expect(StackMob.getLoggedInUser()).toBe(usr);
		});
	});

	it("should be async logged in", function(){
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
	      yes: function(username){
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
  	var loggedInUser = null;
  	waitsFor(function(){
  		return !StackMob.isLoggedIn();
  	}, "wait for session to expire locally");

  	runs(function(){
			StackMob.getLoggedInUser({
	      success: function(username){
	      	loggedInUser = username;
	        loggedIn = true;
	      }
	    });
  	});

		waitsFor(function(){
    	return loggedIn;
    }, "user should be logged in");

    runs(function() {
			expect(StackMob.isLoggedOut()).toBeFalsy();
			expect(StackMob.isLoggedIn()).toBeTruthy();
			expect(StackMob.getLoggedInUser()).toBe(usr);
			expect(loggedInUser).toBe(usr);
		});

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
	        loggedIn = true;
	      }
	    });
  	});

		waitsFor(function(){
    	return loggedIn;
    }, "user should be logged in");

  });

  it("should reset session expiry", function(){
		runs(function(){
			setSessionExpiry(3600);
		});
	});

  deleteUser(usr);

});
