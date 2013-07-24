/**
 * This suite will test the three security modes of the SDK
 * Always - All requests will be made over HTTPS
 * Never - All requests will be made over HTTP
 * Mixed - Only authentication methods will be made over HTTPS
 */

describe("Unit tests for relationship headers", function() {

  // Mock Ajax Calls
  it("should set up mock ajax", function() {
    mockCreate = mockCreateAsSuccess();
    mockFetch = mockFetchAsSuccess();
    mockPut = mockUpdateAsSuccess();
    mockDelete = mockDeleteAsSuccess();
  });

  it("should add relationship headers", function() {

    // Method 1: Define on global scope
    ParentModel = StackMob.RelationalModel.extend({
      schemaName: 'parent',
      relations: [{
        type: Backbone.HasMany,
        key: "childField",
        relatedModel: "ChildModel"
      },{
        type: Backbone.HasMany,
        key: "anotherChildField",
        relatedModel: "ChildModel"
      }]
    });

    ChildModel = StackMob.RelationalModel.extend({
      schemaName: "child",
      relations: [{
        type: Backbone.HasMany,
        key: "parentField",
        relatedModel: "ParentModel"
      }]
    });

    var parent = new ParentModel();

    var running = true, params;

    runs(function() {
      parent.create({
        done: function(model, p, m) {
          running = false;
          params = p;
        }
      });
    });

    waitsFor(function() {
      return running === false;
    });

    runs(function() {
      expect(params['headers']['X-StackMob-Relations']).toEqual('childField=child&anotherChildField=child');
    });

  });

  it("should clear ajax mocks", function() {
    runs(function() {
      clearAllAjaxMocks();
    });
  });

});