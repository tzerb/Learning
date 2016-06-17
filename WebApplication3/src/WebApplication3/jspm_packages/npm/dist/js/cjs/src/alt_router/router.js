"use strict";
var core_1 = require('angular2/core');
var lang_1 = require('angular2/src/facade/lang');
var recognize_1 = require('./recognize');
var segments_1 = require('./segments');
var lifecycle_reflector_1 = require('./lifecycle_reflector');
var RouterOutletMap = (function () {
    function RouterOutletMap() {
        /** @internal */
        this._outlets = {};
    }
    RouterOutletMap.prototype.registerOutlet = function (name, outlet) { this._outlets[name] = outlet; };
    return RouterOutletMap;
}());
exports.RouterOutletMap = RouterOutletMap;
var Router = (function () {
    function Router(_componentType, _componentResolver, _urlParser, _routerOutletMap) {
        this._componentType = _componentType;
        this._componentResolver = _componentResolver;
        this._urlParser = _urlParser;
        this._routerOutletMap = _routerOutletMap;
    }
    Router.prototype.navigateByUrl = function (url) {
        var _this = this;
        var urlSegmentTree = this._urlParser.parse(url.substring(1));
        return recognize_1.recognize(this._componentResolver, this._componentType, urlSegmentTree)
            .then(function (currTree) {
            var prevRoot = lang_1.isPresent(_this.prevTree) ? _this.prevTree.root : null;
            _loadSegments(currTree, currTree.root, _this.prevTree, prevRoot, _this, _this._routerOutletMap);
            _this.prevTree = currTree;
        });
    };
    return Router;
}());
exports.Router = Router;
function _loadSegments(currTree, curr, prevTree, prev, router, parentOutletMap) {
    var outlet = parentOutletMap._outlets[curr.outlet];
    var outletMap;
    if (segments_1.equalSegments(curr, prev)) {
        outletMap = outlet.outletMap;
    }
    else {
        outletMap = new RouterOutletMap();
        var resolved = core_1.ReflectiveInjector.resolve([core_1.provide(RouterOutletMap, { useValue: outletMap }), core_1.provide(segments_1.RouteSegment, { useValue: curr })]);
        var ref = outlet.load(segments_1.routeSegmentComponentFactory(curr), resolved, outletMap);
        if (lifecycle_reflector_1.hasLifecycleHook("routerOnActivate", ref.instance)) {
            ref.instance.routerOnActivate(curr, prev, currTree, prevTree);
        }
    }
    if (lang_1.isPresent(currTree.firstChild(curr))) {
        var cc = currTree.firstChild(curr);
        var pc = lang_1.isBlank(prevTree) ? null : prevTree.firstChild(prev);
        _loadSegments(currTree, cc, prevTree, pc, router, outletMap);
    }
}
//# sourceMappingURL=router.js.map