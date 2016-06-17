"use strict";
var core_1 = require('angular2/core');
var common_1 = require('angular2/platform/common');
var platform_location_1 = require('./platform_location');
var router_providers_common_1 = require('angular2/src/router/router_providers_common');
exports.WORKER_APP_ROUTER = [
    router_providers_common_1.ROUTER_PROVIDERS_COMMON,
    new core_1.Provider(common_1.PlatformLocation, { useClass: platform_location_1.WebWorkerPlatformLocation }),
    new core_1.Provider(core_1.APP_INITIALIZER, {
        useFactory: function (platformLocation, zone) { return function () {
            return initRouter(platformLocation, zone);
        }; },
        multi: true,
        deps: [common_1.PlatformLocation, core_1.NgZone]
    })
];
function initRouter(platformLocation, zone) {
    return zone.runGuarded(function () { return platformLocation.init(); });
}
//# sourceMappingURL=router_providers.js.map