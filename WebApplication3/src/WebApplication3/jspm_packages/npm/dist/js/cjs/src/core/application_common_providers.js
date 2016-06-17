"use strict";
var lang_1 = require('angular2/src/facade/lang');
var di_1 = require('angular2/src/core/di');
var application_tokens_1 = require('./application_tokens');
var application_ref_1 = require('./application_ref');
var change_detection_1 = require('./change_detection/change_detection');
var view_utils_1 = require("./linker/view_utils");
var component_resolver_1 = require('./linker/component_resolver');
var dynamic_component_loader_1 = require('./linker/dynamic_component_loader');
var __unused; // avoid unused import when Type union types are erased
/**
 * A default set of providers which should be included in any Angular
 * application, regardless of the platform it runs onto.
 */
exports.APPLICATION_COMMON_PROVIDERS = lang_1.CONST_EXPR([
    application_ref_1.APPLICATION_CORE_PROVIDERS,
    new di_1.Provider(component_resolver_1.ComponentResolver, { useClass: component_resolver_1.ReflectorComponentResolver }),
    application_tokens_1.APP_ID_RANDOM_PROVIDER,
    view_utils_1.ViewUtils,
    new di_1.Provider(change_detection_1.IterableDiffers, { useValue: change_detection_1.defaultIterableDiffers }),
    new di_1.Provider(change_detection_1.KeyValueDiffers, { useValue: change_detection_1.defaultKeyValueDiffers }),
    new di_1.Provider(dynamic_component_loader_1.DynamicComponentLoader, { useClass: dynamic_component_loader_1.DynamicComponentLoader_ })
]);
//# sourceMappingURL=application_common_providers.js.map