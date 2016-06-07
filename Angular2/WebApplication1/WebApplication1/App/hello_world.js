var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'node_modules/angular2/core'], factory);
    }
})(function (require, exports) {
    "use strict";
    const core_1 = require('node_modules/angular2/core');
    let HelloWorld = class HelloWorld {
        constructor() {
            // Declaring the variable for binding with initial value
            this.yourName = '';
        }
    };
    HelloWorld = __decorate([
        core_1.Component({
            // Declare the tag name in index.html to where the component attaches
            selector: 'hello-world',
            // Location of the template for this component
            templateUrl: 'app/hello_world.html'
        })
    ], HelloWorld);
    exports.HelloWorld = HelloWorld;
});
//# sourceMappingURL=hello_world.js.map