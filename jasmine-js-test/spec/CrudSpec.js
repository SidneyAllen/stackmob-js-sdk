/*
 * This suite will test CRUD methods
 */

var TestItem = StackMob.Model.extend({ schemaName: 'testitem' });
var thisTestItem = null;
	
describe("CRUD Methods", function() {
	
	it("should create a user", function() {
		var createdUser = null;
		
		var user = new StackMob.User({
			username: 'testuser',
			password: 'testpassword'
		});
		
		user.create({
			success: function(model) {
				createdUser = model.toJSON();
			}
		});		
		
		waitsFor(function() {
			return createdUser;
		}, "created user should be returned", 20000);
		
		runs(function() {
			expect(createdUser['username']).toEqual('testuser');
		});
	});
	
	it("should update a user", function() {
		var updatedUser = null;
		
		var user = new StackMob.User({ username: 'testuser' });
		user.save({ age: 18 }, {
				success: function(model) {
					updatedUser = model.toJSON();	
				} 
			});
			
		waitsFor(function() {
			return updatedUser;				
		}, "updated user should be returned", 20000);
		
		runs(function() {
			expect(updatedUser['age']).toEqual(18);
			expect(updatedUser['lastmoddate']).toBeGreaterThan(updatedUser['createddate']);
		});
	});
	
	it("should read a user", function() {
		var readUser = null;
		
		var user = new StackMob.User({ username: 'testuser' });
		user.fetch({
			success: function(model) {
				readUser = model.toJSON();
			}
		});
		
		waitsFor(function() {
			return readUser;
		}, "user should be fetched", 20000);
		
		runs(function() {
			expect(readUser['username']).toEqual('testuser');
			expect(readUser['age']).toEqual(18);
		});
	});
	
	it("should delete a user", function() {
		var deletedUser = null;
		
		var user = new StackMob.User({ username: 'testuser' });
		user.destroy({
			success: function(model) {
				deletedUser = model.toJSON();
			}
		});
		
		waitsFor(function() {
			return deletedUser;
		}, "deleted username should be returned", 20000);
		
		runs(function() {
			expect(deletedUser['username']).toEqual(user.get('username'));
		});	
	});
	
	it("should not be able to fetch the deleted user", function() {
		var failureMessage = null;
		
		var user = new StackMob.User({ username: 'testuser' });
		user.fetch({
			error: function(model, result) {
				failureMessage = result;
			}
		});
		
		waitsFor(function() {
			return failureMessage;
		}, 'StackMob should respond', 20000);
		
		runs(function() {
			expect(failureMessage['error']).toEqual('object instance does not exist');
		});
	});
	
});


describe("CRUD Methods for Custom Schemas", function() {
	it("should create a testitem", function() {
		var result = null;
		
		var item = new TestItem({
			name: 'test',
			num: 1,
			decimal: 2.5,
			bool: true,
			arraystring: ['a','b','c'],
			arraynum: [1,2,3],
			arraydecimal: [1.1,2.2,3.3],
			arraybool: [true, false, true]
		});
		
		item.create({
			success: function(model) {
				result = model.toJSON();
				thisTestItem = model;
			}
		});		
		
		waitsFor(function() {
			return result;
		}, "StackMob should respond", 20000);
		
		runs(function() {
			expect(result['name']).toEqual('test');
		});
	});
	
	it("should update a testitem", function() {
		var result = null;
		
		var item = new TestItem({ 'testitem_id': thisTestItem.get('testitem_id') });
		item.save({ num: 5 }, {
				success: function(model) {
					result = model.toJSON();	
				} 
			});
			
		waitsFor(function() {
			return result;				
		}, "StackMob should respond", 20000);
		
		runs(function() {
			expect(result['num']).toEqual(5);
		});
	});
	
	it("should read a testitem", function() {
		var result = null;
		
		var item = new TestItem({ 'testitem_id': thisTestItem.get('testitem_id') });
		item.fetch({
			success: function(model) {
				result = model.toJSON();
			}
		});
		
		waitsFor(function() {
			return result;
		}, "user should be fetched", 20000);
		
		runs(function() {
			expect(result['testitem_id']).toEqual(thisTestItem.get('testitem_id'));
		});
	});
	
	it("should delete a testitem", function() {
		var result = null;
		
		var item = new TestItem({ 'testitem_id': thisTestItem.get('testitem_id') });
		item.destroy({
			success: function(model) {
				result = model.toJSON();
			}
		});
		
		waitsFor(function() {
			return result;
		}, "deleted username should be returned", 20000);
		
		runs(function() {
			expect(result['testitem_id']).toEqual(thisTestItem.get('testitem_id'));
		});	
	});
	
});



/**
 * One to many relationship (user has messages)
 * This suite will test the appendAndCreate, appendAndSave, fetchExpanded,
 * deleteAndSave
 *   (fetchExpanded as well)
 * @param usr username
 * @param count the number of messages to append
 */

describe("CRUD for Relationships", function() {
	var usr = '	testuser';
	var count = 10;
	
	function getMessages() {
		var msgs = [];
		for (var i = 0; i < count; ++i) {
			msgs.push(new Message({'content' : 'message ' + i}));
		}
		return msgs;
	}
	
	it("should add " + count + " messages to user " + usr, function() {
		
		//TODO:move this 
		// deleteUser(usr);
		// createSimpleUser(usr);
		
		var res = null;
		
		var user = new StackMob.User({username : usr});
		user.addRelationship('messages', getMessages(), {
			success: function(addResult) {
				res = addResult;
			}
		})
		
		waitsFor(function() {
			return res;
		}, "StackMob should respond", 20000);
		
		runs(function() {
			expect(res['succeeded'].length).toEqual(count);
		});
	});
	
	it("should append " + count + " more messages", function() {
		
		var user = new StackMob.User({username : usr});
		var res = null;
		
		user.addRelationship('messages', getMessages(), {
			success: function(addResult) {
				res = addResult;
			}
		})
		
		waitsFor(function() {
			return res;
		}, "StackMob should respond", 20000);
		
		runs(function() {
			expect(res['succeeded'].length).toEqual(count);
		});
	});
	
	
	it("should fetch an expanded user with 50 full messages (as indicated by existence of 'message_id' field)", function() {
		var user = new StackMob.User({ username : usr});
		
		var res = null;
		
		user.fetchExpanded(1, {
			success: function(model) {
				res = model.toJSON();
			}
		});
		
		waitsFor(function() {
			return res;
		}, "StackMob should respond", 20000);
		
		runs(function() {
			expect(_.all(res['messages'], function(message) { return message['messages_id']; })).toEqual(true);
			expect(res['messages'].length).toEqual(count * 2);
		});
	});
	
	
	it("should soft delete a message", function() {
		var userMessages = [];
		var softDeleteMessageID = null;
		
		//setup the user messages to track
		runs(function() {
			var user = new StackMob.User({ username: usr });
			user.fetch({
				success: function(model) {
					userMessages = model.toJSON()['messages'];
					softDeleteMessageID = userMessages[0];
				}
			});
			
			waitsFor(function() {
				return softDeleteMessageID;
			}, "StackMob should respond", 20000);	
		});
		
		runs(function() {
			var user = new StackMob.User({ username: usr });
			var res = false;
			
			user.deleteAndSave('messages', softDeleteMessageID, false, {
				success: function(result) {
  					res = true;
  				}
			});
		
			waitsFor(function() {
				return res === true;
			}, "StackMob should respond", 20000);
			
			runs(function() {
				expect(res).toBeTruthy();
			});
		});
		
		runs(function() {
			var user = new StackMob.User({ username : usr});
		
			var res = null;
			
			user.fetch({
				success: function(model) {
					res = model.toJSON();
				}
			});
			
			waitsFor(function() {
				return res;
			}, "StackMob should respond", 20000);
			
			runs(function() {
				expect(_.include(res['messages'], softDeleteMessageID)).not.toBeTruthy();
				expect(res['messages'].length).toEqual(count * 2 - 1);
			});	
		});		
	});
	
	
	
	it("should cascade delete all messages", function() {
		var userMessages = [];
		var softDeleteMessageID = null;
		
		runs(function() {
			var user = new StackMob.User({ username: usr });
			user.fetch({
				success: function(model) {
					userMessages = model.toJSON()['messages'];
					softDeleteMessageID = userMessages[0];
				}
			});
			
			waitsFor(function() {
				return softDeleteMessageID;
			}, "StackMob should response", 20000);	
		});
		
		runs(function() {
			var user = new StackMob.User({ username: usr });
			var res = false;
			
			user.deleteAndSave('messages', userMessages, true, {
				success: function(result) {
  					res = true;
  				}
			});
		
			waitsFor(function() {
				return res === true;
			}, "finish deleting all messages for user " + usr, 20000);
			
			runs(function() {
				expect(res).toBeTruthy();
			});	
		});
		
		runs(function() {
			var user = new StackMob.User({ username : usr});
		
			var res = null;
			
			user.fetch({
				success: function(model) {
					res = model.toJSON();
				}
			});
			
			waitsFor(function() {
				return res;
			}, "StackMob should respond", 20000);
			
			runs(function() {
				expect(res['messages'].length).toEqual(0);
			});	
		});
		
	});
	
	deleteUser(usr);
})

var HTTP_RESPONSE = {
	SUCCESS: "SUCCESS",
	_400: "Bad Request",
	_401: "Insufficient authorization",
	_404: "object instance does not exist",
	_405: "Invalid HTTP method"
};

var LOGIN_TYPE = {
	NONE: { username: null },
	ANY: { username: "acl_any", password: "acl_password" },
	PRIVATE_KEY: { username: "acl_private", password: "acl_password" },
	OWNER: { username: "acl_owner", password: "acl_password" },
	ROLE: { username: "acl_role", password: "acl_password" },
	RELATIONSHIP: { username: "acl_relationship", password: "acl_password" }
};

var makeACLTest = function( opt ){
    var dis = ( opt.expectation == HTTP_RESPONSE.SUCCESS ) ? "" : "dis" 
    
    it("should " + dis + "allow CRUD actions on " + opt.schema + " performed by (" + opt.loginType.username + ")", function(){
        var Class = StackMob.Model.extend({ schemaName: opt.schema });
        var obj = new Class({ name: "test" });
        
        var idFieldName = opt.schema + "_id";
        var randomID = Math.floor( Math.random() * 110 )
        obj.set(idFieldName, "id" + randomID);
        
        var user = new StackMob.User( opt.loginType );

        // Different setup procedures per test type
        switch ( opt.schema ){
        	case "perm_logged_in_relationship":
            case "perm_logged_in_owner":
                runs(function(){    
                    // If testing owner, do creates first under OWNER
                    var loginFlag;
                    user = new StackMob.User( LOGIN_TYPE.OWNER );
                    user.login( false, {
                        success: function(){ loginFlag = true; },
                        error: function(){ loginFlag = false; }
                    });
                    opt.original_expectation = opt.expectation
                    opt.expectation = HTTP_RESPONSE.SUCCESS

                    waitsFor(function() {
                        return (loginFlag === true || loginFlag === false);
                    }, "user to login", 10000);
                }); 
                break;

            default: 
                runs(function(){
                    if ( opt.loginType.username != null ){
                        // Optional Login                   
                        var loginFlag;
                        
                        user.login( false, {
                            success: function(){ loginFlag = true; },
                            error: function(){ loginFlag = false; }
                        });
                        
                        waitsFor(function() {
                            return (loginFlag === true || loginFlag === false);
                        }, "user to login", 10000);
                    }
                });
                break;
        }

        var response = null;

        // Create
        //TODO: also check sm_owner
        runs(function() {
            console.log("Creating... as " + StackMob.getLoggedInUser());
            
            if ( opt.schema == "perm_logged_in_relationship" )
            	obj.set("collaborators", ["acl_relationship"]);
            
            obj.create({
                success: function(){ response = HTTP_RESPONSE.SUCCESS },
                error: function(m,r){ response = r.error }
            });
        });

        waitsFor(function() {
            return ( response != null );
        });

        // Different setup procedures per test type
        switch ( opt.schema ){
        	case "perm_logged_in_relationship":
            case "perm_logged_in_owner":
                // Switch back to original user
                var logoutFlag;
                runs(function(){
                    console.log("logout");
                    user.logout({
                        success: function(){ logoutFlag = true }
                    }); 
                    console.log("and hopefully back as: " + opt.loginType.username);
                });

                waitsFor(function() {
                    return (logoutFlag === true || logoutFlag === false);
                }, "user to logout", 10000);

                runs(function(){
                    if ( opt.loginType.username != null ){
                        console.log("log back in!");
                        user = new StackMob.User( opt.loginType );
                        console.log("login " + opt.loginType.username);
                        var loginFlag;
                        runs(function(){                
                            user.login( false, {
                                success: function(){ loginFlag = true; },
                                error: function(){ loginFlag = false; }
                            });
                        });

                        waitsFor(function() {
                            return (loginFlag === true || loginFlag === false);
                        }, "user to login", 10000);
                    }
                });
                break;
            
                
        }
        // Read
        var readFlag;
        runs(function() {
            expect(response).toEqual(opt.expectation);
            if ( opt.original_expectation != null )
                opt.expectation = opt.original_expectation
            response = null;
            console.log("Reading... as " + StackMob.getLoggedInUser());
 
            obj.fetch({
                success: function(){ response = HTTP_RESPONSE.SUCCESS },
                error: function(m,r){ response = r.error }
            });
        });

        waitsFor(function() {
            return ( response != null );
        });

        // Update 
        var updateFlag;
        runs(function(){
            expect(response).toEqual(opt.expectation);
            response = null;
            console.log("Updating... as " + StackMob.getLoggedInUser());
            
            obj.save({ name: "test2" }, {
                success: function(){ response = HTTP_RESPONSE.SUCCESS },
                error: function(m,r){ response = r.error }
            });
        });

        waitsFor(function() {
            return ( response != null );
        });

        // Delete

        runs(function(){
            expect(response).toEqual(opt.expectation);
            response = null;
            console.log("Deleting... as " + StackMob.getLoggedInUser());
            
            obj.destroy({
                success: function(){ response = HTTP_RESPONSE.SUCCESS },
                error: function(m,r){ response = r.error }
            });
        });

        waitsFor(function() {
            return ( response != null );
        });

        runs(function() {
            if (opt.expectation == HTTP_RESPONSE._404)
                opt.expectation = "This object does not exist";
            expect(response).toEqual(opt.expectation);

            

        });
        
        // logout and wait
        if ( opt.loginType.username != null ){
	        var logoutFlag;
	        runs(function(){
	            console.log("logout");
	            user.logout({
	                success: function(){ logoutFlag = true }
	            }); 
	            console.log("and hopefully back as: " + opt.loginType.username);
	        });
	
	        waitsFor(function() {
	            return (logoutFlag === true || logoutFlag === false);
	        }, "user to logout", 10000);
        }

        // Different teardown procedures depending on schema
        switch ( opt.schema ){
        	case "perm_logged_in_relationship":
                var reloginFlag;
                runs(function(){    
                    // If testing owner, delete under OWNER
                    
                    user = new StackMob.User( LOGIN_TYPE.RELATIONSHIP );
                    user.login( false, {
                        success: function(){ reloginFlag = true; },
                        error: function(){ reloginFlag = false; }
                    });
                });

                waitsFor(function() {
                    return (reloginFlag === true || reloginFlag === false);
                }, "user to login", 10000);

                runs(function(){
                    response = null;
                    console.log("Deleting.... as " + StackMob.getLoggedInUser());
                    obj.destroy({
                        success: function(){ response = HTTP_RESPONSE.SUCCESS },
                        error: function(m,r){ response = r.error }
                    });
                });
                break;
            case "perm_logged_in_owner":
                var reloginFlag;
                runs(function(){    
                    // If testing owner, delete under OWNER
                    
                    user = new StackMob.User( LOGIN_TYPE.OWNER );
                    user.login( false, {
                        success: function(){ reloginFlag = true; },
                        error: function(){ reloginFlag = false; }
                    });
                });

                waitsFor(function() {
                    return (reloginFlag === true || reloginFlag === false);
                }, "user to login", 10000);

                runs(function(){
                    response = null;
                    console.log("Deleting.... as " + StackMob.getLoggedInUser());
                    obj.destroy({
                        success: function(){ response = HTTP_RESPONSE.SUCCESS },
                        error: function(m,r){ response = r.error }
                    });
                });
                break;
        }
    });
    
}


describe("Access Control Lists", function(){

	// Open
	makeACLTest({ schema: 'perm_open', loginType: LOGIN_TYPE.NONE, expectation: HTTP_RESPONSE.SUCCESS });
	makeACLTest({ schema: 'perm_open', loginType: LOGIN_TYPE.ANY, expectation: HTTP_RESPONSE.SUCCESS });
	makeACLTest({ schema: 'perm_open', loginType: LOGIN_TYPE.ROLE, expectation: HTTP_RESPONSE.SUCCESS });
	makeACLTest({ schema: 'perm_open', loginType: LOGIN_TYPE.OWNER, expectation: HTTP_RESPONSE.SUCCESS });
	makeACLTest({ schema: 'perm_open', loginType: LOGIN_TYPE.RELATIONSHIP, expectation: HTTP_RESPONSE.SUCCESS });

	// Private Key (only testing negative case)
	makeACLTest({ schema: 'perm_private_key', loginType: LOGIN_TYPE.NONE, expectation: HTTP_RESPONSE._401 });
	makeACLTest({ schema: 'perm_private_key', loginType: LOGIN_TYPE.ANY, expectation: HTTP_RESPONSE._401 });
	makeACLTest({ schema: 'perm_private_key', loginType: LOGIN_TYPE.ROLE, expectation: HTTP_RESPONSE._401 });
	makeACLTest({ schema: 'perm_private_key', loginType: LOGIN_TYPE.OWNER, expectation: HTTP_RESPONSE._401 });
	makeACLTest({ schema: 'perm_private_key', loginType: LOGIN_TYPE.RELATIONSHIP, expectation: HTTP_RESPONSE._401 });

	// Logged In User
	makeACLTest({ schema: 'perm_logged_in_any', loginType: LOGIN_TYPE.NONE, expectation: HTTP_RESPONSE._401 });
	makeACLTest({ schema: 'perm_logged_in_any', loginType: LOGIN_TYPE.ANY, expectation: HTTP_RESPONSE.SUCCESS });
	makeACLTest({ schema: 'perm_logged_in_any', loginType: LOGIN_TYPE.ROLE, expectation: HTTP_RESPONSE.SUCCESS });
	makeACLTest({ schema: 'perm_logged_in_any', loginType: LOGIN_TYPE.OWNER, expectation: HTTP_RESPONSE.SUCCESS });
	makeACLTest({ schema: 'perm_logged_in_any', loginType: LOGIN_TYPE.RELATIONSHIP, expectation: HTTP_RESPONSE.SUCCESS });

	// SM_Owner
	makeACLTest({ schema: 'perm_logged_in_owner', loginType: LOGIN_TYPE.NONE, expectation: HTTP_RESPONSE._401 });
	makeACLTest({ schema: 'perm_logged_in_owner', loginType: LOGIN_TYPE.ANY, expectation: HTTP_RESPONSE._404 });
	makeACLTest({ schema: 'perm_logged_in_owner', loginType: LOGIN_TYPE.ROLE, expectation: HTTP_RESPONSE._404 });
	makeACLTest({ schema: 'perm_logged_in_owner', loginType: LOGIN_TYPE.OWNER, expectation: HTTP_RESPONSE.SUCCESS });
	makeACLTest({ schema: 'perm_logged_in_owner', loginType: LOGIN_TYPE.RELATIONSHIP, expectation: HTTP_RESPONSE._404 });

	// Role
	makeACLTest({ schema: 'perm_logged_in_role', loginType: LOGIN_TYPE.NONE, expectation: HTTP_RESPONSE._401 });
	makeACLTest({ schema: 'perm_logged_in_role', loginType: LOGIN_TYPE.ANY, expectation: HTTP_RESPONSE._401 });
	makeACLTest({ schema: 'perm_logged_in_role', loginType: LOGIN_TYPE.ROLE, expectation: HTTP_RESPONSE.SUCCESS });
	makeACLTest({ schema: 'perm_logged_in_role', loginType: LOGIN_TYPE.OWNER, expectation: HTTP_RESPONSE._401 });
	makeACLTest({ schema: 'perm_logged_in_role', loginType: LOGIN_TYPE.RELATIONSHIP, expectation: HTTP_RESPONSE._401 });

	// Relationship
	makeACLTest({ schema: 'perm_logged_in_relationship', loginType: LOGIN_TYPE.NONE, expectation: HTTP_RESPONSE._401 });
	makeACLTest({ schema: 'perm_logged_in_relationship', loginType: LOGIN_TYPE.ANY, expectation: HTTP_RESPONSE._404 });
	makeACLTest({ schema: 'perm_logged_in_relationship', loginType: LOGIN_TYPE.ROLE, expectation: HTTP_RESPONSE._404 });
	makeACLTest({ schema: 'perm_logged_in_relationship', loginType: LOGIN_TYPE.OWNER, expectation: HTTP_RESPONSE._404 });
	makeACLTest({ schema: 'perm_logged_in_relationship', loginType: LOGIN_TYPE.RELATIONSHIP, expectation: HTTP_RESPONSE.SUCCESS });

	// Not Allowed
	makeACLTest({ schema: 'perm_not_allowed', loginType: LOGIN_TYPE.NONE, expectation: HTTP_RESPONSE._405 });
	makeACLTest({ schema: 'perm_not_allowed', loginType: LOGIN_TYPE.ANY, expectation: HTTP_RESPONSE._405 });
	makeACLTest({ schema: 'perm_not_allowed', loginType: LOGIN_TYPE.ROLE, expectation: HTTP_RESPONSE._405 });
	makeACLTest({ schema: 'perm_not_allowed', loginType: LOGIN_TYPE.OWNER, expectation: HTTP_RESPONSE._405 });
	makeACLTest({ schema: 'perm_not_allowed', loginType: LOGIN_TYPE.RELATIONSHIP, expectation: HTTP_RESPONSE._405 });

})

