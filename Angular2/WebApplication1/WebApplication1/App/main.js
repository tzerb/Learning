(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'node_modules/angular2/platform/browser', './hello_world'], factory);
    }
})(function (require, exports) {
    "use strict";
    const browser_1 = require('node_modules/angular2/platform/browser');
    const hello_world_1 = require('./hello_world');
    browser_1.bootstrap(hello_world_1.HelloWorld);
});
//# sourceMappingURL=main.js.map