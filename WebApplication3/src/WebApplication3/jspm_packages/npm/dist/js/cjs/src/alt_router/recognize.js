"use strict";
var segments_1 = require('./segments');
var metadata_1 = require('./metadata/metadata');
var lang_1 = require('angular2/src/facade/lang');
var promise_1 = require('angular2/src/facade/promise');
var exceptions_1 = require('angular2/src/facade/exceptions');
var reflection_1 = require('angular2/src/core/reflection/reflection');
function recognize(componentResolver, type, url) {
    return _recognize(componentResolver, type, url, url.root)
        .then(function (nodes) { return new segments_1.Tree(nodes); });
}
exports.recognize = recognize;
function _recognize(componentResolver, type, url, current) {
    var metadata = _readMetadata(type); // should read from the factory instead
    var matched;
    try {
        matched = _match(metadata, url, current);
    }
    catch (e) {
        return promise_1.PromiseWrapper.reject(e, null);
    }
    return componentResolver.resolveComponent(matched.route.component)
        .then(function (factory) {
        var segment = new segments_1.RouteSegment(matched.consumedUrlSegments, matched.parameters, "", matched.route.component, factory);
        if (lang_1.isPresent(matched.leftOver)) {
            return _recognize(componentResolver, matched.route.component, url, matched.leftOver)
                .then(function (children) { return [segment].concat(children); });
        }
        else {
            return [segment];
        }
    });
}
function _match(metadata, url, current) {
    for (var _i = 0, _a = metadata.routes; _i < _a.length; _i++) {
        var r = _a[_i];
        var matchingResult = _matchWithParts(r, url, current);
        if (lang_1.isPresent(matchingResult)) {
            return matchingResult;
        }
    }
    throw new exceptions_1.BaseException("Cannot match any routes");
}
function _matchWithParts(route, url, current) {
    var parts = route.path.split("/");
    var parameters = {};
    var consumedUrlSegments = [];
    var u = current;
    for (var i = 0; i < parts.length; ++i) {
        consumedUrlSegments.push(u);
        var p = parts[i];
        if (p.startsWith(":")) {
            var segment = u.segment;
            parameters[p.substring(1)] = segment;
        }
        else if (p != u.segment) {
            return null;
        }
        u = url.firstChild(u);
    }
    return new _MatchingResult(route, consumedUrlSegments, parameters, u);
}
var _MatchingResult = (function () {
    function _MatchingResult(route, consumedUrlSegments, parameters, leftOver) {
        this.route = route;
        this.consumedUrlSegments = consumedUrlSegments;
        this.parameters = parameters;
        this.leftOver = leftOver;
    }
    return _MatchingResult;
}());
function _readMetadata(componentType) {
    var metadata = reflection_1.reflector.annotations(componentType).filter(function (f) { return f instanceof metadata_1.RoutesMetadata; });
    if (metadata.length === 0) {
        throw new exceptions_1.BaseException("Component '" + lang_1.stringify(componentType) + "' does not have route configuration");
    }
    return metadata[0];
}
//# sourceMappingURL=recognize.js.map