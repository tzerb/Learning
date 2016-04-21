(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'node_modules/angular2/platform/browser', './app'], factory);
    }
})(function (require, exports) {
    //main entry point
    var browser_1 = require('node_modules/angular2/platform/browser');
    var app_1 = require('./app');
    browser_1.bootstrap(app_1.App, [])
        .catch(err => console.error(err));
});
//# sourceMappingURL=main.js.map