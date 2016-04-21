(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'node_modules/angular2/platform/browser', './app.component'], factory);
    }
})(function (require, exports) {
    var browser_1 = require('node_modules/angular2/platform/browser');
    var app_component_1 = require('./app.component');
    console.log(`About to Bootstrap`);
    browser_1.bootstrap(app_component_1.StoryComponent)
        .then(success => console.log(`Bootstrap success`))
        .catch(error => console.log('Bootstrap error: ' + error));
    console.log(`About to Bootstrap`);
});
//# sourceMappingURL=tester.js.map