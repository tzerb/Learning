/* */ 
"format cjs";
'use strict';"use strict";
var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
var exceptions_1 = require('angular2/src/facade/exceptions');
var validators_1 = require('../validators');
var default_value_accessor_1 = require('./default_value_accessor');
var number_value_accessor_1 = require('./number_value_accessor');
var checkbox_value_accessor_1 = require('./checkbox_value_accessor');
var select_control_value_accessor_1 = require('./select_control_value_accessor');
var radio_control_value_accessor_1 = require('./radio_control_value_accessor');
var normalize_validator_1 = require('./normalize_validator');
function controlPath(name, parent) {
    var p = collection_1.ListWrapper.clone(parent.path);
    p.push(name);
    return p;
}
exports.controlPath = controlPath;
function setUpControl(control, dir) {
    if (lang_1.isBlank(control))
        _throwError(dir, "Cannot find control");
    if (lang_1.isBlank(dir.valueAccessor))
        _throwError(dir, "No value accessor for");
    control.validator = validators_1.Validators.compose([control.validator, dir.validator]);
    control.asyncValidator = validators_1.Validators.composeAsync([control.asyncValidator, dir.asyncValidator]);
    dir.valueAccessor.writeValue(control.value);
    // view -> model
    dir.valueAccessor.registerOnChange(function (newValue) {
        dir.viewToModelUpdate(newValue);
        control.updateValue(newValue, { emitModelToViewChange: false });
        control.markAsDirty();
    });
    // model -> view
    control.registerOnChange(function (newValue) { return dir.valueAccessor.writeValue(newValue); });
    // touched
    dir.valueAccessor.registerOnTouched(function () { return control.markAsTouched(); });
}
exports.setUpControl = setUpControl;
function setUpControlGroup(control, dir) {
    if (lang_1.isBlank(control))
        _throwError(dir, "Cannot find control");
    control.validator = validators_1.Validators.compose([control.validator, dir.validator]);
    control.asyncValidator = validators_1.Validators.composeAsync([control.asyncValidator, dir.asyncValidator]);
}
exports.setUpControlGroup = setUpControlGroup;
function _throwError(dir, message) {
    var path = dir.path.join(" -> ");
    throw new exceptions_1.BaseException(message + " '" + path + "'");
}
function composeValidators(validators) {
    return lang_1.isPresent(validators) ? validators_1.Validators.compose(validators.map(normalize_validator_1.normalizeValidator)) : null;
}
exports.composeValidators = composeValidators;
function composeAsyncValidators(validators) {
    return lang_1.isPresent(validators) ? validators_1.Validators.composeAsync(validators.map(normalize_validator_1.normalizeAsyncValidator)) :
        null;
}
exports.composeAsyncValidators = composeAsyncValidators;
function isPropertyUpdated(changes, viewModel) {
    if (!collection_1.StringMapWrapper.contains(changes, "model"))
        return false;
    var change = changes["model"];
    if (change.isFirstChange())
        return true;
    return !lang_1.looseIdentical(viewModel, change.currentValue);
}
exports.isPropertyUpdated = isPropertyUpdated;
// TODO: vsavkin remove it once https://github.com/angular/angular/issues/3011 is implemented
function selectValueAccessor(dir, valueAccessors) {
    if (lang_1.isBlank(valueAccessors))
        return null;
    var defaultAccessor;
    var builtinAccessor;
    var customAccessor;
    valueAccessors.forEach(function (v) {
        if (lang_1.hasConstructor(v, default_value_accessor_1.DefaultValueAccessor)) {
            defaultAccessor = v;
        }
        else if (lang_1.hasConstructor(v, checkbox_value_accessor_1.CheckboxControlValueAccessor) ||
            lang_1.hasConstructor(v, number_value_accessor_1.NumberValueAccessor) ||
            lang_1.hasConstructor(v, select_control_value_accessor_1.SelectControlValueAccessor) ||
            lang_1.hasConstructor(v, radio_control_value_accessor_1.RadioControlValueAccessor)) {
            if (lang_1.isPresent(builtinAccessor))
                _throwError(dir, "More than one built-in value accessor matches");
            builtinAccessor = v;
        }
        else {
            if (lang_1.isPresent(customAccessor))
                _throwError(dir, "More than one custom value accessor matches");
            customAccessor = v;
        }
    });
    if (lang_1.isPresent(customAccessor))
        return customAccessor;
    if (lang_1.isPresent(builtinAccessor))
        return builtinAccessor;
    if (lang_1.isPresent(defaultAccessor))
        return defaultAccessor;
    _throwError(dir, "No valid value accessor for");
    return null;
}
exports.selectValueAccessor = selectValueAccessor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC1CUkplcjFKOS50bXAvYW5ndWxhcjIvc3JjL2NvbW1vbi9mb3Jtcy9kaXJlY3RpdmVzL3NoYXJlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMkJBQTRDLGdDQUFnQyxDQUFDLENBQUE7QUFDN0UscUJBQWlFLDBCQUEwQixDQUFDLENBQUE7QUFDNUYsMkJBQThDLGdDQUFnQyxDQUFDLENBQUE7QUFPL0UsMkJBQXlCLGVBQWUsQ0FBQyxDQUFBO0FBRXpDLHVDQUFtQywwQkFBMEIsQ0FBQyxDQUFBO0FBQzlELHNDQUFrQyx5QkFBeUIsQ0FBQyxDQUFBO0FBQzVELHdDQUEyQywyQkFBMkIsQ0FBQyxDQUFBO0FBQ3ZFLDhDQUF5QyxpQ0FBaUMsQ0FBQyxDQUFBO0FBQzNFLDZDQUF3QyxnQ0FBZ0MsQ0FBQyxDQUFBO0FBQ3pFLG9DQUEwRCx1QkFBdUIsQ0FBQyxDQUFBO0FBSWxGLHFCQUE0QixJQUFZLEVBQUUsTUFBd0I7SUFDaEUsSUFBSSxDQUFDLEdBQUcsd0JBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDYixNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ1gsQ0FBQztBQUplLG1CQUFXLGNBSTFCLENBQUE7QUFFRCxzQkFBNkIsT0FBZ0IsRUFBRSxHQUFjO0lBQzNELEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUscUJBQXFCLENBQUMsQ0FBQztJQUM5RCxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO0lBRTFFLE9BQU8sQ0FB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LEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLENBQUM7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsY0FBYyxDQUFDO0lBQ3JELEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsZUFBZSxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsZUFBZSxDQUFDO0lBQ3ZELEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsZUFBZSxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsZUFBZSxDQUFDO0lBRXZELFdBQVcsQ0FBQyxHQUFHLEVBQUUsNkJBQTZCLENBQUMsQ0FBQztJQUNoRCxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQWhDZSwyQkFBbUIsc0JBZ0NsQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtMaXN0V3JhcHBlciwgU3RyaW5nTWFwV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7aXNCbGFuaywgaXNQcmVzZW50LCBsb29zZUlkZW50aWNhbCwgaGFzQ29uc3RydWN0b3J9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb24sIFdyYXBwZWRFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5cbmltcG9ydCB7Q29udHJvbENvbnRhaW5lcn0gZnJvbSAnLi9jb250cm9sX2NvbnRhaW5lcic7XG5pbXBvcnQge05nQ29udHJvbH0gZnJvbSAnLi9uZ19jb250cm9sJztcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sRGlyZWN0aXZlfSBmcm9tICcuL2Fic3RyYWN0X2NvbnRyb2xfZGlyZWN0aXZlJztcbmltcG9ydCB7TmdDb250cm9sR3JvdXB9IGZyb20gJy4vbmdfY29udHJvbF9ncm91cCc7XG5pbXBvcnQge0NvbnRyb2wsIENvbnRyb2xHcm91cH0gZnJvbSAnLi4vbW9kZWwnO1xuaW1wb3J0IHtWYWxpZGF0b3JzfSBmcm9tICcuLi92YWxpZGF0b3JzJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJy4vY29udHJvbF92YWx1ZV9hY2Nlc3Nvcic7XG5pbXBvcnQge0RlZmF1bHRWYWx1ZUFjY2Vzc29yfSBmcm9tICcuL2RlZmF1bHRfdmFsdWVfYWNjZXNzb3InO1xuaW1wb3J0IHtOdW1iZXJWYWx1ZUFjY2Vzc29yfSBmcm9tICcuL251bWJlcl92YWx1ZV9hY2Nlc3Nvcic7XG5pbXBvcnQge0NoZWNrYm94Q29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJy4vY2hlY2tib3hfdmFsdWVfYWNjZXNzb3InO1xuaW1wb3J0IHtTZWxlY3RDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnLi9zZWxlY3RfY29udHJvbF92YWx1ZV9hY2Nlc3Nvcic7XG5pbXBvcnQge1JhZGlvQ29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJy4vcmFkaW9fY29udHJvbF92YWx1ZV9hY2Nlc3Nvcic7XG5pbXBvcnQge25vcm1hbGl6ZVZhbGlkYXRvciwgbm9ybWFsaXplQXN5bmNWYWxpZGF0b3J9IGZyb20gJy4vbm9ybWFsaXplX3ZhbGlkYXRvcic7XG5pbXBvcnQge1ZhbGlkYXRvckZuLCBBc3luY1ZhbGlkYXRvckZufSBmcm9tICcuL3ZhbGlkYXRvcnMnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBjb250cm9sUGF0aChuYW1lOiBzdHJpbmcsIHBhcmVudDogQ29udHJvbENvbnRhaW5lcik6IHN0cmluZ1tdIHtcbiAgdmFyIHAgPSBMaXN0V3JhcHBlci5jbG9uZShwYXJlbnQucGF0aCk7XG4gIHAucHVzaChuYW1lKTtcbiAgcmV0dXJuIHA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRVcENvbnRyb2woY29udHJvbDogQ29udHJvbCwgZGlyOiBOZ0NvbnRyb2wpOiB2b2lkIHtcbiAgaWYgKGlzQmxhbmsoY29udHJvbCkpIF90aHJvd0Vycm9yKGRpciwgXCJDYW5ub3QgZmluZCBjb250cm9sXCIpO1xuICBpZiAoaXNCbGFuayhkaXIudmFsdWVBY2Nlc3NvcikpIF90aHJvd0Vycm9yKGRpciwgXCJObyB2YWx1ZSBhY2Nlc3NvciBmb3JcIik7XG5cbiAgY29udHJvbC52YWxpZGF0b3IgPSBWYWxpZGF0b3JzLmNvbXBvc2UoW2NvbnRyb2wudmFsaWRhdG9yLCBkaXIudmFsaWRhdG9yXSk7XG4gIGNvbnRyb2wuYXN5bmNWYWxpZGF0b3IgPSBWYWxpZGF0b3JzLmNvbXBvc2VBc3luYyhbY29udHJvbC5hc3luY1ZhbGlkYXRvciwgZGlyLmFzeW5jVmFsaWRhdG9yXSk7XG4gIGRpci52YWx1ZUFjY2Vzc29yLndyaXRlVmFsdWUoY29udHJvbC52YWx1ZSk7XG5cbiAgLy8gdmlldyAtPiBtb2RlbFxuICBkaXIudmFsdWVBY2Nlc3Nvci5yZWdpc3Rlck9uQ2hhbmdlKChuZXdWYWx1ZTogYW55KSA9PiB7XG4gICAgZGlyLnZpZXdUb01vZGVsVXBkYXRlKG5ld1ZhbHVlKTtcbiAgICBjb250cm9sLnVwZGF0ZVZhbHVlKG5ld1ZhbHVlLCB7ZW1pdE1vZGVsVG9WaWV3Q2hhbmdlOiBmYWxzZX0pO1xuICAgIGNvbnRyb2wubWFya0FzRGlydHkoKTtcbiAgfSk7XG5cbiAgLy8gbW9kZWwgLT4gdmlld1xuICBjb250cm9sLnJlZ2lzdGVyT25DaGFuZ2UoKG5ld1ZhbHVlOiBhbnkpID0+IGRpci52YWx1ZUFjY2Vzc29yLndyaXRlVmFsdWUobmV3VmFsdWUpKTtcblxuICAvLyB0b3VjaGVkXG4gIGRpci52YWx1ZUFjY2Vzc29yLnJlZ2lzdGVyT25Ub3VjaGVkKCgpID0+IGNvbnRyb2wubWFya0FzVG91Y2hlZCgpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFVwQ29udHJvbEdyb3VwKGNvbnRyb2w6IENvbnRyb2xHcm91cCwgZGlyOiBOZ0NvbnRyb2xHcm91cCkge1xuICBpZiAoaXNCbGFuayhjb250cm9sKSkgX3Rocm93RXJyb3IoZGlyLCBcIkNhbm5vdCBmaW5kIGNvbnRyb2xcIik7XG4gIGNvbnRyb2wudmFsaWRhdG9yID0gVmFsaWRhdG9ycy5jb21wb3NlKFtjb250cm9sLnZhbGlkYXRvciwgZGlyLnZhbGlkYXRvcl0pO1xuICBjb250cm9sLmFzeW5jVmFsaWRhdG9yID0gVmFsaWRhdG9ycy5jb21wb3NlQXN5bmMoW2NvbnRyb2wuYXN5bmNWYWxpZGF0b3IsIGRpci5hc3luY1ZhbGlkYXRvcl0pO1xufVxuXG5mdW5jdGlvbiBfdGhyb3dFcnJvcihkaXI6IEFic3RyYWN0Q29udHJvbERpcmVjdGl2ZSwgbWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XG4gIHZhciBwYXRoID0gZGlyLnBhdGguam9pbihcIiAtPiBcIik7XG4gIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGAke21lc3NhZ2V9ICcke3BhdGh9J2ApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcG9zZVZhbGlkYXRvcnModmFsaWRhdG9yczogLyogQXJyYXk8VmFsaWRhdG9yfEZ1bmN0aW9uPiAqLyBhbnlbXSk6IFZhbGlkYXRvckZuIHtcbiAgcmV0dXJuIGlzUHJlc2VudCh2YWxpZGF0b3JzKSA/IFZhbGlkYXRvcnMuY29tcG9zZSh2YWxpZGF0b3JzLm1hcChub3JtYWxpemVWYWxpZGF0b3IpKSA6IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wb3NlQXN5bmNWYWxpZGF0b3JzKFxuICAgIHZhbGlkYXRvcnM6IC8qIEFycmF5PFZhbGlkYXRvcnxGdW5jdGlvbj4gKi8gYW55W10pOiBBc3luY1ZhbGlkYXRvckZuIHtcbiAgcmV0dXJuIGlzUHJlc2VudCh2YWxpZGF0b3JzKSA/IFZhbGlkYXRvcnMuY29tcG9zZUFzeW5jKHZhbGlkYXRvcnMubWFwKG5vcm1hbGl6ZUFzeW5jVmFsaWRhdG9yKSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUHJvcGVydHlVcGRhdGVkKGNoYW5nZXM6IHtba2V5OiBzdHJpbmddOiBhbnl9LCB2aWV3TW9kZWw6IGFueSk6IGJvb2xlYW4ge1xuICBpZiAoIVN0cmluZ01hcFdyYXBwZXIuY29udGFpbnMoY2hhbmdlcywgXCJtb2RlbFwiKSkgcmV0dXJuIGZhbHNlO1xuICB2YXIgY2hhbmdlID0gY2hhbmdlc1tcIm1vZGVsXCJdO1xuXG4gIGlmIChjaGFuZ2UuaXNGaXJzdENoYW5nZSgpKSByZXR1cm4gdHJ1ZTtcbiAgcmV0dXJuICFsb29zZUlkZW50aWNhbCh2aWV3TW9kZWwsIGNoYW5nZS5jdXJyZW50VmFsdWUpO1xufVxuXG4vLyBUT0RPOiB2c2F2a2luIHJlbW92ZSBpdCBvbmNlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzMwMTEgaXMgaW1wbGVtZW50ZWRcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3RWYWx1ZUFjY2Vzc29yKGRpcjogTmdDb250cm9sLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVBY2Nlc3NvcnM6IENvbnRyb2xWYWx1ZUFjY2Vzc29yW10pOiBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIGlmIChpc0JsYW5rKHZhbHVlQWNjZXNzb3JzKSkgcmV0dXJuIG51bGw7XG5cbiAgdmFyIGRlZmF1bHRBY2Nlc3NvcjogQ29udHJvbFZhbHVlQWNjZXNzb3I7XG4gIHZhciBidWlsdGluQWNjZXNzb3I6IENvbnRyb2xWYWx1ZUFjY2Vzc29yO1xuICB2YXIgY3VzdG9tQWNjZXNzb3I6IENvbnRyb2xWYWx1ZUFjY2Vzc29yO1xuICB2YWx1ZUFjY2Vzc29ycy5mb3JFYWNoKCh2OiBDb250cm9sVmFsdWVBY2Nlc3NvcikgPT4ge1xuICAgIGlmIChoYXNDb25zdHJ1Y3Rvcih2LCBEZWZhdWx0VmFsdWVBY2Nlc3NvcikpIHtcbiAgICAgIGRlZmF1bHRBY2Nlc3NvciA9IHY7XG5cbiAgICB9IGVsc2UgaWYgKGhhc0NvbnN0cnVjdG9yKHYsIENoZWNrYm94Q29udHJvbFZhbHVlQWNjZXNzb3IpIHx8XG4gICAgICAgICAgICAgICBoYXNDb25zdHJ1Y3Rvcih2LCBOdW1iZXJWYWx1ZUFjY2Vzc29yKSB8fFxuICAgICAgICAgICAgICAgaGFzQ29uc3RydWN0b3IodiwgU2VsZWN0Q29udHJvbFZhbHVlQWNjZXNzb3IpIHx8XG4gICAgICAgICAgICAgICBoYXNDb25zdHJ1Y3Rvcih2LCBSYWRpb0NvbnRyb2xWYWx1ZUFjY2Vzc29yKSkge1xuICAgICAgaWYgKGlzUHJlc2VudChidWlsdGluQWNjZXNzb3IpKVxuICAgICAgICBfdGhyb3dFcnJvcihkaXIsIFwiTW9yZSB0aGFuIG9uZSBidWlsdC1pbiB2YWx1ZSBhY2Nlc3NvciBtYXRjaGVzXCIpO1xuICAgICAgYnVpbHRpbkFjY2Vzc29yID0gdjtcblxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoaXNQcmVzZW50KGN1c3RvbUFjY2Vzc29yKSlcbiAgICAgICAgX3Rocm93RXJyb3IoZGlyLCBcIk1vcmUgdGhhbiBvbmUgY3VzdG9tIHZhbHVlIGFjY2Vzc29yIG1hdGNoZXNcIik7XG4gICAgICBjdXN0b21BY2Nlc3NvciA9IHY7XG4gICAgfVxuICB9KTtcblxuICBpZiAoaXNQcmVzZW50KGN1c3RvbUFjY2Vzc29yKSkgcmV0dXJuIGN1c3RvbUFjY2Vzc29yO1xuICBpZiAoaXNQcmVzZW50KGJ1aWx0aW5BY2Nlc3NvcikpIHJldHVybiBidWlsdGluQWNjZXNzb3I7XG4gIGlmIChpc1ByZXNlbnQoZGVmYXVsdEFjY2Vzc29yKSkgcmV0dXJuIGRlZmF1bHRBY2Nlc3NvcjtcblxuICBfdGhyb3dFcnJvcihkaXIsIFwiTm8gdmFsaWQgdmFsdWUgYWNjZXNzb3IgZm9yXCIpO1xuICByZXR1cm4gbnVsbDtcbn1cbiJdfQ==