// Set default response content type to JSON
$.mockjaxSettings.contentType = 'text/json';

/**
 * Set a special callback method for unit tests but
 * also preserve the ajax call that will be mocked.
 */
_.extend(StackMob, {
  ajax: function(model, params, method, options){
    if (typeof options['done'] === "function")
      options['done'](model, params, method, options);

    return $.ajax(params);
  },
  initiateRefreshSessionCall: function() {}
});

// Helper methods for setting ajax mocks

function mockAjax(type, statusCode) {
  $.mockjax({
    url: '*api.stackmob.com/*',
    status: statusCode,
    type: type,
    responseTime: 10,
    responseText: {
      sample: 'data'
    }
  });
}

function mockGet(statusCode) {
  mockAjax("GET", statusCode);
}

function mockPost(statusCode) {
  mockAjax("POST", statusCode);
}

function mockPut(statusCode) {
  mockAjax("PUT", statusCode);
}

function mockDelete(statusCode) {
  mockAjax("DELETE", statusCode);
}

// Methods for Unit Tests to use to set ajax mocks

function mockCreateAsSuccess() {
  mockPost(201);
}

function mockCreateAsError() {
  mockPost(409);
}

function mockFetchAsSuccess() {
  mockGet(200);
}

function mockFetchAsError() {
  mockGet(404);
}

function mockUpdateAsSuccess() {
  mockPut(200);
}

function mockUpdateAsError() {
  mockPut(409);
}

function mockDeleteAsSuccess() {
  mockDelete(200);
}

function mockDeleteAsError() {
  mockDelete(500);
}

function clearAllAjaxMocks() {
  $.mockjaxClear();
}