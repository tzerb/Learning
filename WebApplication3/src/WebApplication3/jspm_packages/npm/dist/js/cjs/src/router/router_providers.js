"use strict";
var router_providers_common_1 = require('./router_providers_common');
var core_1 = require('angular2/core');
var browser_platform_location_1 = require('angular2/src/platform/browser/location/browser_platform_location');
var common_1 = require('angular2/platform/common');
var lang_1 = require('angular2/src/facade/lang');
/**
 * A list of {@link Provider}s. To use the router, you must add this to your application.
 *
 * ### Example ([live demo](http://plnkr.co/edit/iRUP8B5OUbxCWQ3AcIDm))
 *
 * ```
 * import {Component} from 'angular2/core';
 * import {
 *   ROUTER_DIRECTIVES,
 *   ROUTER_PROVIDERS,
 *   RouteConfig
 * } from 'angular2/router';
 *
 * @Component({directives: [ROUTER_DIRECTIVES]})
 * @RouteConfig([
 *  {...},
 * ])
 * class AppCmp {
 *   // ...
 * }
 *
 * bootstrap(AppCmp, [ROUTER_PROVIDERS]);
 * ```
 */
exports.ROUTER_PROVIDERS = lang_1.CONST_EXPR([
    router_providers_common_1.ROUTER_PROVIDERS_COMMON,
    lang_1.CONST_EXPR(new core_1.Provider(common_1.PlatformLocation, { useClass: browser_platform_location_1.BrowserPlatformLocation })),
]);
/**
 * Use {@link ROUTER_PROVIDERS} instead.
 *
 * @deprecated
 */
exports.ROUTER_BINDINGS = exports.ROUTER_PROVIDERS;
//# sourceMappingURL=router_providers.js.map