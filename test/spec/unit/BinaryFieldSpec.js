/**
 * Binary Field Unit Tests
 */

describe("Binary Field Unit Tests", function() {

  // Mock Ajax Calls
  var mockCreate, mockFetch, mockPut, mockDelete;

  it("should set up mock ajax", function() {
    mockCreate = mockCreateAsSuccess();
    mockFetch = mockFetchAsSuccess();
    mockPut = mockUpdateAsSuccess();
    mockDelete = mockDeleteAsSuccess();
  });

  var Profile = StackMob.Model.extend({
    schemaName: 'profile',
    binaryFields: ['pic', 'pic2']
  });

  it("should exclude binary fields", function() {
    runs(function() {
      var p = new Profile({
        profile_id: '123',
        item: 'stuff',
        profession: 'asdf',
        pic: 'http://s3.amazonaws.com/stuff.png',
        pic2: 'https://s3.amazonaws.com/stuff.png'
      });

      p.save(null, {
        inspectParams: function(model, param, method) {
          expect(JSON.parse(param['data'])).toEqual({
            profile_id: '123',
            item: 'stuff',
            profession: 'asdf'

          });
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
