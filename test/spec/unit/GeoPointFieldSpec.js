/**
 * Created with JetBrains PhpStorm.
 * User: ardo
 * Date: 6/5/13
 * Time: 11:32 AM
 *
 * GeoPoint Field Spec
 */

describe("GeoPoint Field Unit Tests", function() {

  it("should have headers geopoint field set", function() {
    runs(function() {
      var myAttraction = new Attraction({
        "name" : "Golden Gate Bridge",
        "location" : {
          "lon" : -122.419416,
          "lat" : 37.77493
        },
        "flag":"mLocation"
      });

      myAttraction.save(null, {
        done: function(model, param, method) {
          var headerFieldType = param['headers']['X-StackMob-FieldTypes'];
          expect(headerFieldType).toEqual('location=geopoint');
        }
      });
    });
  });

});