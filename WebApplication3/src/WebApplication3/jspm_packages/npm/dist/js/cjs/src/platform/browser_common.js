"use strict";
var lang_1 = require('angular2/src/facade/lang');
var di_1 = require('angular2/src/core/di');
var xhr_1 = require('angular2/src/compiler/xhr');
var core_1 = require("angular2/core");
var common_1 = require("angular2/common");
var testability_1 = require('angular2/src/core/testability/testability');
var dom_adapter_1 = require('angular2/src/platform/dom/dom_adapter');
var dom_events_1 = require('angular2/src/platform/dom/events/dom_events');
var key_events_1 = require('angular2/src/platform/dom/events/key_events');
var dom_tokens_1 = require('angular2/src/platform/dom/dom_tokens');
var dom_renderer_1 = require('angular2/src/platform/dom/dom_renderer');
var shared_styles_host_1 = require('angular2/src/platform/dom/shared_styles_host');
var browser_details_1 = require("angular2/src/animate/browser_details");
var animation_builder_1 = require("angular2/src/animate/animation_builder");
var browser_adapter_1 = require('./browser/browser_adapter');
var testability_2 = require('angular2/src/platform/browser/testability');
var xhr_cache_1 = require('angular2/src/platform/browser/xhr_cache');
var wtf_init_1 = require('angular2/src/core/profile/wtf_init');
var event_manager_1 = require("angular2/src/platform/dom/events/event_manager");
var hammer_gestures_1 = require('angular2/src/platform/dom/events/hammer_gestures');
var common_dom_1 = require('angular2/platform/common_dom');
var browser_adapter_2 = require('./browser/browser_adapter');
exports.BrowserDomAdapter = browser_adapter_2.BrowserDomAdapter;
var hammer_gestures_2 = require('./dom/events/hammer_gestures');
exports.HAMMER_GESTURE_CONFIG = hammer_gestures_2.HAMMER_GESTURE_CONFIG;
exports.HammerGestureConfig = hammer_gestures_2.HammerGestureConfig;
exports.BROWSER_PLATFORM_MARKER = lang_1.CONST_EXPR(new di_1.OpaqueToken('BrowserPlatformMarker'));
/**
 * A set of providers to initialize the Angular platform in a web browser.
 *
 * Used automatically by `bootstrap`, or can be passed to {@link platform}.
 */
exports.BROWSER_PROVIDERS = lang_1.CONST_EXPR([
    new di_1.Provider(exports.BROWSER_PLATFORM_MARKER, { useValue: true }),
    core_1.PLATFORM_COMMON_PROVIDERS,
    new di_1.Provider(core_1.PLATFORM_INITIALIZER, { useValue: initDomAdapter, multi: true }),
]);
function _exceptionHandler() {
    // !IS_DART is required because we must rethrow exceptions in JS,
    // but must not rethrow exceptions in Dart
    return new core_1.ExceptionHandler(dom_adapter_1.DOM, !lang_1.IS_DART);
}
function _document() {
    return dom_adapter_1.DOM.defaultDoc();
}
/**
 * A set of providers to initialize an Angular application in a web browser.
 *
 * Used automatically by `bootstrap`, or can be passed to {@link PlatformRef.application}.
 */
exports.BROWSER_APP_COMMON_PROVIDERS = lang_1.CONST_EXPR([
    core_1.APPLICATION_COMMON_PROVIDERS,
    common_1.FORM_PROVIDERS,
    new di_1.Provider(core_1.PLATFORM_PIPES, { useValue: common_1.COMMON_PIPES, multi: true }),
    new di_1.Provider(core_1.PLATFORM_DIRECTIVES, { useValue: common_1.COMMON_DIRECTIVES, multi: true }),
    new di_1.Provider(core_1.ExceptionHandler, { useFactory: _exceptionHandler, deps: [] }),
    new di_1.Provider(dom_tokens_1.DOCUMENT, { useFactory: _document, deps: [] }),
    new di_1.Provider(event_manager_1.EVENT_MANAGER_PLUGINS, { useClass: dom_events_1.DomEventsPlugin, multi: true }),
    new di_1.Provider(event_manager_1.EVENT_MANAGER_PLUGINS, { useClass: key_events_1.KeyEventsPlugin, multi: true }),
    new di_1.Provider(event_manager_1.EVENT_MANAGER_PLUGINS, { useClass: hammer_gestures_1.HammerGesturesPlugin, multi: true }),
    new di_1.Provider(hammer_gestures_1.HAMMER_GESTURE_CONFIG, { useClass: hammer_gestures_1.HammerGestureConfig }),
    new di_1.Provider(dom_renderer_1.DomRootRenderer, { useClass: dom_renderer_1.DomRootRenderer_ }),
    new di_1.Provider(core_1.RootRenderer, { useExisting: dom_renderer_1.DomRootRenderer }),
    new di_1.Provider(shared_styles_host_1.SharedStylesHost, { useExisting: shared_styles_host_1.DomSharedStylesHost }),
    shared_styles_host_1.DomSharedStylesHost,
    testability_1.Testability,
    browser_details_1.BrowserDetails,
    animation_builder_1.AnimationBuilder,
    event_manager_1.EventManager,
    common_dom_1.ELEMENT_PROBE_PROVIDERS
]);
exports.CACHED_TEMPLATE_PROVIDER = lang_1.CONST_EXPR([new di_1.Provider(xhr_1.XHR, { useClass: xhr_cache_1.CachedXHR })]);
function initDomAdapter() {
    browser_adapter_1.BrowserDomAdapter.makeCurrent();
    wtf_init_1.wtfInit();
    testability_2.BrowserGetTestability.init();
}
exports.initDomAdapter = initDomAdapter;
//# sourceMappingURL=browser_common.js.map