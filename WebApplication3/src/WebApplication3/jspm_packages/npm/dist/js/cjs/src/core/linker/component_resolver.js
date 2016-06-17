"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var di_1 = require('angular2/src/core/di');
var lang_1 = require('angular2/src/facade/lang');
var exceptions_1 = require('angular2/src/facade/exceptions');
var async_1 = require('angular2/src/facade/async');
var reflection_1 = require('angular2/src/core/reflection/reflection');
var component_factory_1 = require('./component_factory');
/**
 * Low-level service for loading {@link ComponentFactory}s, which
 * can later be used to create and render a Component instance.
 */
var ComponentResolver = (function () {
    function ComponentResolver() {
    }
    return ComponentResolver;
}());
exports.ComponentResolver = ComponentResolver;
function _isComponentFactory(type) {
    return type instanceof component_factory_1.ComponentFactory;
}
var ReflectorComponentResolver = (function (_super) {
    __extends(ReflectorComponentResolver, _super);
    function ReflectorComponentResolver() {
        _super.apply(this, arguments);
    }
    ReflectorComponentResolver.prototype.resolveComponent = function (componentType) {
        var metadatas = reflection_1.reflector.annotations(componentType);
        var componentFactory = metadatas.find(_isComponentFactory);
        if (lang_1.isBlank(componentFactory)) {
            throw new exceptions_1.BaseException("No precompiled component " + lang_1.stringify(componentType) + " found");
        }
        return async_1.PromiseWrapper.resolve(componentFactory);
    };
    ReflectorComponentResolver.prototype.clearCache = function () { };
    ReflectorComponentResolver = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ReflectorComponentResolver);
    return ReflectorComponentResolver;
}(ComponentResolver));
exports.ReflectorComponentResolver = ReflectorComponentResolver;
//# sourceMappingURL=component_resolver.js.map