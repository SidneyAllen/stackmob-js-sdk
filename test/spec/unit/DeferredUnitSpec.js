describe("Unit tests for Deferred Objects", function() {

  // Mock Ajax Calls
  var mockCreate, mockFetch, mockPut, mockDelete;

  it("should set up mock ajax", function() {
    mockCreate = mockCreateAsSuccess();
    mockFetch = mockFetchAsSuccess();
    mockPut = mockUpdateAsSuccess();
    mockDelete = mockDeleteAsSuccess();
  });

  var Thing = StackMob.Model.extend({
    schemaName: "thing"
  });

  var thing = new Thing({
    value: "value"
  });

  var running = true,
      success = false;

  it("should return deferred objects for CRUD", function() {

    runs(function() {
      thing.create().done(function() {
        console.log("Created. Querying...");
        return thing.query();
      }).then(function() {
        console.log("Queried. Fetching...");
        return thing.fetch();
      }).then(function() {
        console.log("Fetched. Saving...");
        return thing.save();
      }).then(function() {
        console.log("Saved. Fetching expanded...");
        return thing.fetchExpanded();
      }).then(function() {
        console.log("Fetched Expanded. Appending...");
        return thing.appendAndCreate();
      }).then(function() {
        console.log("Appended. Adding relationship...");
        return thing.addRelationship();
      }).then(function() {
        console.log("Added relationship. Appending...");
        return thing.appendAndSave();
      }).then(function() {
        console.log("Appended. Deleting and saving...");
        return thing.deleteAndSave();
      }).then(function() {
        console.log("Deleted and saved. Destroying...");
        return thing.destroy();
      }).then(function() {
        console.log("Success");
        success = true;
      }).fail(function() {
        console.log("Error");
      }).always(function(){
        console.log("Always");
        running = false;
      });
    });

    waitsFor(function() {
      return running === false;
    });

    runs(function() {
      expect(success).toBeTruthy();
    });

  });

  it("should clear ajax mocks", function() {
    runs(function() {
      clearAllAjaxMocks();
    });
  });

});