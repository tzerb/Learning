"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var lang_1 = require('angular2/src/facade/lang');
var async_1 = require('angular2/src/facade/async');
var core_1 = require('angular2/core');
var worker_render_1 = require('angular2/src/platform/worker_render');
var worker_render_common_1 = require('angular2/src/platform/worker_render_common');
var client_message_broker_1 = require('../src/web_workers/shared/client_message_broker');
exports.ClientMessageBroker = client_message_broker_1.ClientMessageBroker;
exports.ClientMessageBrokerFactory = client_message_broker_1.ClientMessageBrokerFactory;
exports.FnArg = client_message_broker_1.FnArg;
exports.UiArguments = client_message_broker_1.UiArguments;
var service_message_broker_1 = require('../src/web_workers/shared/service_message_broker');
exports.ReceivedMessage = service_message_broker_1.ReceivedMessage;
exports.ServiceMessageBroker = service_message_broker_1.ServiceMessageBroker;
exports.ServiceMessageBrokerFactory = service_message_broker_1.ServiceMessageBrokerFactory;
var serializer_1 = require('../src/web_workers/shared/serializer');
exports.PRIMITIVE = serializer_1.PRIMITIVE;
__export(require('../src/web_workers/shared/message_bus'));
/**
 * @deprecated Use WORKER_RENDER_APPLICATION
 */
exports.WORKER_RENDER_APP = worker_render_1.WORKER_RENDER_APPLICATION;
function workerRenderPlatform() {
    if (lang_1.isBlank(core_1.getPlatform())) {
        core_1.createPlatform(core_1.ReflectiveInjector.resolveAndCreate(worker_render_common_1.WORKER_RENDER_PLATFORM));
    }
    return core_1.assertPlatform(worker_render_common_1.WORKER_RENDER_PLATFORM_MARKER);
}
exports.workerRenderPlatform = workerRenderPlatform;
function bootstrapRender(workerScriptUri, customProviders) {
    var pf = core_1.ReflectiveInjector.resolveAndCreate(worker_render_common_1.WORKER_RENDER_PLATFORM);
    var app = core_1.ReflectiveInjector.resolveAndCreate([
        worker_render_1.WORKER_RENDER_APPLICATION,
        new core_1.Provider(worker_render_common_1.WORKER_SCRIPT, { useValue: workerScriptUri }),
        lang_1.isPresent(customProviders) ? customProviders : []
    ], workerRenderPlatform().injector);
    // Return a promise so that we keep the same semantics as Dart,
    // and we might want to wait for the app side to come up
    // in the future...
    return async_1.PromiseWrapper.resolve(app.get(core_1.ApplicationRef));
}
exports.bootstrapRender = bootstrapRender;
//# sourceMappingURL=worker_render.js.map