const V = require('validator');
const JSON5 = require('json5');

module.exports = {
  types: {
    // check if the string contains only letters (a-zA-Z).
    'alpha': {    
      method: 'isAlpha',
      message: 'string with only letters (a-zA-Z)'
    },
    // check if the string contains only letters and numbers.
    'alphanumeric': {
      method: 'isAlphanumeric',
      message: 'string contains only letters and numbers'
    },
    // check if the string contains ASCII chars only.
    'ascii': {
      method: 'isAscii',
      message: 'string contains ASCII chars only'
    },
    // check if it is array
    'array': {
      method: (val) => { try { let t = _.isString(val) ? JSON5.parse(val) : t; return _.isArray(t); } catch(e) { return false; } },
      converter: (val) => _.isString(val) ? JSON5.parse(val) : val,
      message: 'array'
    },
    // any type except undefined
    'any': {
      method: (val) => !_.isUndefined(val),
      message: 'any type'
    },
    // check if a string is base64 encoded.
    'base64': {
      method: 'isBase64',
      message: 'string with base64 encoded'
    },
    // check if a string is a boolean.
    'boolean': {
      method: 'isBoolean',
      converter: V.toBoolean,
      message: 'boolean'
    },
    // check if the string's length (in UTF-8 bytes) falls in a range.
    'bytelength': {
      method: 'isByteLength',
      message: 'string with a length (in UTF-8 bytes) falls in a range'
    },
    // check if the string is a credit card.
    'creditcard': {
      method: 'isCreditCard',
      message: 'credit card number'
    },
    // check if the string is a credit card.
    'currecy': {
      method: 'isCurrency',
      message: 'currency format'
    },
    // check if the string is a credit card.
    'currencywithsymbol': {
      method: (val) => V.isCurrency(val, { require_symbol: true }),
      message: 'currency format with currency symbol'
    },
    // check if the string is a (https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)
    'datauri': {
      method: 'isDataURI',
      message: 'string of (https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)'
    },
    // check if the string is a (https://en.wikipedia.org/wiki/Magnet_URI_scheme)
    'magneturi': {
      method: 'isMagnetURI',
      message: 'string of (https://en.wikipedia.org/wiki/Magnet_URI_scheme)'
    },
    // check if the string is an email.
    'email': {
      method: 'isEmail',
      message: 'valid email'
    },
    // check if the string is a fully qualified domain name (e.g. domain.com).
    'fqdn': {
      method: 'isFQDN',
      message: 'fully qualified domain name (e.g. domain.com)'
    },
    'url': {
      method: 'isURL',
      message: 'valid URL string'
    },
    'float': {
      method: 'isFloat',
      converter: V.toFloat,
      message: 'float number'
    },
    'hash': {
      method: 'isHash',
      message: 'hash string'
    },
    // check if the string is a hexadecimal number.
    'hex': {
      method: 'isHexadecimal',
      message: 'hexadecimal number'
    },
    // check if the string is a hexadecimal color.
    'hexcolor': {
      method: 'isHexColor',
      message: 'hexadecimal color'
    },
    // check if the string is an IP (both version 4 or 6).
    'ip': {
      method: 'isIP',
      message: 'IP (version 4 or 6)'
    },
    'ipv4': {
      method: (val) => V.isIP(val, 4),
      message: 'IPV4 string'
    },
    'ipv6': {
      method: (val) => V.isIP(val, 6),
      message: 'IPV6 string'
    },
    // check if the string is an ISBN (version 10 or 13).
    'isbn': {
      method: 'isISBN',
      message: 'ISBN (version 10 or 13) string'
    },
    'isbn10': {
      method: (val) => V.isISBN(val, 10),
      message: 'ISBN (version 10) string'
    },
    'isbn13': {
      method: (val) => V.isISBN(val, 13),
      message: 'ISBN (version 13) string'
    },
    // check if the string is an ISSN. (https://en.wikipedia.org/wiki/International_Standard_Serial_Number)
    'issn': {
      method: 'isISSN',
      message: 'ISSN string (https://en.wikipedia.org/wiki/International_Standard_Serial_Number)'
    },
    // check if the string is an ISIN (stock/security identifier). (https://en.wikipedia.org/wiki/International_Securities_Identification_Number)
    'isin': {
      method: 'isISIN',
      message: 'ISIN (stock/security identifier) string'
    },
    'iso8601': {
      method: 'isISO8601',
      message: 'valid ISO8601 date string'
    },
    'rfc3339': {
      method: 'isRFC3339',
      message: 'valid RFC3339 date string'
    },
    'iso3166alpha2': {
      method: 'isISO31661Alpha2',
      message: 'valid ISO31661 Alpha2 date string'
    },
    'iso3166alpha3': {
      method: 'isISO31661Alpha3',
      message: 'valid ISO31661 Alpha3 date string'
    },
    // check if the string is a ISRC. (https://en.wikipedia.org/wiki/International_Standard_Recording_Code)
    'isrc': {
      method: 'isISRC',
      message: 'ISRC string (https://en.wikipedia.org/wiki/International_Standard_Recording_Code)'
    },
    'int': {
      method: 'isInt',
      converter: V.toInt,
      message: 'integer'
    },
    'json': {
      method: 'isJSON',
      converter: (val) => _.isString(val) ? JSON5.parse(val) : val,
      message: 'JSON (JavaScript Object Notation) format'
    },
    'jwt': {
      method: 'isJWT',
      message: 'JWT (JSON web Token) format'
    },
    'latlong': {
      method: 'isLatLong',
      message: 'latitude and longitude coordinates format'
    },
    'lowercase': {
      method: 'isLowercase',
      message: 'string in lower case'
    },
    'macaddress': {
      method: 'isMACAddress',
      message: 'MAC address'
    },
    'md5': {   
      method: 'isMD5',
      message: 'MD5 string'
    },
    // check if the string matches to a valid MIME type format (https://en.wikipedia.org/wiki/Media_type)
    'mimetype': {
      method: 'isMimeType',
      message: 'MIME type format'
    },
    'mobilephone': { method: 'isMobilePhone', message: 'mobile phone number'},
    'mobilephone-ar-AE': { method: (val) => V.isMobilePhone(val, 'ar-AE'), message: 'mobile phone number of ar-AE locale'},
    'mobilephone-ar-DZ': { method: (val) => V.isMobilePhone(val, 'ar-DZ'), message: 'mobile phone number of ar-DZ locale'},
    'mobilephone-ar-EG': { method: (val) => V.isMobilePhone(val, 'ar-EG'), message: 'mobile phone number of ar-EG locale'},
    'mobilephone-ar-IQ': { method: (val) => V.isMobilePhone(val, 'ar-IQ'), message: 'mobile phone number of ar-IQ locale'},
    'mobilephone-ar-JO': { method: (val) => V.isMobilePhone(val, 'ar-JO'), message: 'mobile phone number of ar-JO locale'},
    'mobilephone-ar-KW': { method: (val) => V.isMobilePhone(val, 'ar-KW'), message: 'mobile phone number of ar-KW locale'},
    'mobilephone-ar-SA': { method: (val) => V.isMobilePhone(val, 'ar-SA'), message: 'mobile phone number of ar-SA locale'},
    'mobilephone-ar-SY': { method: (val) => V.isMobilePhone(val, 'ar-SY'), message: 'mobile phone number of ar-SY locale'},
    'mobilephone-ar-TN': { method: (val) => V.isMobilePhone(val, 'ar-TN'), message: 'mobile phone number of ar-TN locale'},
    'mobilephone-be-BY': { method: (val) => V.isMobilePhone(val, 'be-BY'), message: 'mobile phone number of be-BY locale'},
    'mobilephone-bg-BG': { method: (val) => V.isMobilePhone(val, 'bg-BG'), message: 'mobile phone number of bg-BG locale'},
    'mobilephone-bn-BD': { method: (val) => V.isMobilePhone(val, 'bn-BD'), message: 'mobile phone number of bn-BD locale'},
    'mobilephone-cs-CZ': { method: (val) => V.isMobilePhone(val, 'cs-CZ'), message: 'mobile phone number of cs-CZ locale'},
    'mobilephone-de-DE': { method: (val) => V.isMobilePhone(val, 'de-DE'), message: 'mobile phone number of de-DE locale'},
    'mobilephone-da-DK': { method: (val) => V.isMobilePhone(val, 'da-DK'), message: 'mobile phone number of da-DK locale'},
    'mobilephone-el-GR': { method: (val) => V.isMobilePhone(val, 'el-GR'), message: 'mobile phone number of el-GR locale'},
    'mobilephone-en-AU': { method: (val) => V.isMobilePhone(val, 'en-AU'), message: 'mobile phone number of en-AU locale'},
    'mobilephone-en-CA': { method: (val) => V.isMobilePhone(val, 'en-CA'), message: 'mobile phone number of en-CA locale'},
    'mobilephone-en-GB': { method: (val) => V.isMobilePhone(val, 'en-GB'), message: 'mobile phone number of en-GB locale'},
    'mobilephone-en-GH': { method: (val) => V.isMobilePhone(val, 'en-GH'), message: 'mobile phone number of en-GH locale'},
    'mobilephone-en-HK': { method: (val) => V.isMobilePhone(val, 'en-HK'), message: 'mobile phone number of en-HK locale'},
    'mobilephone-en-IE': { method: (val) => V.isMobilePhone(val, 'en-IE'), message: 'mobile phone number of en-IE locale'},
    'mobilephone-en-IN': { method: (val) => V.isMobilePhone(val, 'en-IN'), message: 'mobile phone number of en-IN locale'},
    'mobilephone-en-KE': { method: (val) => V.isMobilePhone(val, 'en-KE'), message: 'mobile phone number of en-KE locale'},
    'mobilephone-en-MU': { method: (val) => V.isMobilePhone(val, 'en-MU'), message: 'mobile phone number of en-MU locale'},
    'mobilephone-en-NG': { method: (val) => V.isMobilePhone(val, 'en-NG'), message: 'mobile phone number of en-NG locale'},
    'mobilephone-en-NZ': { method: (val) => V.isMobilePhone(val, 'en-NZ'), message: 'mobile phone number of en-NZ locale'},
    'mobilephone-en-RW': { method: (val) => V.isMobilePhone(val, 'en-RW'), message: 'mobile phone number of en-RW locale'},
    'mobilephone-en-SG': { method: (val) => V.isMobilePhone(val, 'en-SG'), message: 'mobile phone number of en-SG locale'},
    'mobilephone-en-UG': { method: (val) => V.isMobilePhone(val, 'en-UG'), message: 'mobile phone number of en-UG locale'},
    'mobilephone-en-US': { method: (val) => V.isMobilePhone(val, 'en-US'), message: 'mobile phone number of en-US locale'},
    'mobilephone-en-TZ': { method: (val) => V.isMobilePhone(val, 'en-TZ'), message: 'mobile phone number of en-TZ locale'},
    'mobilephone-en-ZA': { method: (val) => V.isMobilePhone(val, 'en-ZA'), message: 'mobile phone number of en-ZA locale'},
    'mobilephone-en-ZM': { method: (val) => V.isMobilePhone(val, 'en-ZM'), message: 'mobile phone number of en-ZM locale'},
    'mobilephone-en-PK': { method: (val) => V.isMobilePhone(val, 'en-PK'), message: 'mobile phone number of en-PK locale'},
    'mobilephone-es-ES': { method: (val) => V.isMobilePhone(val, 'es-ES'), message: 'mobile phone number of es-ES locale'},
    'mobilephone-es-MX': { method: (val) => V.isMobilePhone(val, 'es-MX'), message: 'mobile phone number of es-MX locale'},
    'mobilephone-es-UY': { method: (val) => V.isMobilePhone(val, 'es-UY'), message: 'mobile phone number of es-UY locale'},
    'mobilephone-et-EE': { method: (val) => V.isMobilePhone(val, 'et-EE'), message: 'mobile phone number of et-EE locale'},
    'mobilephone-fa-IR': { method: (val) => V.isMobilePhone(val, 'fa-IR'), message: 'mobile phone number of fa-IR locale'},
    'mobilephone-fi-FI': { method: (val) => V.isMobilePhone(val, 'fi-FI'), message: 'mobile phone number of fi-FI locale'},
    'mobilephone-fr-FR': { method: (val) => V.isMobilePhone(val, 'fr-FR'), message: 'mobile phone number of fr-FR locale'},
    'mobilephone-he-IL': { method: (val) => V.isMobilePhone(val, 'he-IL'), message: 'mobile phone number of he-IL locale'},
    'mobilephone-hu-HU': { method: (val) => V.isMobilePhone(val, 'hu-HU'), message: 'mobile phone number of hu-HU locale'},
    'mobilephone-it-IT': { method: (val) => V.isMobilePhone(val, 'it-IT'), message: 'mobile phone number of it-IT locale'},
    'mobilephone-ja-JP': { method: (val) => V.isMobilePhone(val, 'ja-JP'), message: 'mobile phone number of ja-JP locale'},
    'mobilephone-kk-KZ': { method: (val) => V.isMobilePhone(val, 'kk-KZ'), message: 'mobile phone number of kk-KZ locale'},
    'mobilephone-ko-KR': { method: (val) => V.isMobilePhone(val, 'ko-KR'), message: 'mobile phone number of ko-KR locale'},
    'mobilephone-lt-LT': { method: (val) => V.isMobilePhone(val, 'lt-LT'), message: 'mobile phone number of lt-LT locale'},
    'mobilephone-ms-MY': { method: (val) => V.isMobilePhone(val, 'ms-MY'), message: 'mobile phone number of ms-MY locale'},
    'mobilephone-nb-NO': { method: (val) => V.isMobilePhone(val, 'nb-NO'), message: 'mobile phone number of nb-NO locale'},
    'mobilephone-nn-NO': { method: (val) => V.isMobilePhone(val, 'nn-NO'), message: 'mobile phone number of nn-NO locale'},
    'mobilephone-pl-PL': { method: (val) => V.isMobilePhone(val, 'pl-PL'), message: 'mobile phone number of pl-PL locale'},
    'mobilephone-pt-PT': { method: (val) => V.isMobilePhone(val, 'pt-PT'), message: 'mobile phone number of pt-PT locale'},
    'mobilephone-pt-BR': { method: (val) => V.isMobilePhone(val, 'pt-BR'), message: 'mobile phone number of pt-BR locale'},
    'mobilephone-ro-RO': { method: (val) => V.isMobilePhone(val, 'ro-RO'), message: 'mobile phone number of ro-RO locale'},
    'mobilephone-ru-RU': { method: (val) => V.isMobilePhone(val, 'ru-RU'), message: 'mobile phone number of ru-RU locale'},
    'mobilephone-sl-SI': { method: (val) => V.isMobilePhone(val, 'sl-SI'), message: 'mobile phone number of sl-SI locale'},
    'mobilephone-sk-SK': { method: (val) => V.isMobilePhone(val, 'sk-SK'), message: 'mobile phone number of sk-SK locale'},
    'mobilephone-sr-RS': { method: (val) => V.isMobilePhone(val, 'sr-RS'), message: 'mobile phone number of sr-RS locale'},
    'mobilephone-sv-SE': { method: (val) => V.isMobilePhone(val, 'sv-SE'), message: 'mobile phone number of sv-SE locale'},
    'mobilephone-th-TH': { method: (val) => V.isMobilePhone(val, 'th-TH'), message: 'mobile phone number of th-TH locale'},
    'mobilephone-tr-TR': { method: (val) => V.isMobilePhone(val, 'tr-TR'), message: 'mobile phone number of tr-TR locale'},
    'mobilephone-uk-UA': { method: (val) => V.isMobilePhone(val, 'uk-UA'), message: 'mobile phone number of uk-UA locale'},
    'mobilephone-vi-VN': { method: (val) => V.isMobilePhone(val, 'vi-VN'), message: 'mobile phone number of vi-VN locale'},
    'mobilephone-zh-CN': { method: (val) => V.isMobilePhone(val, 'zh-CN'), message: 'mobile phone number of zh-CN locale'},
    'mobilephone-zh-HK': { method: (val) => V.isMobilePhone(val, 'zh-HK'), message: 'mobile phone number of zh-HK locale'},
    'mobilephone-zh-TW': { method: (val) => V.isMobilePhone(val, 'zh-TW'), message: 'mobile phone number of zh-TW locale'},
    'mongoid': {
      method: 'isMongoId',
      message: 'MongoDB object ID'
    },
    'multibyte': {
      method: 'isMultibyte',
      message: 'one or more multibyte chars'
    },
    // same as 'number' without a converter
    'numeric': {
      method: 'isNumeric',
      message: 'string contains only numbers (may contain +, -, or . symbol)'
    },
    // check if the string contains only numbers, no other symbols  (e.g. +, -, or .). 
    'numericonly': {
      method: (val) => V.isNumeric(val, {no_symbols: true}),
      message: 'string contains only numbers (0-9)'
    },
    'number': {
      method: 'isNumeric',
      message: 'number',
      converter: V.toFloat
    },
    'object': {
      method: (val) => { try { let t = _.isString(val) ? JSON5.parse(val) : t; return _.isPlainObject(t); } catch(e) { return false; } },
      converter: (val) => _.isString(val) ? JSON5.parse(val) : val,
      message: 'object'
    },
    // check if the string is a valid port number.
    'port': {
      method: 'isPort',
      message: 'valid port number'
    },
    'postalcode': { method: 'isPostalCode', message: 'postal code' },
    'postalcode-at': { method: (val) => V.isPostalCode(val, 'AT'), message: 'postal code of AT locale' },
    'postalcode-au': { method: (val) => V.isPostalCode(val, 'AU'), message: 'postal code of AU locale' },
    'postalcode-be': { method: (val) => V.isPostalCode(val, 'BE'), message: 'postal code of BE locale' },
    'postalcode-bg': { method: (val) => V.isPostalCode(val, 'BG'), message: 'postal code of BG locale' },
    'postalcode-ca': { method: (val) => V.isPostalCode(val, 'CA'), message: 'postal code of CA locale' },
    'postalcode-ch': { method: (val) => V.isPostalCode(val, 'CH'), message: 'postal code of CH locale' },
    'postalcode-cz': { method: (val) => V.isPostalCode(val, 'CZ'), message: 'postal code of CZ locale' },
    'postalcode-de': { method: (val) => V.isPostalCode(val, 'DE'), message: 'postal code of DE locale' },
    'postalcode-dk': { method: (val) => V.isPostalCode(val, 'DK'), message: 'postal code of DK locale' },
    'postalcode-dz': { method: (val) => V.isPostalCode(val, 'DZ'), message: 'postal code of DZ locale' },
    'postalcode-es': { method: (val) => V.isPostalCode(val, 'ES'), message: 'postal code of ES locale' },
    'postalcode-fi': { method: (val) => V.isPostalCode(val, 'FI'), message: 'postal code of FI locale' },
    'postalcode-fr': { method: (val) => V.isPostalCode(val, 'FR'), message: 'postal code of FR locale' },
    'postalcode-gb': { method: (val) => V.isPostalCode(val, 'GB'), message: 'postal code of GB locale' },
    'postalcode-gr': { method: (val) => V.isPostalCode(val, 'GR'), message: 'postal code of GR locale' },
    'postalcode-il': { method: (val) => V.isPostalCode(val, 'IL'), message: 'postal code of IL locale' },
    'postalcode-in': { method: (val) => V.isPostalCode(val, 'IN'), message: 'postal code of IN locale' },
    'postalcode-is': { method: (val) => V.isPostalCode(val, 'IS'), message: 'postal code of IS locale' },
    'postalcode-it': { method: (val) => V.isPostalCode(val, 'IT'), message: 'postal code of IT locale' },
    'postalcode-jp': { method: (val) => V.isPostalCode(val, 'JP'), message: 'postal code of JP locale' },
    'postalcode-ke': { method: (val) => V.isPostalCode(val, 'KE'), message: 'postal code of KE locale' },
    'postalcode-li': { method: (val) => V.isPostalCode(val, 'LI'), message: 'postal code of LI locale' },
    'postalcode-mx': { method: (val) => V.isPostalCode(val, 'MX'), message: 'postal code of MX locale' },
    'postalcode-nl': { method: (val) => V.isPostalCode(val, 'NL'), message: 'postal code of NL locale' },
    'postalcode-no': { method: (val) => V.isPostalCode(val, 'NO'), message: 'postal code of NO locale' },
    'postalcode-pl': { method: (val) => V.isPostalCode(val, 'PL'), message: 'postal code of PL locale' },
    'postalcode-pt': { method: (val) => V.isPostalCode(val, 'PT'), message: 'postal code of PT locale' },
    'postalcode-ro': { method: (val) => V.isPostalCode(val, 'RO'), message: 'postal code of RO locale' },
    'postalcode-ru': { method: (val) => V.isPostalCode(val, 'RU'), message: 'postal code of RU locale' },
    'postalcode-sa': { method: (val) => V.isPostalCode(val, 'SA'), message: 'postal code of SA locale' },
    'postalcode-se': { method: (val) => V.isPostalCode(val, 'SE'), message: 'postal code of SE locale' },
    'postalcode-tw': { method: (val) => V.isPostalCode(val, 'TW'), message: 'postal code of TW locale' },
    'postalcode-us': { method: (val) => V.isPostalCode(val, 'US'), message: 'postal code of US locale' },
    'postalcode-za': { method: (val) => V.isPostalCode(val, 'ZA'), message: 'postal code of ZA locale' },
    'postalcode-zm': { method: (val) => V.isPostalCode(val, 'ZM'), message: 'postal code of ZM locale'},
    'string': {
      method: (val) => _.isString(val),
      converter: 'toString',
      message: 'string'
    },
    'surrogatepair': {
      method: 'isSurrogatePair',
      message: 'string contains any surrogate pairs chars'
    },
    'url': {
      method: 'isURL',
      message: 'valid URL string'
    },
    'uuid': {
      method: 'isUUID',
      message: 'UUID string (version 3, 4 or 5)'
    },
    'uuidv3': { method: (val) => V.isUUID(val, 3), message: 'UUID version 3 string' },
    'uuidv4': { method: (val) => V.isUUID(val, 4), message: 'UUID version 4 string' },
    'uuidv5': { method: (val) => V.isUUID(val, 5), message: 'UUID version 5 string' },
    'uppercase': {
      method: 'isUppercase',
      message: 'string in upper case'
    }
  },

  // -----------------------

  converters: {
    'boolean': {
      converter: V.toBoolean
    },
    'date': {
      converter: V.toDate
    },
    // replace <, >, &, ', " and / with HTML entities.
    'escape': {
      converter: V.escape
    },
    // replaces HTML encoded entities with <, >, &, ', " and /.
    'unescape': {
      converter: V.unescape
    },
    'json': {
      converter: JSON5.parse
    },
    'ltrim': {
      converter: V.ltrim
    },
    'rtrim': {
      converter: V.rtrim
    },
    'removeHTML': {
      converter: (val) => val.replace(/<(?:.|\n)*?>/gm, '')
    },
    'removespace': {
      converter: (val) => val.replace(/\s/g, '')
    },
    'removelinebreak': {
      converter: (val) => val.replace(/(\r\n\t|\n|\r\t)/gm, '')
    },
    'normalizeemail': {
      method: 'isEmail',
      converter: V.normalizeEmail
    },
    'lowercase': {
      converter: (val) => val.toString().toLowerCase()
    },
    'string': {
      converter: (val) => val.toString()
    },
    'int': {
      converter: V.toInt
    },
    'float': {
      converter: V.toFloat
    },
    'trim': {
      converter: V.trim
    },
    'uppercase': {
      converter: (val) => val.toString().toUpperCase()
    }
  }

};
