/**
 * This suite will test all the query functions that StackMob has
 * (StackMob.Collection.Query) except for StackMob.GeoPoint
 * More:
 * https://www.stackmob.com/devcenter/docs/Javascript-API-Docs#a-stackmob.collection.query
 */

describe("Unit tests for queries", function() {

  // Mock Ajax Calls
  var mockCreate, mockFetch, mockPut, mockDelete;

  it("should set up mock ajax", function() {
    mockCreate = mockCreateAsSuccess();
    mockFetch = mockFetchAsSuccess();
    mockPut = mockUpdateAsSuccess();
    mockDelete = mockDeleteAsSuccess();
  });


  var isAged  = new StackMob.Collection.Query().equals("age", "25");
  var notJohn = new StackMob.Collection.Query().notEquals("name", "john").equals("location", "NYC");
  var notMary = new StackMob.Collection.Query().equals("location", "SF").notEquals("name", "mary");
  var isLA    = new StackMob.Collection.Query().equals("location", "LA");
  var isIn    = new StackMob.Collection.Query().mustBeOneOf("location", "SF,LA");
  var isNin   = new StackMob.Collection.Query().mustNotBeOneOf("location", "SF,LA");

  it("should query AND", function() {
    runs(function() {
      var q = isAged.and( notJohn );

      var expectation = {
        "location": "NYC",
        "name[ne]": "john",
        "age": "25"
      };

      expect(q['params']).toEqual(expectation);

    });

  });

  it("should query OR", function() {
    runs(function() {
      var q = notJohn.or(notMary).or(isLA);

      var expectation = {
        "[or1].[and1].location": "NYC",
        "[or1].[and1].name[ne]": "john",
        "[or1].[and2].location": "SF",
        "[or1].[and2].name[ne]": "mary",
        "[or1].location": "LA"
      };

      expect(q['params']).toEqual(expectation);

    });

  });

  it("should query AND(OR)", function() {
    runs(function() {

      var q = isAged.and( notJohn.or(notMary).or(isLA) );

      var expectation = {
        "[or1].[and1].location": "NYC",
        "[or1].[and1].name[ne]": "john",
        "[or1].[and2].location": "SF",
        "[or1].[and2].name[ne]": "mary",
        "[or1].location": "LA",
        "age": "25"
      };

      expect(q['params']).toEqual(expectation);

    });
  });

  it("should query fail and suggest IN - new OR query", function() {
    runs(function() {

      var q = function(){
        isAged.and( isLA.or(isLA) );
      };

      expect(q).toThrow();

    });
  });

  it("should query fail and suggest IN - existing OR query", function() {
    runs(function() {

      var q = function(){
        isAged.and( notJohn.or(isLA).or(isLA) );
      };

      expect(q).toThrow();

    });
  });

  it("should query for in", function() {
    runs(function() {

      var q = isIn;

      var expectation = {
        "location[in]": "SF,LA"
      };

      expect(q['params']).toEqual(expectation);

    });
  });

  it("should query for not in", function() {
    runs(function() {

      var q = isNin;

      var expectation = {
        "location[nin]": "SF,LA"
      };

      expect(q['params']).toEqual(expectation);

    });
  });

  it("should query for empty string", function() {
    runs(function() {

      var q = new StackMob.Collection.Query();
      q.equals("name","");

      var expectation = {
        "name[empty]": true
      };

      expect(q['params']).toEqual(expectation);

    });
  });

  it("should query for non-empty string", function() {
    runs(function() {

      var q = new StackMob.Collection.Query();
      q.notEquals("name","");

      var expectation = {
        "name[empty]": false
      };

      expect(q['params']).toEqual(expectation);

    });
  });

  it("should not alter query object on count query", function() {
    runs(function() {

      var Item = StackMob.Model.extend({ schemaName: 'item' }),
          Items = StackMob.Collection.extend({ model: Item }),
          itemsCount = new Items(),
          q = new StackMob.Collection.Query();

      itemsCount.count(q, {
        done: function(count) {
          // No need to do anything
        }
      });

      expect(q).toEqual(new StackMob.Collection.Query());

    });

  });

  it("should clear ajax mocks", function() {
    runs(function() {
      clearAllAjaxMocks();
    });
  });

});
