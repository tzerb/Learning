"use strict";
var lang_1 = require('angular2/src/facade/lang');
exports.MODULE_SUFFIX = lang_1.IS_DART ? '.dart' : '';
var CAMEL_CASE_REGEXP = /([A-Z])/g;
var DASH_CASE_REGEXP = /-([a-z])/g;
function camelCaseToDashCase(input) {
    return lang_1.StringWrapper.replaceAllMapped(input, CAMEL_CASE_REGEXP, function (m) { return '-' + m[1].toLowerCase(); });
}
exports.camelCaseToDashCase = camelCaseToDashCase;
function dashCaseToCamelCase(input) {
    return lang_1.StringWrapper.replaceAllMapped(input, DASH_CASE_REGEXP, function (m) { return m[1].toUpperCase(); });
}
exports.dashCaseToCamelCase = dashCaseToCamelCase;
function splitAtColon(input, defaultValues) {
    var parts = lang_1.StringWrapper.split(input.trim(), /\s*:\s*/g);
    if (parts.length > 1) {
        return parts;
    }
    else {
        return defaultValues;
    }
}
exports.splitAtColon = splitAtColon;
function sanitizeIdentifier(name) {
    return lang_1.StringWrapper.replaceAll(name, /\W/g, '_');
}
exports.sanitizeIdentifier = sanitizeIdentifier;
//# sourceMappingURL=util.js.map