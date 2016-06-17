"use strict";
var compile_metadata_1 = require('./compile_metadata');
var view_1 = require('angular2/src/core/linker/view');
var debug_context_1 = require('angular2/src/core/linker/debug_context');
var view_utils_1 = require('angular2/src/core/linker/view_utils');
var change_detection_1 = require('angular2/src/core/change_detection/change_detection');
var element_1 = require('angular2/src/core/linker/element');
var element_ref_1 = require('angular2/src/core/linker/element_ref');
var view_container_ref_1 = require('angular2/src/core/linker/view_container_ref');
var api_1 = require('angular2/src/core/render/api');
var view_2 = require('angular2/src/core/metadata/view');
var view_type_1 = require('angular2/src/core/linker/view_type');
var linker_1 = require('angular2/src/core/linker');
var injector_1 = require('angular2/src/core/di/injector');
var template_ref_1 = require('angular2/src/core/linker/template_ref');
var util_1 = require('./util');
var APP_VIEW_MODULE_URL = 'asset:angular2/lib/src/core/linker/view' + util_1.MODULE_SUFFIX;
var VIEW_UTILS_MODULE_URL = 'asset:angular2/lib/src/core/linker/view_utils' + util_1.MODULE_SUFFIX;
var CD_MODULE_URL = 'asset:angular2/lib/src/core/change_detection/change_detection' + util_1.MODULE_SUFFIX;
// Reassign the imports to different variables so we can
// define static variables with the name of the import.
// (only needed for Dart).
var impViewUtils = view_utils_1.ViewUtils;
var impAppView = view_1.AppView;
var impDebugContext = debug_context_1.DebugContext;
var impAppElement = element_1.AppElement;
var impElementRef = element_ref_1.ElementRef;
var impViewContainerRef = view_container_ref_1.ViewContainerRef;
var impChangeDetectorRef = change_detection_1.ChangeDetectorRef;
var impRenderComponentType = api_1.RenderComponentType;
var impQueryList = linker_1.QueryList;
var impTemplateRef = template_ref_1.TemplateRef;
var impTemplateRef_ = template_ref_1.TemplateRef_;
var impValueUnwrapper = change_detection_1.ValueUnwrapper;
var impInjector = injector_1.Injector;
var impViewEncapsulation = view_2.ViewEncapsulation;
var impViewType = view_type_1.ViewType;
var impChangeDetectionStrategy = change_detection_1.ChangeDetectionStrategy;
var impStaticNodeDebugInfo = debug_context_1.StaticNodeDebugInfo;
var impRenderer = api_1.Renderer;
var impSimpleChange = change_detection_1.SimpleChange;
var impUninitialized = change_detection_1.uninitialized;
var impChangeDetectorState = change_detection_1.ChangeDetectorState;
var impFlattenNestedViewRenderNodes = view_utils_1.flattenNestedViewRenderNodes;
var impDevModeEqual = change_detection_1.devModeEqual;
var impInterpolate = view_utils_1.interpolate;
var impCheckBinding = view_utils_1.checkBinding;
var impCastByValue = view_utils_1.castByValue;
var Identifiers = (function () {
    function Identifiers() {
    }
    Identifiers.ViewUtils = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'ViewUtils',
        moduleUrl: 'asset:angular2/lib/src/core/linker/view_utils' + util_1.MODULE_SUFFIX,
        runtime: impViewUtils
    });
    Identifiers.AppView = new compile_metadata_1.CompileIdentifierMetadata({ name: 'AppView', moduleUrl: APP_VIEW_MODULE_URL, runtime: impAppView });
    Identifiers.AppElement = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'AppElement',
        moduleUrl: 'asset:angular2/lib/src/core/linker/element' + util_1.MODULE_SUFFIX,
        runtime: impAppElement
    });
    Identifiers.ElementRef = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'ElementRef',
        moduleUrl: 'asset:angular2/lib/src/core/linker/element_ref' + util_1.MODULE_SUFFIX,
        runtime: impElementRef
    });
    Identifiers.ViewContainerRef = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'ViewContainerRef',
        moduleUrl: 'asset:angular2/lib/src/core/linker/view_container_ref' + util_1.MODULE_SUFFIX,
        runtime: impViewContainerRef
    });
    Identifiers.ChangeDetectorRef = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'ChangeDetectorRef',
        moduleUrl: 'asset:angular2/lib/src/core/change_detection/change_detector_ref' + util_1.MODULE_SUFFIX,
        runtime: impChangeDetectorRef
    });
    Identifiers.RenderComponentType = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'RenderComponentType',
        moduleUrl: 'asset:angular2/lib/src/core/render/api' + util_1.MODULE_SUFFIX,
        runtime: impRenderComponentType
    });
    Identifiers.QueryList = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'QueryList',
        moduleUrl: 'asset:angular2/lib/src/core/linker/query_list' + util_1.MODULE_SUFFIX,
        runtime: impQueryList
    });
    Identifiers.TemplateRef = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'TemplateRef',
        moduleUrl: 'asset:angular2/lib/src/core/linker/template_ref' + util_1.MODULE_SUFFIX,
        runtime: impTemplateRef
    });
    Identifiers.TemplateRef_ = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'TemplateRef_',
        moduleUrl: 'asset:angular2/lib/src/core/linker/template_ref' + util_1.MODULE_SUFFIX,
        runtime: impTemplateRef_
    });
    Identifiers.ValueUnwrapper = new compile_metadata_1.CompileIdentifierMetadata({ name: 'ValueUnwrapper', moduleUrl: CD_MODULE_URL, runtime: impValueUnwrapper });
    Identifiers.Injector = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'Injector',
        moduleUrl: "asset:angular2/lib/src/core/di/injector" + util_1.MODULE_SUFFIX,
        runtime: impInjector
    });
    Identifiers.ViewEncapsulation = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'ViewEncapsulation',
        moduleUrl: 'asset:angular2/lib/src/core/metadata/view' + util_1.MODULE_SUFFIX,
        runtime: impViewEncapsulation
    });
    Identifiers.ViewType = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'ViewType',
        moduleUrl: "asset:angular2/lib/src/core/linker/view_type" + util_1.MODULE_SUFFIX,
        runtime: impViewType
    });
    Identifiers.ChangeDetectionStrategy = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'ChangeDetectionStrategy',
        moduleUrl: CD_MODULE_URL,
        runtime: impChangeDetectionStrategy
    });
    Identifiers.StaticNodeDebugInfo = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'StaticNodeDebugInfo',
        moduleUrl: "asset:angular2/lib/src/core/linker/debug_context" + util_1.MODULE_SUFFIX,
        runtime: impStaticNodeDebugInfo
    });
    Identifiers.DebugContext = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'DebugContext',
        moduleUrl: "asset:angular2/lib/src/core/linker/debug_context" + util_1.MODULE_SUFFIX,
        runtime: impDebugContext
    });
    Identifiers.Renderer = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'Renderer',
        moduleUrl: 'asset:angular2/lib/src/core/render/api' + util_1.MODULE_SUFFIX,
        runtime: impRenderer
    });
    Identifiers.SimpleChange = new compile_metadata_1.CompileIdentifierMetadata({ name: 'SimpleChange', moduleUrl: CD_MODULE_URL, runtime: impSimpleChange });
    Identifiers.uninitialized = new compile_metadata_1.CompileIdentifierMetadata({ name: 'uninitialized', moduleUrl: CD_MODULE_URL, runtime: impUninitialized });
    Identifiers.ChangeDetectorState = new compile_metadata_1.CompileIdentifierMetadata({ name: 'ChangeDetectorState', moduleUrl: CD_MODULE_URL, runtime: impChangeDetectorState });
    Identifiers.checkBinding = new compile_metadata_1.CompileIdentifierMetadata({ name: 'checkBinding', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: impCheckBinding });
    Identifiers.flattenNestedViewRenderNodes = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'flattenNestedViewRenderNodes',
        moduleUrl: VIEW_UTILS_MODULE_URL,
        runtime: impFlattenNestedViewRenderNodes
    });
    Identifiers.devModeEqual = new compile_metadata_1.CompileIdentifierMetadata({ name: 'devModeEqual', moduleUrl: CD_MODULE_URL, runtime: impDevModeEqual });
    Identifiers.interpolate = new compile_metadata_1.CompileIdentifierMetadata({ name: 'interpolate', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: impInterpolate });
    Identifiers.castByValue = new compile_metadata_1.CompileIdentifierMetadata({ name: 'castByValue', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: impCastByValue });
    Identifiers.pureProxies = [
        null,
        new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy1', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: view_utils_1.pureProxy1 }),
        new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy2', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: view_utils_1.pureProxy2 }),
        new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy3', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: view_utils_1.pureProxy3 }),
        new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy4', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: view_utils_1.pureProxy4 }),
        new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy5', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: view_utils_1.pureProxy5 }),
        new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy6', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: view_utils_1.pureProxy6 }),
        new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy7', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: view_utils_1.pureProxy7 }),
        new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy8', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: view_utils_1.pureProxy8 }),
        new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy9', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: view_utils_1.pureProxy9 }),
        new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy10', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: view_utils_1.pureProxy10 }),
    ];
    return Identifiers;
}());
exports.Identifiers = Identifiers;
function identifierToken(identifier) {
    return new compile_metadata_1.CompileTokenMetadata({ identifier: identifier });
}
exports.identifierToken = identifierToken;
//# sourceMappingURL=identifiers.js.map