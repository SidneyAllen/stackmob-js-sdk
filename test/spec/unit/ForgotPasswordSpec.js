describe("Forgot Password Tests", function() {

  // Mock Ajax Calls
  var mockCreate, mockFetch, mockPut, mockDelete;

  it("should set up mock ajax", function() {
    mockCreate = mockCreateAsSuccess();
    mockFetch = mockFetchAsSuccess();
    mockPut = mockUpdateAsSuccess();
    mockDelete = mockDeleteAsSuccess();
  });

  //DEFAULT USER OBJECT
  it("should set the username field as username for a StackMob.User object", function() {
    runs(function() {
      var s = new StackMob.User({ username: 'testUser' });
      expectEndpoint(s, [], 'forgotPassword', 'POST', 'user/forgotPassword');

    });

    runs(function() {
      var s = new StackMob.User({ username: 'testUser' });
      s.forgotPassword({
        done: function(model, params, method) {
          expect(params['data']).toHaveJSONWith('username', 'testUser');
        }
      });
    });
  });

  //CUSTOM USER OBJECT  
  it("should set the username field as username to conform with the REST API spec, even with custom login fields", function() {
    var Student = StackMob.User.extend({ schemaName: 'student', loginField: 'user', passworldField: 'pass' });

    runs(function() {
      var s = new Student({ user: 'testUser' });
      expectEndpoint(s, [], 'forgotPassword', 'POST', 'student/forgotPassword');

    });

    runs(function() {
      var s = new Student({ user: 'testUser'});
      s.forgotPassword({
        done: function(model, params, method) {
          expect(params['data']).toHaveJSONWith('username', 'testUser');
        }
      });
    });
  });

  it("should clear ajax mocks", function() {
    runs(function() {
      clearAllAjaxMocks();
    });
  });

});