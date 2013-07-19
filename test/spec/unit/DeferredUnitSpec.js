describe("Unit tests for Deferred Objects", function() {

  // Set up mock call
  var mockCreate = $.mockjax({
    url: 'http://api.stackmob.com/*',
    status: 200,
    type: "POST",
    responseTime: 10,
    responseText: {
      hello: 'World!'
    }
  });

  // Set up mock call
  var mockFetch = $.mockjax({
    url: 'http://api.stackmob.com/*',
    status: 200,
    type: "GET",
    responseTime: 10,
    responseText: {
      hello: 'World!'
    }
  });

  // Set up mock call
  var mockPut = $.mockjax({
    url: 'http://api.stackmob.com/*',
    status: 200,
    type: "PUT",
    responseTime: 10,
    response: function(settings) {
      this.responseText = {
        hello: 'World!'
      };
    }
  });

  // Set up mock call
  var mockDelete = $.mockjax({
    url: 'http://api.stackmob.com/*',
    status: 200,
    type: "DELETE",
    responseTime: 10,
    responseText: {
      hello: 'World!'
    }
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

  it("should cleanup mock ajax methods ", function() {

    runs(function() {
        // Cleanup ajax mock
        $.mockjaxClear(mockCreate);
        $.mockjaxClear(mockFetch);
        $.mockjaxClear(mockPut);
        $.mockjaxClear(mockDelete);
    });
  });

});