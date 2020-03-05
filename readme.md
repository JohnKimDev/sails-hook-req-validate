[![Build Status](https://travis-ci.org/JohnKimDev/sails-hook-req-validate.svg?branch=master)](https://travis-ci.org/JohnKimDev/sails-hook-req-validate)
![dependencies](https://img.shields.io/david/johnkimdev/sails-hook-req-validate.svg)
![dev dependencies](https://img.shields.io/david/dev/johnkimdev/sails-hook-req-validate.svg)

![Downloads](https://img.shields.io/npm/dm/sails-hook-req-validate.svg)
![Downloads](https://img.shields.io/npm/dt/sails-hook-req-validate.svg)
![npm version](https://img.shields.io/npm/v/sails-hook-req-validate.svg)
![License](https://img.shields.io/npm/l/sails-hook-req-validate.svg)

---

## Ultimate Request Validator Hook for SailsJS
### **Over 160 Validator Types & 17 Converters + Flexible Usages & Custom Options and Configurations**
This `sails-hook-req-validate` package uses **req.allParams()** ([Sails Document](https://sailsjs.com/documentation/reference/request-req/req-all-params)). 

FYI, sails' req.allParams() returns the value of all parameters sent in the request which includes ***querystring*** and ***url path***. Which means passing parameters may be string type, use ***converter*** to convert the type to an expected value type. But please note that some validation types have build-in converters, check [validation type list](https://github.com/JohnKimDev/sails-hook-req-validate/blob/master/lib/validationTypes.js) for more information.

For example: `/api/user/:age/:ismale` or `/api/user?age=12&ismale=true`. req.allParams() returns all parameters as ***string***, however `sails-hook-req-validate` can correctly validate the type and convert to the correct output type in most cases. 

## Installation
```javascript
  npm install sails-hook-req-validate --save 
```
This is it! Once you `npm install` the hook will be automatically activated. However, if you want more control, see below for the `config/validate.js` setting.  

## Report Bug & Suggest Improvement
Please feel free to leave any comment and suggestion .
https://github.com/JohnKimDev/sails-hook-req-validate/issues/new

---
---
<br>

## Optional Global Setting (config/validate.js)
You can create a `config/validate.js` file in TWO different ways. 
Please note that the local, (req.validate() configuration) can overwrite the global configuration.

***OPTION 1***: Simple Object Notation (no response & request objects will be passed)
```javascript
/**
 * Sails-Hook-Req-Validate Global Configuration
 * 
 * For more information on the settings in this file, see:
 * https://github.com/JohnKimDev/sails-hook-req-validate/blob/master/readme.md
 **/

module.exports.validate = {
  /***************************************************************************
  * When validation error occurs, the program can send theres.badRequest 
  * response automatically. 
  * 
  * By Default, `sendResponse` is enabled.
  ***************************************************************************/
  // sendResponse: true,

  /***************************************************************************
  * After the validation check, the program returns data as object or you 
  * can use a callback. But it can return the data as a PROMISE if you set
  * `usePromise` as true.
  * 
  * By Default, `usePromise` is disabled.
  ***************************************************************************/
  // usePromise: false,

  /***************************************************************************
  * When there are more incoming request parameters than listed in the
  * `req.validate` option, by default, it will return all incoming parameters
  * If you disable `returnAllParams` option, it will filter parameters and only
  * return the parameters that are listed in the `req.validate` validate option
  * 
  * By Default, `returnAllParams` is enabled.
  ***************************************************************************/
  // returnAllParams: true,

  /***************************************************************************
  * Error output format 
  * errMessage : ((string)) short explanation of a reason for the invalidation
  * invalidKeys : ((array))[string] list of invalid parameter key(s)
  * 
  * Output can be any format you want. The return value from `onErrorOutput` 
  * will be passed to the final error return.
  ***************************************************************************/
  // onErrorOutput: function (errMessage, invalidKeys) {
  //   return { message: errMessage, invalid: invalidKeys };
  // },

  /***************************************************************************
  * Required error message output
  * keys : ((string)) or ((array))[string] one or more list of invalid 
  *        parameter key(s)
  * 
  * [output] ((string)) 
  ***************************************************************************/
  // requiredErrorMessage: function(keys) {
  //   keys = keys || [];
  //   let isare = (keys.length > 1) ? 'are' : 'is';
  //   let s = (keys.length > 1) ? 's' : ''
  //   return `The "${keys.join('", "')}" parameter${s} ${isare} required.`;
  // },

  /***************************************************************************
  * req.validate validation format error message output
  * key : ((string)) invalid parameter key
  * 
  * [output] ((string)) 
  ***************************************************************************/
  // formatErrorMessage: function(key) {
  //   return `The "${key}" parameter has an invalid format.`;
  // },

  /***************************************************************************
  * Validation configuration format error message output
  * key : ((string)) invalid parameter key
  * typeMessage: ((string)) types[key].message from `validationTypes.js`
  * https://github.com/JohnKimDev/sails-hook-req-validate/blob/master/lib/validationTypes.js
  * 
  * [output] ((string)) 
  ***************************************************************************/
  // typeErrorMessage: function(key, typeMessage) {
  //   let a = (typeMessage && typeMessage.length) ? /[aeiouAEIOU]/.test(typeMessage.charAt(0)) ? 'an' : 'a' : '';
  //   return `The "${key}" parameter should be ${a} ${typeMessage}.`;
  // },

  /***************************************************************************
  * Incoming request parameter invalid error message output
  * key : ((string)) invalid parameter key
  * typeMessage: ((string)) types[key].message from `validationTypes.js`
  * https://github.com/JohnKimDev/sails-hook-req-validate/blob/master/lib/validationTypes.js
  * 
  * [output] ((string)) 
  ***************************************************************************/
  // inputErrorMessage: function(key, typeMessage) {
  //   let a = (typeMessage && typeMessage.length) ? /[aeiouAEIOU]/.test(typeMessage.charAt(0)) ? 'an' : 'a' : '';
  //   return `The "${key}" parameter has an invalid input type` + (typeMessage ? `, it should be ${a} ${typeMessage}` : '') + '.';
  // },

  /***************************************************************************
  * Incoming request parameter invalid error message output of OR validation
  * example: 'string|number`
  * orKey : ((string)) invalid parameter key
  * orTypeMessages: ((string)) combined types[key].message from `validationTypes.js`
  * https://github.com/JohnKimDev/sails-hook-req-validate/blob/master/lib/validationTypes.js
  * 
  * [output] ((string)) 
  ***************************************************************************/
  // orInputErrorMessage: function(orKey, orTypeMessages) {
  //   return `Invalid input type, it should be one of the following types; ${orTypeMessages}.`;
  // }
};
```

***OPTION 2***: Function return (response & request objects will be passed)
```javascript
/**
 * Sails-Hook-Req-Validate Global Configuration
 * 
 * For more information on the settings in this file, see:
 * https://github.com/JohnKimDev/sails-hook-req-validate/blob/master/readme.md
 * 
 * The response and request objects will be passed to the configuration function when initializes
 **/

module.exports.validate = function(req, res) {
  return {
    /***************************************************************************
    * When `sendResponse` is enabled. The program will use this `responseMethod`
    * to send the error data out. By default, it will use res.badRequest. 
    * The `res` object is from the passing parameter with is a response object
    * from the controller.
    * 
    * You can overwrite the `responseMethod` with another response function or 
    * create your own response handler.
    * example: 
    *    responseMethod: (data) => {
    *       sails.log.error(data);
    *       res.set(400).send(data);
    *    }
    ***************************************************************************/
    // responseMethod: res.badRequest

    /**
     * You can use all other configurations from the OPTION 1 example
     **/
  };
};
```

---
<br>

## USAGE - Validator
**sails-hook-req-validate** is very flexible and can be used in many different formats and configurations. 

---
*New in 2.8.x*

Function Validation

```javascript
const params = req.validate({
  'evenNum': (val) => { return (val % 2 === 0); }   // you can also use a function instead of an arrow function
}); 

// PRO TIP: (val) => { return (val % 2 === 0); } can be shorten to (val) => (val % 2 === 0) 
```

---

Single parameter
```javascript
const params = req.validate('id'); 
```
Multiple parameters
```javascript
const params = req.validate(['id', 'firstname', 'lastname']); 
```
Simple validator
```javascript
const params = req.validate({
  'id': 'base64|number|boolean' // OR operation
  'name': ['string', 'email'],  // AND operation
  'email?': 'email',            // OPTIONAL parameter
  'zipcode': 'postalcode'
}); 
```
Combined validators
```javascript
const params = req.validate({
  'name': ['string', { default: 'John Doe' }],  // default value if missing 
  'email?': ['email', { converter: 'normalizeEmail' }],   // optional parameter & with converter 
  'type': { enum: ['user', 'admin', 'manager'], default: 'user' } 
}); 
```
Combined validators as array
```javascript
const params = req.validate([
  { 'name': ['string', { default: 'John Doe' }] },  // default value if missing 
  { 'email?': ['email', { converter: 'normalizeEmail' }] },   // optional parameter & with converter 
  { 'type': { enum: ['user', 'admin', 'manager'], default: 'user' } }
]); 
```
Multiple converters
```javascript
const params = req.validate({
  'email': ['any', { converter: ['string', 'normalizeEmail'] }]
}); 
// not a good example but I hope you get the idea
```

Custom converter (set **FUNCTION** to `converter`)
```javascript
const params = req.validate({
  'phone':  { converter: (val) => { 
    var match = val.replace(/\D/g, '').match(/^(\d{3})(\d{3})(\d{4})$/);
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]; // (123) 456-7890
  }}
}); 
``` 
<br>

# Validator & Converter Options

Option                                  | Description
--------------------------------------- | --------------------------------------
**enum**                                | ((array)) any combination of expected values
**default**                             | ((string\|number\|boolean)) default value if the parameter is missing
**converter**                           | ((array\|function)) converter name as string or array of string can be used. You can pass `function` for custom converter.<br>You can also mixed types + functions in an array. 
**validator**                          | ((function)) if you need a custom validator, use this option<br><br>@param `param` ((any)): passing parameter<br>@return ((boolean)): return `true` if valid, `false` otherwise.
<br>
---

# More Usage Examples With Options
You can use with any of validator combination above.<br>
`req.validate(<TYPE_VALIDATOR>, <CALLBACK>)`<br>or<br>`req.validate(<TYPE_VALIDATOR>, <OPTION>, <CALLBACK>)`

## USAGE (synchronous) - DIRECT 
Only for `direct` method, ***`onErrorOutput`*** will be ignored! When an error occurs, ***false*** will be returned. 
```javascript
const params = req.validate('id');
if (params === false) { 
  sails.log.error('The validation failed');
} else {
  sails.log.info('ID:', params.id);
}
```

## USAGE (asynchronous) - CALLBACK (error, params)

```javascript
req.validate('id', (err, params) => {
  // callback
  if (err) {                    // err object is the output of `onErrorOutput`
    sails.log.error('The validation failed.', err.message); 
  } else {
    sails.log.info(params.id);   // callback data
  }
});
```

---

## USAGE (asynchronous) - PROMISE
You can use the local configuration to enable promise return or use the global configuration.

ES5 Promise
```javascript
req.validate('id', {
  usePromise: true  
})
.then(params => {
  // callback
  sails.log.info(params.id); // forwarded parameters if the validation passes
})
.catch(err => {
  sails.log.error(err);     // err object is the output of `onErrorOutput`
});
```
ES6 Async/Await Promise
```javascript
try {
  const params = await req.validate('id', {
    usePromise: true        // or use the global setting
  });
  sails.log.info(params.id);
catch (err) {
  sails.log.error(err);     // err object is the output of `onErrorOutput`
}  
```
---

## My Personal Favorite Usage Method
I like to wrap the controller codes with try-catch in case of unexpected error and use promise for `sails-hook-req-validate` 
```javascript
// config/validate.js
module.exports.validate = {
  sendResponse: false,
  usePromise: true,
  returnAllParams: false,
  onErrorOutput: (errMessage, invalidKeys) => errMessage
};

// in someController.js
module.exports = {
  index: async (req, res) => {
    try {
      const params = await req.validate({
        'id': 'string',
        'name': 'string'
      });
      console.log(params.id, params.name);
      return res.ok();
    } catch (err) {
      return res.serverError(err);
    }
  }
};
```

---
<br>

## Setting Options / Configurations

Option                                  | Description
--------------------------------------- | --------------------------------------
**responseMethod**                      | ((function)) method/function to call when a validation error occurs<br><br>***default***: `res.badRequest`<br><br>@param errorOutput : output from `onErrorOutput` option
**sendResponse**                        | ((boolean)) toggle the `responseMethod` call when a validation error occurs<br><br>***default***: `true`
**usePromise**                          | ((boolean)) enable PROMISE response instead of callback<br><br>***default***: `false`
**returnAllParams**                     | ((boolean)) if ther are more passing params than listed in the req.validate, you can choose to pass-though all or filter to only listed params.<br><br>***default***: `true`
**onErrorOutput**                      | ((function)) when a validation error occurs, it will be called to generate the error output<br><br>***default***: see above config/validation.js example<br><br>@param `errMessage` ((string)): combined error message(s)<br>@param `invalidKeys` ((string[])): list of invalid param keys<br>@return : any form you want
**requiredErrorMessage**              | ((function)) output message for param required error message<br><br>***default***: see above config/validation.js example<br><br>@param `keys` ((string \| string[])): list of invalid param key(s).<br>@return ((string)): formated error messgae as string type
**formatErrorMessage**              | ((function)) output message for a validator format error message for param key<br><br>***default***: see above config/validation.js example<br><br>@param `key` ((string)): invalid param key.<br>@param `typeMessage` ((string)): type error message, see `message` for each type of the [validationType](https://github.com/JohnKimDev/sails-hook-req-validate/blob/master/lib/validationTypes.js) file<br>@return ((string)): formated error messgae as string type
**typeErrorMessage**              | ((function)) output message for a parm type error message<br><br>***default***: see above config/validation.js example<br><br>@param `key` ((string)): invalid param key.<br>@param `typeMessage` ((string)): type error message, see `message` for each type of the [validationType](https://github.com/JohnKimDev/sails-hook-req-validate/blob/master/lib/validationTypes.js) file<br>@return ((string)): formated error messgae as string type
**inputErrorMessage**              | ((function)) output message for a parm input error message<br><br>***default***: see above config/validation.js example<br><br>@param `key` ((string)): invalid param key.<br>@param `typeMessage` ((string)): type error message, see `message` for each type of the [validationType](https://github.com/JohnKimDev/sails-hook-req-validate/blob/master/lib/validationTypes.js) file<br>@return ((string)): formated error messgae as string type
**orInputErrorMessage**              | ((function)) output message for a parm input error message with OR opertation. The error message for each OR validation wil be combined<br><br>***default***: see above config/validation.js example<br><br>@param `orKey` ((string)): invalid OR param key. (ex: 'string\|email')<br>@param `orTypeMessage` ((string)): combined type error messages, see `message` for each type of the [validationType](https://github.com/JohnKimDev/sails-hook-req-validate/blob/master/lib/validationTypes.js) file<br>@return ((string)): formated error messgae as string type

---
<br>

## Validators

List of preset available validators.

NOTE: all validators are **case insensitive**

Validator                               | Description
--------------------------------------- | --------------------------------------
**alpha**                               | check if the string contains only letters (a-zA-Z).
**alphanumeric**                        | check if the string contains only letters and numbers.
**ascii**                               | check if the string contains ASCII chars only.
**array**                               | check if the value is array format. The validator uses lodash [_.isArray](https://lodash.com/docs/4.17.11#isArray) to validate the type.
**any**                                 | return true for any type except undefined.
**base64**                              | check if a string is base64 encoded.
**bolean**                              | check if a string is a boolean.
**byteLength**                          | check if the string's length (in UTF-8 bytes) falls in a range.
**creditcard**                          | check if the string is a credit card.
**currency**                            | check if the string is a valid currency amount. Currency symbol is optional.
**currencyWithSymbol**                  | check if the string is a valid currency amount. Currency symbol is required.
**dataURI**                             | check if the string is a [data uri format](https://developer.mozilla.org/en-US/docs/Web/HTTP/data_URIs).
**magnetURI**                           | check if the string is a [magnet uri format](https://en.wikipedia.org/wiki/Magnet_URI_scheme).
**email**                               | check if the string is an valid email address.
**FQDN**                                | check if the string is a fully qualified domain name (e.g. domain.com)
**float**                               | check if the string is a float.
**hash**                                | check if the string is a hash of type algorithm.<br/><br/>Algorithm is one of `['md4', 'md5', 'sha1', 'sha256', 'sha384', 'sha512', 'ripemd128', 'ripemd160', 'tiger128', 'tiger160', 'tiger192', 'crc32', 'crc32b']`
**hexColor**                            | check if the string is a hexadecimal color.
**hexadecimal**                         | check if the string is a hexadecimal number.
**ip**                                  | check if the string is an IP (either version 4 or 6).
**ipv4**                                | check if the string is an IP version 4 only).
**ipv6**                                | check if the string is an IP version 6 only.
**ISBN**                                | check if the string is an ISBN (either version 10 or 13).
**ISBN10**                              | check if the string is an ISBN version 10 only.
**ISBN13**                              | check if the string is an ISBN version 13 only.
**ISSN**                                | check if the string is an [ISSN](https://en.wikipedia.org/wiki/International_Standard_Serial_Number).
**ISIN**                                | check if the string is an [ISIN][ISIN] (stock/security identifier).
**ISO8601**                             | check if the string is a valid [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date
**RFC3339**                             | check if the string is a valid [RFC 3339](https://tools.ietf.org/html/rfc3339) date.
**ISO31661Alpha2**                     | check if the string is a valid [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) officially assigned country code.
**ISO31661Alpha3**                     | check if the string is a valid [ISO 3166-1 alpha-3](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) officially assigned country code.
**ISRC**                                | check if the string is a [ISRC](https://en.wikipedia.org/wiki/International_Standard_Recording_Code).
**int**                                 | check if the string is an integer.<br><br>***Built-In Converter: int***
**JSON**                                | check if the string is valid JSON(note: uses JSON.parse).
**JWT**                                 | check if the string is valid JWT token.
**LatLong**                             | check if the string is a valid latitude-longitude coordinate in the format `lat,long` or `lat, long`.
**lowercase**                           | check if the string is lowercase.
**MACAddress**                          | check if the string is a MAC address.
**MD5**                                 | check if the string is a MD5 hash.
**MimeType**                            | check if the string matches to a valid [MIME type](https://en.wikipedia.org/wiki/Media_type) format
**mobilePhone**                         | check if the string is a mobile phone number (all locales).
**mobilephone-ar-AE**                   | check if the string is a mobile phone number of ar-AE locale
**mobilephone-ar-DZ**                   | check if the string is a mobile phone number of ar-DZ locale
**mobilephone-ar-EG**                   | check if the string is a mobile phone number of ar-EG locale
**mobilephone-ar-IQ**                   | check if the string is a mobile phone number of ar-IQ locale
**mobilephone-ar-JO**                   | check if the string is a mobile phone number of ar-JO locale
**mobilephone-ar-KW**                   | check if the string is a mobile phone number of ar-KW locale
**mobilephone-ar-SA**                   | check if the string is a mobile phone number of ar-SA locale
**mobilephone-ar-SY**                   | check if the string is a mobile phone number of ar-SY locale
**mobilephone-ar-TN**                   | check if the string is a mobile phone number of ar-TN locale
**mobilephone-be-BY**                   | check if the string is a mobile phone number of be-BY locale
**mobilephone-bg-BG**                   | check if the string is a mobile phone number of bg-BG locale
**mobilephone-bn-BD**                   | check if the string is a mobile phone number of bn-BD locale
**mobilephone-cs-CZ**                   | check if the string is a mobile phone number of cs-CZ locale
**mobilephone-de-DE**                   | check if the string is a mobile phone number of de-DE locale
**mobilephone-da-DK**                   | check if the string is a mobile phone number of da-DK locale
**mobilephone-el-GR**                   | check if the string is a mobile phone number of el-GR locale
**mobilephone-en-AU**                   | check if the string is a mobile phone number of en-AU locale
**mobilephone-en-CA**                   | check if the string is a mobile phone number of en-CA locale
**mobilephone-en-GB**                   | check if the string is a mobile phone number of en-GB locale
**mobilephone-en-GH**                   | check if the string is a mobile phone number of en-GH locale
**mobilephone-en-HK**                   | check if the string is a mobile phone number of en-HK locale
**mobilephone-en-IE**                   | check if the string is a mobile phone number of en-IE locale
**mobilephone-en-IN**                   | check if the string is a mobile phone number of en-IN locale
**mobilephone-en-KE**                   | check if the string is a mobile phone number of en-KE locale
**mobilephone-en-MU**                   | check if the string is a mobile phone number of en-MU locale
**mobilephone-en-NG**                   | check if the string is a mobile phone number of en-NG locale
**mobilephone-en-NZ**                   | check if the string is a mobile phone number of en-NZ locale
**mobilephone-en-RW**                   | check if the string is a mobile phone number of en-RW locale
**mobilephone-en-SG**                   | check if the string is a mobile phone number of en-SG locale
**mobilephone-en-UG**                   | check if the string is a mobile phone number of en-UG locale
**mobilephone-en-US**                   | check if the string is a mobile phone number of en-US locale
**mobilephone-en-TZ**                   | check if the string is a mobile phone number of en-TZ locale
**mobilephone-en-ZA**                   | check if the string is a mobile phone number of en-ZA locale
**mobilephone-en-ZM**                   | check if the string is a mobile phone number of en-ZM locale
**mobilephone-en-PK**                   | check if the string is a mobile phone number of en-PK locale
**mobilephone-es-ES**                   | check if the string is a mobile phone number of es-ES locale
**mobilephone-es-MX**                   | check if the string is a mobile phone number of es-MX locale
**mobilephone-es-UY**                   | check if the string is a mobile phone number of es-UY locale
**mobilephone-et-EE**                   | check if the string is a mobile phone number of et-EE locale
**mobilephone-fa-IR**                   | check if the string is a mobile phone number of fa-IR locale
**mobilephone-fi-FI**                   | check if the string is a mobile phone number of fi-FI locale
**mobilephone-fr-FR**                   | check if the string is a mobile phone number of fr-FR locale
**mobilephone-he-IL**                   | check if the string is a mobile phone number of he-IL locale
**mobilephone-hu-HU**                   | check if the string is a mobile phone number of hu-HU locale
**mobilephone-it-IT**                   | check if the string is a mobile phone number of it-IT locale
**mobilephone-ja-JP**                   | check if the string is a mobile phone number of ja-JP locale
**mobilephone-kk-KZ**                   | check if the string is a mobile phone number of kk-KZ locale
**mobilephone-ko-KR**                   | check if the string is a mobile phone number of ko-KR locale
**mobilephone-lt-LT**                   | check if the string is a mobile phone number of lt-LT locale
**mobilephone-ms-MY**                   | check if the string is a mobile phone number of ms-MY locale
**mobilephone-nb-NO**                   | check if the string is a mobile phone number of nb-NO locale
**mobilephone-nn-NO**                   | check if the string is a mobile phone number of nn-NO locale
**mobilephone-pl-PL**                   | check if the string is a mobile phone number of pl-PL locale
**mobilephone-pt-PT**                   | check if the string is a mobile phone number of pt-PT locale
**mobilephone-pt-BR**                   | check if the string is a mobile phone number of pt-BR locale
**mobilephone-ro-RO**                   | check if the string is a mobile phone number of ro-RO locale
**mobilephone-ru-RU**                   | check if the string is a mobile phone number of ru-RU locale
**mobilephone-sl-SI**                   | check if the string is a mobile phone number of sl-SI locale
**mobilephone-sk-SK**                   | check if the string is a mobile phone number of sk-SK locale
**mobilephone-sr-RS**                   | check if the string is a mobile phone number of sr-RS locale
**mobilephone-sv-SE**                   | check if the string is a mobile phone number of sv-SE locale
**mobilephone-th-TH**                   | check if the string is a mobile phone number of th-TH locale
**mobilephone-tr-TR**                   | check if the string is a mobile phone number of tr-TR locale
**mobilephone-uk-UA**                   | check if the string is a mobile phone number of uk-UA locale
**mobilephone-vi-VN**                   | check if the string is a mobile phone number of vi-VN locale
**mobilephone-zh-CN**                   | check if the string is a mobile phone number of zh-CN locale
**mobilephone-zh-HK**                   | check if the string is a mobile phone number of zh-HK locale
**mobilephone-zh-TW**                   | check if the string is a mobile phone number of zh-TW locale
**mongoId**                             | check if the string is a valid hex-encoded representation of a [MongoDB ObjectId][mongoid].
**multibyte**                           | check if the string contains one or more multibyte chars.
**numeric**                             | check if the string contains only numbers. Some symbols are allow (e.g. `+`, `-`, or `.`).
**numericOnly**                         | check if the string contains only numbers [0-9]. No symbol allow.
**number**                              | same as `numeric`
**object**                              | check if value is a plain object. The validator uses lodash [_.isPlainObject](https://lodash.com/docs/4.17.11#isPlainObject) to validate the type.
**port**                                | check if the string is a valid port number.
**postalCode**                          | check if the string is a postal code (all locales).
**postalCode-AD**                       | check if the string is a postal code of AD
**postalCode-AT**                       | check if the string is a postal code of AT
**postalCode-AU**                       | check if the string is a postal code of AU
**postalCode-BE**                       | check if the string is a postal code of BE
**postalCode-BG**                       | check if the string is a postal code of BG
**postalCode-CA**                       | check if the string is a postal code of CA
**postalCode-CH**                       | check if the string is a postal code of CH
**postalCode-CZ**                       | check if the string is a postal code of CZ
**postalCode-DE**                       | check if the string is a postal code of DE
**postalCode-DK**                       | check if the string is a postal code of DK
**postalCode-DZ**                       | check if the string is a postal code of DZ
**postalCode-ES**                       | check if the string is a postal code of ES
**postalCode-FI**                       | check if the string is a postal code of FI
**postalCode-FR**                       | check if the string is a postal code of FR
**postalCode-GB**                       | check if the string is a postal code of GB
**postalCode-GR**                       | check if the string is a postal code of GR
**postalCode-IL**                       | check if the string is a postal code of IL
**postalCode-IS**                       | check if the string is a postal code of IS
**postalCode-IT**                       | check if the string is a postal code of IT
**postalCode-JP**                       | check if the string is a postal code of JP
**postalCode-KE**                       | check if the string is a postal code of KE
**postalCode-LI**                       | check if the string is a postal code of LI
**postalCode-MX**                       | check if the string is a postal code of MX
**postalCode-NL**                       | check if the string is a postal code of NL
**postalCode-NO**                       | check if the string is a postal code of NO
**postalCode-PL**                       | check if the string is a postal code of PL
**postalCode-PT**                       | check if the string is a postal code of PT
**postalCode-RO**                       | check if the string is a postal code of RO
**postalCode-RU**                       | check if the string is a postal code of RU
**postalCode-SA**                       | check if the string is a postal code of SA
**postalCode-SE**                       | check if the string is a postal code of SE
**postalCode-TW**                       | check if the string is a postal code of TW
**postalCode-US**                       | check if the string is a postal code of US
**postalCode-ZA**                       | check if the string is a postal code of ZA
**postalCode-ZM**                       | check if the string is a postal code of ZM
**surrogatePair**                       | check if the string contains any surrogate pairs chars.
**string**                              | check if value is string. **BE CAUTIOUS** of using this type! May return invalid result. For the parameter values from a querystring and a URL path are always `STRING` type, using this validator type may have an unexpected result.
**URL**                                 | check if the string is an URL. allow protocols 'http', 'https', 'ftp'.
**UUID**                                | check if the string is a UUID (version 3, 4 or 5).
**UUIDv3**                              | check if the string is a UUID version 3
**UUIDv4**                              | check if the string is a UUID version 4
**UUIDv5**                              | check if the string is a UUID version 5
**uppercase**                           | check if the string is uppercase.
<br>

---
<br>

## Converters

List of converters available.

NOTE: all converters are **case insenstive**

Converter                              | Description
-------------------------------------- | -------------------------------
**boolean**                            | convert the input string to a boolean. Everything except for `'0'`, `'false'` and `''` returns `true`. In strict mode only `'1'` and `'true'` return `true`.
**date**                               | convert the input string to a date, or `null` if the input is not a date.
**escape**                             | replace `<`, `>`, `&`, `'`, `"` and `/` with HTML entities.
**unescape**                           | replaces HTML encoded entities with `<`, `>`, `&`, `'`, `"` and `/`.
**JSON**                               | convert to JSON using JSON.parse
**JSON5**                              | convert to JSON using JSON5.parse
**ltrim**                              | trim characters from the left-side of the input.
**rtrim**                              | trim characters from the right-side of the input.
**removeHTML**                         | strip HTML codes from the string
**removeSpace**                        | remove all white space from the string
**removeLineBreak**                    | remove all line breaks from the string, \r\n\t, \n, \t\t
**normalizeEmail**                     | canonicalizes an email address. (This doesn't validate that the input is an email, if you want to validate the email use `email` validator beforehand).
**lowercase**                          | convert to lower case
**string**                             | convert to string
**int**                                | convert the input string to an integer, or `NaN` if the input is not an integer.
**float**                              | convert the input string to a float, or `NaN` if the input is not a float.
**trim**                               | trim characters (whitespace by default) from both sides of the input.
**uppercase**                          | convert to upper case
