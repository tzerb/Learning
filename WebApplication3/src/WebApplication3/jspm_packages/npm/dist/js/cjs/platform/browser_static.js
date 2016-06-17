"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('angular2/src/core/angular_entrypoint'));
var lang_1 = require('angular2/src/facade/lang');
var browser_common_1 = require('angular2/src/platform/browser_common');
var core_1 = require('angular2/core');
/**
 * An array of providers that should be passed into `application()` when bootstrapping a component
 * when all templates
 * have been precompiled offline.
 */
exports.BROWSER_APP_PROVIDERS = browser_common_1.BROWSER_APP_COMMON_PROVIDERS;
function browserStaticPlatform() {
    if (lang_1.isBlank(core_1.getPlatform())) {
        core_1.createPlatform(core_1.ReflectiveInjector.resolveAndCreate(browser_common_1.BROWSER_PROVIDERS));
    }
    return core_1.assertPlatform(browser_common_1.BROWSER_PLATFORM_MARKER);
}
exports.browserStaticPlatform = browserStaticPlatform;
/**
 * See {@link bootstrap} for more information.
 */
function bootstrapStatic(appComponentType, customProviders, initReflector) {
    if (lang_1.isPresent(initReflector)) {
        initReflector();
    }
    var appProviders = lang_1.isPresent(customProviders) ? [exports.BROWSER_APP_PROVIDERS, customProviders] : exports.BROWSER_APP_PROVIDERS;
    var appInjector = core_1.ReflectiveInjector.resolveAndCreate(appProviders, browserStaticPlatform().injector);
    return core_1.coreLoadAndBootstrap(appInjector, appComponentType);
}
exports.bootstrapStatic = bootstrapStatic;
//# sourceMappingURL=browser_static.js.map