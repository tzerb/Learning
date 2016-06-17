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
var core_1 = require('angular2/core');
var lang_1 = require('angular2/src/facade/lang');
/**
 * Creates and inserts an embedded view based on a prepared `TemplateRef`.
 *
 * ### Syntax
 * - `<template [ngTemplateOutlet]="templateRefExpression"></template>`
 */
var NgTemplateOutlet = (function () {
    function NgTemplateOutlet(_viewContainerRef) {
        this._viewContainerRef = _viewContainerRef;
    }
    Object.defineProperty(NgTemplateOutlet.prototype, "ngTemplateOutlet", {
        set: function (templateRef) {
            if (lang_1.isPresent(this._insertedViewRef)) {
                this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._insertedViewRef));
            }
            if (lang_1.isPresent(templateRef)) {
                this._insertedViewRef = this._viewContainerRef.createEmbeddedView(templateRef);
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', (typeof (_a = typeof core_1.TemplateRef !== 'undefined' && core_1.TemplateRef) === 'function' && _a) || Object), 
        __metadata('design:paramtypes', [(typeof (_b = typeof core_1.TemplateRef !== 'undefined' && core_1.TemplateRef) === 'function' && _b) || Object])
    ], NgTemplateOutlet.prototype, "ngTemplateOutlet", null);
    NgTemplateOutlet = __decorate([
        core_1.Directive({ selector: '[ngTemplateOutlet]' }), 
        __metadata('design:paramtypes', [(typeof (_c = typeof core_1.ViewContainerRef !== 'undefined' && core_1.ViewContainerRef) === 'function' && _c) || Object])
    ], NgTemplateOutlet);
    return NgTemplateOutlet;
    var _a, _b, _c;
}());
exports.NgTemplateOutlet = NgTemplateOutlet;
//# sourceMappingURL=ng_template_outlet.js.map