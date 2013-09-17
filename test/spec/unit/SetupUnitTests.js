// Set default response content type to JSON
$.mockjaxSettings.contentType = 'text/json';


_.extend(StackMob, {
  _modifyParams: function(params) {
    params['dataType'] = 'json';
  }
});

// Helper methods for setting ajax mocks

function mockAjax(type, statusCode) {
  return $.mockjax({
    url: '*api.stackmob.com/*',
    status: statusCode,
    type: type,
    dataType: 'json',
    responseTime: 10,
    responseText: {
      sample: 'data'
    }
  });
}

function mockLogin(statusCode, expiryTime){
  return $.mockjax({
    url: '*api.stackmob.com/user/accessToken',
    status: statusCode,
    type: 'POST',
    dataType: 'json',
    responseTime: 10,
    responseText: {
      'access_token': '37RNm24Z7ek23LIJ868CIejRIcPQrf5g',
      'mac_key': 'zY6I35nJBXp8DqWkYvg5Sr2jikq5UX5l',
      'mac_algorithm': 'hmac-sha-1',
      'token_type': 'mac',
      'expires_in': expiryTime,
      'refresh_token': 'rihHghX22b6kn3sy3fHxxxhqAHHRhOWr',
      'stackmob': {
        'user': {
          'sm_owner': 'user/testuser',
          'username': 'testuser',
          'createddate': 1378941509727,
          'lastmoddate': 1378941509727
        }
      }
    }
  });
}

function mockRefreshToken(statusCode, expiryTime){
  return $.mockjax({
    url: '*api.stackmob.com/user/refreshToken',
    status: statusCode,
    type: 'POST',
    dataType: 'json',
    responseTime: 10,
    responseText: {
      'access_token': '6Q48lIpAJrkqY2Gqg8sR2PDPOdnWa0F5',
      'mac_key': '2DEgDOuPdIh1kxGi7i3NZ12Fp07kkEph',
      'mac_algorithm': 'hmac-sha-1',
      'token_type': 'mac',
      'expires_in': expiryTime,
      'refresh_token': 'KvQtnSMtJ75tjehkdCWVQxJqx7dOgJZS',
      'stackmob': {
        'user': {
          'sm_owner': 'user/testuser',
          'username': 'testuser',
          'createddate': 1378941509727,
          'lastmoddate': 1378941509727
        }
      }
    }
  });
}

function mockGet(statusCode) {
  return mockAjax('GET', statusCode);
}

function mockPost(statusCode) {
  return mockAjax('POST', statusCode);
}

function mockPut(statusCode) {
  return mockAjax('PUT', statusCode);
}

function mockDelete(statusCode) {
  return mockAjax('DELETE', statusCode);
}

// Methods for Unit Tests to use to set ajax mocks

function mockCreateAsSuccess() {
  return mockPost(201);
}

function mockCreateAsError() {
  return mockPost(409);
}

function mockFetchAsSuccess() {
  return mockGet(200);
}

function mockFetchAsError() {
  return mockGet(404);
}

function mockUpdateAsSuccess() {
  return mockPut(200);
}

function mockUpdateAsError() {
  return mockPut(409);
}

function mockDeleteAsSuccess() {
  return mockDelete(200);
}

function mockDeleteAsError() {
  return mockDelete(500);
}

function mockLoginAsSuccess() {
  return mockLogin(200, 3);
}

function mockLoginAsError() {
  return mockLogin(401, 3);
}

function clearAllAjaxMocks() {
  return $.mockjaxClear();
}