"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var lang_1 = require('angular2/src/facade/lang');
var worker_app_common_1 = require('angular2/src/platform/worker_app_common');
var worker_app_1 = require('angular2/src/platform/worker_app');
var core_1 = require('angular2/core');
__export(require('angular2/src/web_workers/shared/message_bus'));
function workerAppPlatform() {
    if (lang_1.isBlank(core_1.getPlatform())) {
        core_1.createPlatform(core_1.ReflectiveInjector.resolveAndCreate(worker_app_common_1.WORKER_APP_PLATFORM));
    }
    return core_1.assertPlatform(worker_app_common_1.WORKER_APP_PLATFORM_MARKER);
}
exports.workerAppPlatform = workerAppPlatform;
function bootstrapApp(appComponentType, customProviders) {
    var appInjector = core_1.ReflectiveInjector.resolveAndCreate([worker_app_1.WORKER_APP_APPLICATION, lang_1.isPresent(customProviders) ? customProviders : []], workerAppPlatform().injector);
    return core_1.coreLoadAndBootstrap(appInjector, appComponentType);
}
exports.bootstrapApp = bootstrapApp;
//# sourceMappingURL=worker_app.js.map