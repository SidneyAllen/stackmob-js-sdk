
/*
 * This suite will try to create a user, login with that user, and logout
 * @param usr username
 */

describe("Login and logout ", function() {
	var usr = 'testuser';
	
	createSimpleUser(usr);

	loginUser(usr);
	
	logoutUser(usr);
	
	deleteUser(usr);
});
