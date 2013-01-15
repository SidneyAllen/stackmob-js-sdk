## StackMob JavaScript SDK Change Log

### v0.7.0

**FEATURE**

* Asynchronous authentication check methods (`isLoggedIn`) that will renew OAuth2 Refresh Tokens if necessary

**FIX**

* Workaround for Android 2.2+ browsers return HTTP status 0 instead of 206 - affected pagination (`range`) calls
* Fix `apiURL` so that the API URL applies for Custom Code methods. It previously did not.
* Bug with OAuth signing of non-GET custom code calls
* Update Facebook calls from GET to POST
* Fixing OAuth signing for https URLs
* Updating Facebook methods to be POST instead of GET to better align with ACL settings

### v0.6.1 - Nov 29, 2012

**FIX**

* Bug with custom user schema

### v0.6.0 - Oct 5, 2012

**FEATURE**

* Retry API call if server responds with 503 response (Default 3 retry attempts)
* Keep user logged in (OAuth 2.0 Refresh Token)
* PUT, POST, DELETE Custom Code support
* GeoPoint validation on creation
* Added Jasmine Test Suites for jQuery, Zepto, and Sencha

**FIX**

* Fixed oauth login credentials when not using `user` schema. Thank you Alvaro Manera!
* Refactored jQuery, Zepto, Sencha AJAX handling
* Fixed IE support Crypto library
* Crypto library included in JS file directly
* Removed errant `logger` lines


### v0.5.5 - Jul 1, 2012

**FEATURE** 

* Added support for OAuth 2 Facebook Login
* Added remote ignore fields option for save() method

**FIX** 

* Accumulating 'select' fields when performing a series of queries

