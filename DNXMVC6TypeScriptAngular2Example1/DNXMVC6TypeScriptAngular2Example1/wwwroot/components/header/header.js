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
var browser_1 = require('angular2/platform/browser');
var core_1 = require('angular2/core');
var config_model_1 = require('./../shared/config.model');
var data_handlers_model_1 = require('./../../services/data/data.handlers.model');
var data_service_1 = require('./../../services/data/data.service');
var http_1 = require('angular2/http');
var HeaderComponent = (function () {
    function HeaderComponent(dataService) {
        this.dataService = dataService;
        this.vm = new HeaderComponentViewModel();
        this.getConfig();
    }
    HeaderComponent.prototype.getConfig = function () {
        var _this = this;
        this.dataService.getData(data_handlers_model_1.DataHandlerIdentifier.GetConfig, function (response) { return _this.vm.config = response; });
    };
    HeaderComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'header'
        }),
        core_1.View({
            styleUrls: ['header.css'],
            templateUrl: 'header.html'
        }),
        __param(0, core_1.Inject(data_service_1.DataService)), 
        __metadata('design:paramtypes', [Object])
    ], HeaderComponent);
    return HeaderComponent;
}());
var HeaderComponentViewModel = (function () {
    function HeaderComponentViewModel() {
        this.config = new config_model_1.ConfigModel();
    }
    return HeaderComponentViewModel;
}());
browser_1.bootstrap(HeaderComponent, [http_1.HTTP_PROVIDERS, data_service_1.DataService]);
//# sourceMappingURL=header.js.map