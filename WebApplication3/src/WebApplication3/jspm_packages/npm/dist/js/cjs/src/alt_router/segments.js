"use strict";
var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
var Tree = (function () {
    function Tree(_nodes) {
        this._nodes = _nodes;
    }
    Object.defineProperty(Tree.prototype, "root", {
        get: function () { return this._nodes[0]; },
        enumerable: true,
        configurable: true
    });
    Tree.prototype.parent = function (t) {
        var index = this._nodes.indexOf(t);
        return index > 0 ? this._nodes[index - 1] : null;
    };
    Tree.prototype.children = function (t) {
        var index = this._nodes.indexOf(t);
        return index > -1 && index < this._nodes.length - 1 ? [this._nodes[index + 1]] : [];
    };
    Tree.prototype.firstChild = function (t) {
        var index = this._nodes.indexOf(t);
        return index > -1 && index < this._nodes.length - 1 ? this._nodes[index + 1] : null;
    };
    Tree.prototype.pathToRoot = function (t) {
        var index = this._nodes.indexOf(t);
        return index > -1 ? this._nodes.slice(0, index + 1) : null;
    };
    return Tree;
}());
exports.Tree = Tree;
var UrlSegment = (function () {
    function UrlSegment(segment, parameters, outlet) {
        this.segment = segment;
        this.parameters = parameters;
        this.outlet = outlet;
    }
    return UrlSegment;
}());
exports.UrlSegment = UrlSegment;
var RouteSegment = (function () {
    function RouteSegment(urlSegments, parameters, outlet, type, componentFactory) {
        this.urlSegments = urlSegments;
        this.outlet = outlet;
        this._type = type;
        this._componentFactory = componentFactory;
        this._parameters = parameters;
    }
    RouteSegment.prototype.getParam = function (param) { return this._parameters[param]; };
    Object.defineProperty(RouteSegment.prototype, "type", {
        get: function () { return this._type; },
        enumerable: true,
        configurable: true
    });
    return RouteSegment;
}());
exports.RouteSegment = RouteSegment;
function equalSegments(a, b) {
    if (lang_1.isBlank(a) && !lang_1.isBlank(b))
        return false;
    if (!lang_1.isBlank(a) && lang_1.isBlank(b))
        return false;
    return a._type === b._type && collection_1.StringMapWrapper.equals(a._parameters, b._parameters);
}
exports.equalSegments = equalSegments;
function routeSegmentComponentFactory(a) {
    return a._componentFactory;
}
exports.routeSegmentComponentFactory = routeSegmentComponentFactory;
//# sourceMappingURL=segments.js.map