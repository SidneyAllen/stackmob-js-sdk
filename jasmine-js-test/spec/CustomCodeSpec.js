/**
 * This suite will test custom code to handle GET, POST, PUT, DELETE
 * It will just check the return map from the custom code (check the verb name)
 * HENCE, the custom code method needs to return the verb
 * 
 * NOTICE: make sure the method name you call is returning the verb as a Map("verb" -> "the_verb_as_a_String")
 */

describe("Custom Code Method Verb", function(){
	it("should have GET as the verb", function(){
		var goodToContinue = false;
		var result = '';
		
		StackMob.customcode('no_param', {}, {
			success: function(jsonResult) {
				result = jsonResult.verb;
				goodToContinue = true;
			},
			error: function(failure) {}
		});
		
		waitsFor(function() {
			return goodToContinue === true;
		}, "to finish querying", 20000);
		
		runs(function() {
			expect(result).toMatch('GET');
		});
	});
	
	it("should have POST as the verb", function(){
		var goodToContinue = false;
		var result = '';
		
		StackMob.customcode('no_param', {}, 'POST', {
			success: function(jsonResult) {
				result = jsonResult.verb;
				goodToContinue = true;
			},
			error: function(failure) {}
		});
		
		waitsFor(function() {
			return goodToContinue === true;
		}, "to finish querying", 20000);
		
		runs(function() {
			expect(result).toMatch('POST');
		});
	});
	
	it("should have DELETE as the verb", function(){
		var goodToContinue = false;
		var result = '';
		
		StackMob.customcode('no_param', {}, 'DELETE', {
			success: function(jsonResult) {
				result = jsonResult.verb;
				goodToContinue = true;
			},
			error: function(failure) {}
		});
		
		waitsFor(function() {
			return goodToContinue === true;
		}, "to finish querying", 20000);
		
		runs(function() {
			expect(result).toMatch('DELETE');
		});
	});
	
	it("should have PUT as the verb", function(){
		var goodToContinue = false;
		var result = '';
		
		StackMob.customcode('no_param', {}, 'PUT', {
			success: function(jsonResult) {
				result = jsonResult.verb;
				goodToContinue = true;
			},
			error: function(failure) {}
		});
		
		waitsFor(function() {
			return goodToContinue === true;
		}, "to finish querying", 20000);
		
		runs(function() {
			expect(result).toMatch('PUT');
		});
	});
	
	it("should have DELETE as the verb", function(){
		var goodToContinue = false;
		var result = '';
		
		StackMob.customcode('no_param', {}, 'DELETE', {
			success: function(jsonResult) {
				result = jsonResult.verb;
				goodToContinue = true;
			},
			error: function(failure) {}
		});
		
		waitsFor(function() {
			return goodToContinue === true;
		}, "to finish querying", 20000);
		
		runs(function() {
			expect(result).toMatch('DELETE');
		});
	});
});
