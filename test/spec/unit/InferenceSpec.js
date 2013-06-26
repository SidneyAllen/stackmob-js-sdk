/**
 * Inference Field Spec
 * @author ardokusuma <ardo@stackmob.com>
 */

describe("Inference Field Unit Tests", function() {

  it("should have headers GeoPoint field set", function() {
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

  it("should not have headers GeoPoint field set for 2 GeoPoint fields", function() {
    runs(function() {
      var myAttraction = new Attraction({
        "name" : "Golden Gate Bridge",
        "location" : {
          "lon" : -122.419416,
          "lat" : 37.77493
        },
        "locationTwo" : {
          "lon" : -100.00001,
          "lat" : 55.5555
        },
        "flag":"mLocation"
      });

      expect(myAttraction.save).toThrow();

    });
  });

  it("should not have headers GeoPoint field for GET", function() {
    runs(function() {
      var myAttraction = new Attraction({
        "name" : "Golden Gate Bridge",
        "location" : {
          "lon" : -122.419416,
          "lat" : 37.77493
        },
        "locationTwo" : {
          "lon" : -100.00001,
          "lat" : 55.5555
        },
        "flag":"mLocation"
      });

      myAttraction.fetch({
        done: function(model, param, method) {
          var headerFieldType = param['headers']['X-StackMob-FieldTypes'];
          expect(headerFieldType).toEqual(undefined);
        }
      });
    });
  });

  it("should not have headers GeoPoint field for DELETE", function() {
    runs(function() {
      var myAttraction = new Attraction({
        "name" : "Golden Gate Bridge",
        "location" : {
          "lon" : -122.419416,
          "lat" : 37.77493
        },
        "locationTwo" : {
          "lon" : -100.00001,
          "lat" : 55.5555
        },
        "flag":"mLocation"
      });

      myAttraction.destroy({
        done: function(model, param, method) {
          var headerFieldType = param['headers']['X-StackMob-FieldTypes'];
          expect(headerFieldType).toEqual(undefined);
        }
      });
    });
  });

  var Profile = StackMob.Model.extend({
    schemaName: 'profile',
    binaryFields: ['pic', 'pic2']
  });

  it("should have headers Binary field set", function() {
    runs(function() {
      var p = new Profile({
        profile_id: '123',
        item: 'stuff',
        profession: 'asdf',
        bin_inference: "Content-Type: application/x-x509-ca-cert\nContent-Disposition: attachment; filename=arcee-testing.crt\nContent-Transfer-Encoding: base64\n\nLS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS"
      });

      p.save(null, {
        done: function(model, param, method) {
          var headerFieldType = param['headers']['X-StackMob-FieldTypes'];
          expect(headerFieldType).toEqual('bin_inference=binary');
        }
      });
    });
  });

  it("should not have headers Binary field for GET", function() {
    runs(function() {
      var p = new Profile({
        profile_id: '123',
        item: 'stuff',
        profession: 'asdf',
        bin_inference: "Content-Type: application/x-x509-ca-cert\nContent-Disposition: attachment; filename=arcee-testing.crt\nContent-Transfer-Encoding: base64\n\nLS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS"
      });

      p.fetch({
        done: function(model, param, method) {
          var headerFieldType = param['headers']['X-StackMob-FieldTypes'];
          expect(headerFieldType).toEqual(undefined);
        }
      });
    });
  });

  it("should not have headers Binary field for DELETE", function() {
    runs(function() {
      var p = new Profile({
        profile_id: '123',
        item: 'stuff',
        profession: 'asdf',
        bin_inference: "Content-Type: application/x-x509-ca-cert\nContent-Disposition: attachment; filename=arcee-testing.crt\nContent-Transfer-Encoding: base64\n\nLS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS"
      });

      p.destroy({
        done: function(model, param, method) {
          var headerFieldType = param['headers']['X-StackMob-FieldTypes'];
          expect(headerFieldType).toEqual(undefined);
        }
      });
    });
  });

});