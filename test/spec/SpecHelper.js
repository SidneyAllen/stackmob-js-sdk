/**
* If some tests are failing, please try running ALL the tests again for another 2 times
* Tests are split into some functions and these functions get called at the bottom of this file under document.ready
*/

var Message = StackMob.Model.extend({
  schemaName : 'message'
});

var Messages = StackMob.Collection.extend({
  model : Message
});

var Attraction = StackMob.Model.extend({
  schemaName: 'attraction'
});

var Attractions = StackMob.Collection.extend({
  model: Attraction
});

var initAge = 10;
var initMoney = 100.01;
var range = 3;
var initLocation = 'location';

var StackMobErrors = {
  INVALID_TYPE : "has invalid type, please check your schema",
  PRIMARY_KEY_UPDATE : "unable to update primary key",
  INSTANCE_DOES_NOT_EXIST : "instance does not exist",
  INCOMPATIBLE_TYPE: "an incompatible type, please check your schema"
};

function isFloat (n) {
  return n===+n && n!==(n|0);
}

function isInteger (n) {
  return n===+n && n===(n|0);
}

/** CREATE AND DELETE USER START **/
function createSimpleUser(usr) {
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
}

function loginUser(usr) {
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
      expect(user.isLoggedIn()).toBeTruthy();
      expect(StackMob.isLoggedOut()).toBeFalsy();
      expect(StackMob.isLoggedIn()).toBeTruthy();
      expect(StackMob.getLoggedInUser()).toNotBe(null);
    });
  });
}

function logoutUser(usr) {
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
      expect(user.isLoggedIn()).toBeFalsy();
      expect(StackMob.isLoggedOut()).toBeTruthy();
      expect(StackMob.isLoggedIn()).toBeFalsy();
      expect(StackMob.getLoggedInUser()).toBeNull();
    });
  });
}

/**
* This function is to create user with some special fields
* User will have 'age' and 'location' fields.
* Age field will start from 10...(10 + howMany)
* 'flag' field is for us to delete the users created solely from this function
*   (so we can query users who have this flag and delete them)
* @param howMany the number of users to create
* @return the number of created multiple users
*/
function createMultipleUser(howMany) {
  var count = 0; 
  it(howMany + " user(s) should be created", function() {
    for (var i = 0; i < howMany; ++i) {
      var user = new StackMob.User({
        'username' : 'test' + i, 
        'password' : 'test' + i, 
        'age' : initAge + i, 
        'location' : initLocation + i, 
        'money' : initMoney + i, 
        'colors' : ['red', 'green', 'blue', 'some_color' + i],
        'numbers' : [1, 2, 3, i],
        'flag' : 'mUser',
        'vegetarian' : true
      });  

      user.create({
        success : function(model) {
          count = count + 1; 
        }    
      });  
    }    

    waitsFor(function() {
      return count === howMany;
    }, "number of created user should be " + howMany, howMany * 2000);

    runs(function() {
      expect(count).toEqual(howMany);
    });
  });

  waitsFor(function() {
    return count === howMany;
  }, "before returning the number of created users", howMany * 2000);
  return howMany;
}

/**
* If you use createdMultipleUsers, make sure to call this deleteMultipleCreatedUsers in the end
*   to delete all the users created from createdMultipleUsers
* @param howMany the number of users to delete
*/
function deleteMultipleCreatedUsers(howMany) {
  it(howMany + " user(s) should be deleted", function() {
   var count = 0;

   var q = new StackMob.Collection.Query();
   var users = new StackMob.Users();
   q.equals('flag', 'mUser');

   users.query(q, {
    success : function(collection) {
     for (var i = 0; i < collection.models.length; ++i) {
      var user = new StackMob.User({ username : collection.models[i]['id'] });
      user.destroy({
       success : function() {
        count = count + 1;
      }
    });
    }
  }
});

   waitsFor(function() {
    return count === howMany;
  }, "user deleted should be " + howMany, howMany * 2000);

   runs(function() {
    expect(count).toEqual(howMany);
  });
 });
}

/**
* Does not delete relationship
* @param usr the user to delete
*/
function deleteUser(usr) {
  it("should delete user: " + usr, function() {
   var user = new StackMob.User({
    username : usr
  });
   var name = "";

   user.destroy({
    success : function(model) {
     name = model.get('username');
   }
 });

   waitsFor(function() {
    return name === usr;
  }, "user deleted should be " + usr, 20000);

   runs(function() {
    expect(name).toEqual(usr);
  });
 });
}

/** CREATE AND DELETE USER SECTION END **/

/** MICRO FUNCTIONS START **/
/**
* This method is to delete all messages in the schema, in case it needs to be cleaned up
*/
function deleteAllMessagesInSchema() {
  var msgs = new Messages();
  var msgIDs = [];
  msgs.fetch({
   success: function(collection) {
    for (var i = 0; i < collection.models.length; ++i) {
     var msg = collection.models[i];
     msg.destroy();
   }
 }
});
}

/**
* This method is to delete all attractions in the schema, in case it needs to be cleaned up
*/
function deleteAllAttractions() {
  var attrs = new Attractions();
  var attrIDs = [];
  attrs.fetch({
   success: function(collection) {
    for (var i = 0; i < collection.models.length; ++i) {
     var attr = collection.models[i];
     attr.destroy();
   }
 }
})
}

describe("Simple select functionality (standalone) on a model", function() {
var mySingleUser = 'test0'; //this is the user that's created by createMultipleUser()
createMultipleUser(1);

it("should only fetch user with its money field only (along with the primary key, i.e. username)", function() {
  var queriedUser = null;
  var user = new StackMob.User({
    username: mySingleUser
  });
  var myQuery = new StackMob.Model.Query();
  myQuery.select('money');
  user.query(myQuery, {
    success: function(model) {
      queriedUser = model;
    }
  });

  waitsFor(function() {
    return queriedUser !== null;
  }, "to finish querying with select 'money'", 20000);

  runs(function() {
    expect(queriedUser['attributes']['username']).toNotEqual(undefined);
    expect(queriedUser['attributes']['money']).toNotEqual(undefined);
    expect(queriedUser['attributes']['age']).toEqual(undefined);
    expect(queriedUser['attributes']['location']).toEqual(undefined);
  });
});

it("should fetch user with its money and age fields only", function() {
  var queriedUser = null;
  var user = new StackMob.User({
    username: mySingleUser
  });
  var myQuery = new StackMob.Model.Query();
  myQuery.select('money').select('age');
  user.query(myQuery, {
    success: function(model) {
      queriedUser = model;
    }
  });

  waitsFor(function() {
    return queriedUser !== null;
  }, "to finish querying with select 'money'", 20000);

  runs(function() {
    expect(queriedUser['attributes']['username']).toNotEqual(undefined);
    expect(queriedUser['attributes']['money']).toNotEqual(undefined);
    expect(queriedUser['attributes']['age']).toNotEqual(undefined);
    expect(queriedUser['attributes']['location']).toEqual(undefined);
  });
});

deleteMultipleCreatedUsers(1);
});

describe("Testing combination of select functionality on a collection", function() {
  var howMany = 10;
var newAge = 21; // needs to be > 20. Look at the implementation of createMultipleUser
var count = 0;
var num = createMultipleUser(howMany);

waitsFor(function() {
  return num === howMany;
}, "waits until all users creation to be done", howMany * 2000);

it("should update some users data first to be able to see the select functionality power", function() {
    //update some users so we can use some advanced query
    var i = 0;
    for (i = 0; i < howMany; ++i) {
      if (i%2 === 0) {
        var user = new StackMob.User({
          username: 'test' + i
        });
        user.save({age:newAge}, {
          success: function(model) {
            count = count + 1;
          }
        });
      }
    }

    waitsFor(function() {
      return count === (howMany/2);
    }, "waits for all users update to be done", howMany * 2000);

    runs(function() {
      expect(count).toEqual(howMany/2);
    });
  });

it("should fetch only " + (howMany / 2) + " users in total whose age is equal to 'newAge' and all of them should have only their money field", function() {
  var users = new StackMob.Users();
  var queriedUsers = null;
  var myQuery = new StackMob.Collection.Query();
  myQuery.select('money').equals('flag', 'mUser').equals('age', newAge);
  users.query(myQuery, {
    success: function(collection) {
      queriedUsers = collection;
    }
  });

  waitsFor(function() {
    return queriedUsers !== null;
  }, "finish querying with advanced query", howMany * 2000);

  runs(function() {
    expect(queriedUsers.length).toEqual(howMany/2);
    var i = 0; var max = howMany/2;
    for (i = 0; i < max; ++i) {
      expect(queriedUsers.models[i]['attributes']['money']).toNotEqual(undefined);
      expect(queriedUsers.models[i]['attributes']['age']).toEqual(undefined);
      expect(queriedUsers.models[i]['attributes']['location']).toEqual(undefined);
    }
  });
});

it("should fetch only " + (howMany / 2) + " users in total whose age is < 'newAge' and all of them should have only their age and money fields", function() {
  var users = new StackMob.Users();
  var queriedUsers = null;
  var myQuery = new StackMob.Collection.Query();
  myQuery.select('money').equals('flag', 'mUser').lt('age', newAge).select('age');
  users.query(myQuery, {
    success: function(collection) {
      queriedUsers = collection;
    }
  });

  waitsFor(function() {
    return queriedUsers !== null;
  }, "finish querying with advanced query", howMany * 2000);

  runs(function() {
    expect(queriedUsers.length).toEqual(howMany/2);
    var i = 0; var max = howMany/2;
    for (i = 0; i < max; ++i) {
      expect(queriedUsers.models[i]['attributes']['money']).toNotEqual(undefined);
      expect(queriedUsers.models[i]['attributes']['age']).toNotEqual(undefined);
      expect(queriedUsers.models[i]['attributes']['location']).toEqual(undefined);
    }
  });
});

deleteMultipleCreatedUsers(howMany);
});


// UNIT TESTS
function enableUnitTests(){
  it("should enable unit tests", function(){
    // Save original for reverting late
    StackMob.makeAPICall_original = StackMob.makeAPICall;

    // Add Unit Test Handler
    StackMob.ajaxOptions.unitTest = function(model, params, method){
      params['done'](model, params, method);
    }

    // Force Unit Test Callback Handler
    StackMob.makeAPICall = function(model, params, method){
      return StackMob['ajaxOptions']['unitTest'](model, params, method);
    }
  });
}

function disableUnitTests(){
  it("should disable unit tests", function(){
    StackMob.makeAPICall = StackMob.makeAPICall_original;
  });
}