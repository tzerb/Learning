"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var lang_1 = require('angular2/src/facade/lang');
var core_1 = require('angular2/core');
var invalid_pipe_argument_exception_1 = require('./invalid_pipe_argument_exception');
/**
 * Creates a new String with some or all of the matches of a pattern replaced by
 * a replacement.
 *
 * The pattern to be matched is specified by the 'pattern' parameter.
 *
 * The replacement to be set is specified by the 'replacement' parameter.
 *
 * An optional 'flags' parameter can be set.
 *
 * ### Usage
 *
 *     expression | replace:pattern:replacement
 *
 * All behavior is based on the expected behavior of the JavaScript API
 * String.prototype.replace() function.
 *
 * Where the input expression is a [String] or [Number] (to be treated as a string),
 * the `pattern` is a [String] or [RegExp],
 * the 'replacement' is a [String] or [Function].
 *
 * --Note--: The 'pattern' parameter will be converted to a RegExp instance. Make sure to escape the
 * string properly if you are matching for regular expression special characters like parenthesis,
 * brackets etc.
 */
var ReplacePipe = (function () {
    function ReplacePipe() {
    }
    ReplacePipe.prototype.transform = function (value, pattern, replacement) {
        if (lang_1.isBlank(value)) {
            return value;
        }
        if (!this._supportedInput(value)) {
            throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(ReplacePipe, value);
        }
        var input = value.toString();
        if (!this._supportedPattern(pattern)) {
            throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(ReplacePipe, pattern);
        }
        if (!this._supportedReplacement(replacement)) {
            throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(ReplacePipe, replacement);
        }
        // template fails with literal RegExp e.g /pattern/igm
        // var rgx = pattern instanceof RegExp ? pattern : RegExpWrapper.create(pattern);
        if (lang_1.isFunction(replacement)) {
            var rgxPattern = lang_1.isString(pattern) ? lang_1.RegExpWrapper.create(pattern) : pattern;
            return lang_1.StringWrapper.replaceAllMapped(input, rgxPattern, replacement);
        }
        if (pattern instanceof RegExp) {
            // use the replaceAll variant
            return lang_1.StringWrapper.replaceAll(input, pattern, replacement);
        }
        return lang_1.StringWrapper.replace(input, pattern, replacement);
    };
    ReplacePipe.prototype._supportedInput = function (input) { return lang_1.isString(input) || lang_1.isNumber(input); };
    ReplacePipe.prototype._supportedPattern = function (pattern) {
        return lang_1.isString(pattern) || pattern instanceof RegExp;
    };
    ReplacePipe.prototype._supportedReplacement = function (replacement) {
        return lang_1.isString(replacement) || lang_1.isFunction(replacement);
    };
    ReplacePipe = __decorate([
        core_1.Pipe({ name: 'replace' }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ReplacePipe);
    return ReplacePipe;
}());
exports.ReplacePipe = ReplacePipe;
//# sourceMappingURL=replace_pipe.js.map