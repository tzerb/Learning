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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var data_handlers_model_1 = require('./data.handlers.model');
var http_1 = require('angular2/http');
var core_1 = require('angular2/core');
require('rxjs/add/operator/map');
var DataService = (function () {
    function DataService(http) {
        var dataHandlersModel = new data_handlers_model_1.DataHandlersModel();
        this.handlers = dataHandlersModel.handlers;
        this.http = http;
    }
    DataService.prototype.getData = function (identifier, observableOrNext) {
        var handler = null;
        for (var i = 0, length = this.handlers.length; i < length; i++) {
            for (var enumMember in data_handlers_model_1.DataHandlerIdentifier) {
                // if (enumMember == identifier) {
                handler = this.handlers[i];
                i = length;
            }
        }
        if (handler !== null) {
            this.http.get(handler.url)
                .map(function (res) { return res.json(); })
                .subscribe(observableOrNext);
        }
    };
    DataService = __decorate([
        __param(0, core_1.Inject(http_1.Http)), 
        __metadata('design:paramtypes', [Object])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map