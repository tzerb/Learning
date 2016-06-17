"use strict";
var lang_1 = require('angular2/src/facade/lang');
var compile_metadata_1 = require('../compile_metadata');
var change_detection_1 = require('angular2/src/core/change_detection/change_detection');
var view_1 = require('angular2/src/core/metadata/view');
var view_type_1 = require('angular2/src/core/linker/view_type');
var o = require('../output/output_ast');
var identifiers_1 = require('../identifiers');
function _enumExpression(classIdentifier, value) {
    if (lang_1.isBlank(value))
        return o.NULL_EXPR;
    var name = lang_1.resolveEnumToken(classIdentifier.runtime, value);
    return o.importExpr(new compile_metadata_1.CompileIdentifierMetadata({
        name: classIdentifier.name + "." + name,
        moduleUrl: classIdentifier.moduleUrl,
        runtime: value
    }));
}
var ViewTypeEnum = (function () {
    function ViewTypeEnum() {
    }
    ViewTypeEnum.fromValue = function (value) {
        return _enumExpression(identifiers_1.Identifiers.ViewType, value);
    };
    ViewTypeEnum.HOST = ViewTypeEnum.fromValue(view_type_1.ViewType.HOST);
    ViewTypeEnum.COMPONENT = ViewTypeEnum.fromValue(view_type_1.ViewType.COMPONENT);
    ViewTypeEnum.EMBEDDED = ViewTypeEnum.fromValue(view_type_1.ViewType.EMBEDDED);
    return ViewTypeEnum;
}());
exports.ViewTypeEnum = ViewTypeEnum;
var ViewEncapsulationEnum = (function () {
    function ViewEncapsulationEnum() {
    }
    ViewEncapsulationEnum.fromValue = function (value) {
        return _enumExpression(identifiers_1.Identifiers.ViewEncapsulation, value);
    };
    ViewEncapsulationEnum.Emulated = ViewEncapsulationEnum.fromValue(view_1.ViewEncapsulation.Emulated);
    ViewEncapsulationEnum.Native = ViewEncapsulationEnum.fromValue(view_1.ViewEncapsulation.Native);
    ViewEncapsulationEnum.None = ViewEncapsulationEnum.fromValue(view_1.ViewEncapsulation.None);
    return ViewEncapsulationEnum;
}());
exports.ViewEncapsulationEnum = ViewEncapsulationEnum;
var ChangeDetectorStateEnum = (function () {
    function ChangeDetectorStateEnum() {
    }
    ChangeDetectorStateEnum.fromValue = function (value) {
        return _enumExpression(identifiers_1.Identifiers.ChangeDetectorState, value);
    };
    ChangeDetectorStateEnum.NeverChecked = ChangeDetectorStateEnum.fromValue(change_detection_1.ChangeDetectorState.NeverChecked);
    ChangeDetectorStateEnum.CheckedBefore = ChangeDetectorStateEnum.fromValue(change_detection_1.ChangeDetectorState.CheckedBefore);
    ChangeDetectorStateEnum.Errored = ChangeDetectorStateEnum.fromValue(change_detection_1.ChangeDetectorState.Errored);
    return ChangeDetectorStateEnum;
}());
exports.ChangeDetectorStateEnum = ChangeDetectorStateEnum;
var ChangeDetectionStrategyEnum = (function () {
    function ChangeDetectionStrategyEnum() {
    }
    ChangeDetectionStrategyEnum.fromValue = function (value) {
        return _enumExpression(identifiers_1.Identifiers.ChangeDetectionStrategy, value);
    };
    ChangeDetectionStrategyEnum.CheckOnce = ChangeDetectionStrategyEnum.fromValue(change_detection_1.ChangeDetectionStrategy.CheckOnce);
    ChangeDetectionStrategyEnum.Checked = ChangeDetectionStrategyEnum.fromValue(change_detection_1.ChangeDetectionStrategy.Checked);
    ChangeDetectionStrategyEnum.CheckAlways = ChangeDetectionStrategyEnum.fromValue(change_detection_1.ChangeDetectionStrategy.CheckAlways);
    ChangeDetectionStrategyEnum.Detached = ChangeDetectionStrategyEnum.fromValue(change_detection_1.ChangeDetectionStrategy.Detached);
    ChangeDetectionStrategyEnum.OnPush = ChangeDetectionStrategyEnum.fromValue(change_detection_1.ChangeDetectionStrategy.OnPush);
    ChangeDetectionStrategyEnum.Default = ChangeDetectionStrategyEnum.fromValue(change_detection_1.ChangeDetectionStrategy.Default);
    return ChangeDetectionStrategyEnum;
}());
exports.ChangeDetectionStrategyEnum = ChangeDetectionStrategyEnum;
var ViewConstructorVars = (function () {
    function ViewConstructorVars() {
    }
    ViewConstructorVars.viewUtils = o.variable('viewUtils');
    ViewConstructorVars.parentInjector = o.variable('parentInjector');
    ViewConstructorVars.declarationEl = o.variable('declarationEl');
    return ViewConstructorVars;
}());
exports.ViewConstructorVars = ViewConstructorVars;
var ViewProperties = (function () {
    function ViewProperties() {
    }
    ViewProperties.renderer = o.THIS_EXPR.prop('renderer');
    ViewProperties.projectableNodes = o.THIS_EXPR.prop('projectableNodes');
    ViewProperties.viewUtils = o.THIS_EXPR.prop('viewUtils');
    return ViewProperties;
}());
exports.ViewProperties = ViewProperties;
var EventHandlerVars = (function () {
    function EventHandlerVars() {
    }
    EventHandlerVars.event = o.variable('$event');
    return EventHandlerVars;
}());
exports.EventHandlerVars = EventHandlerVars;
var InjectMethodVars = (function () {
    function InjectMethodVars() {
    }
    InjectMethodVars.token = o.variable('token');
    InjectMethodVars.requestNodeIndex = o.variable('requestNodeIndex');
    InjectMethodVars.notFoundResult = o.variable('notFoundResult');
    return InjectMethodVars;
}());
exports.InjectMethodVars = InjectMethodVars;
var DetectChangesVars = (function () {
    function DetectChangesVars() {
    }
    DetectChangesVars.throwOnChange = o.variable("throwOnChange");
    DetectChangesVars.changes = o.variable("changes");
    DetectChangesVars.changed = o.variable("changed");
    DetectChangesVars.valUnwrapper = o.variable("valUnwrapper");
    return DetectChangesVars;
}());
exports.DetectChangesVars = DetectChangesVars;
//# sourceMappingURL=constants.js.map