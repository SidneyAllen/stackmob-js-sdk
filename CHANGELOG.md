## StackMob JavaScript SDK Change Log

### v0.6.0

**FEATURE**

* Retry API call if server responds with 503 response
* Keep user logged in (OAuth 2.0 Refresh Token)
* PUT, POST, DELETE Custom Code support

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

