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
var lang_1 = require("angular2/src/facade/lang");
var RouteMetadata = (function () {
    function RouteMetadata() {
    }
    Object.defineProperty(RouteMetadata.prototype, "path", {
        get: function () { },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouteMetadata.prototype, "component", {
        get: function () { },
        enumerable: true,
        configurable: true
    });
    return RouteMetadata;
}());
exports.RouteMetadata = RouteMetadata;
var Route = (function () {
    function Route(_a) {
        var _b = _a === void 0 ? {} : _a, path = _b.path, component = _b.component;
        this.path = path;
        this.component = component;
    }
    Route.prototype.toString = function () { return "@Route(" + this.path + ", " + lang_1.stringify(this.component) + ")"; };
    Route = __decorate([
        lang_1.CONST(), 
        __metadata('design:paramtypes', [Object])
    ], Route);
    return Route;
}());
exports.Route = Route;
var RoutesMetadata = (function () {
    function RoutesMetadata(routes) {
        this.routes = routes;
    }
    RoutesMetadata.prototype.toString = function () { return "@Routes(" + this.routes + ")"; };
    RoutesMetadata = __decorate([
        lang_1.CONST(), 
        __metadata('design:paramtypes', [Array])
    ], RoutesMetadata);
    return RoutesMetadata;
}());
exports.RoutesMetadata = RoutesMetadata;
//# sourceMappingURL=metadata.js.map