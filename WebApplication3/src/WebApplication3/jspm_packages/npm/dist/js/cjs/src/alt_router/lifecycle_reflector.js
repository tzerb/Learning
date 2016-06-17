"use strict";
var lang_1 = require('angular2/src/facade/lang');
function hasLifecycleHook(name, obj) {
    var type = obj.constructor;
    if (!(type instanceof lang_1.Type))
        return false;
    return name in type.prototype;
}
exports.hasLifecycleHook = hasLifecycleHook;
//# sourceMappingURL=lifecycle_reflector.js.map