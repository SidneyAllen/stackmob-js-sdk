
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
		}, 'StackMob should respond', 20000);
		
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
		}, "user logged in should be " + usr, 20000);
		
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
		}, "user logged out should be " + usr, 20000);
		
		runs(function() {
			expect(loggedOut).toBeTruthy();
		});
	});
	
	deleteUser(usr);
});
