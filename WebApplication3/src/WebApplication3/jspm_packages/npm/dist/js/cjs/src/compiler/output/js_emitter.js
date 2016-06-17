"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lang_1 = require('angular2/src/facade/lang');
var abstract_emitter_1 = require('./abstract_emitter');
var abstract_js_emitter_1 = require('./abstract_js_emitter');
var path_util_1 = require('./path_util');
var JavaScriptEmitter = (function () {
    function JavaScriptEmitter() {
    }
    JavaScriptEmitter.prototype.emitStatements = function (moduleUrl, stmts, exportedVars) {
        var converter = new JsEmitterVisitor(moduleUrl);
        var ctx = abstract_emitter_1.EmitterVisitorContext.createRoot(exportedVars);
        converter.visitAllStatements(stmts, ctx);
        var srcParts = [];
        converter.importsWithPrefixes.forEach(function (prefix, importedModuleUrl) {
            // Note: can't write the real word for import as it screws up system.js auto detection...
            srcParts.push(("var " + prefix + " = req") +
                ("uire('" + path_util_1.getImportModulePath(moduleUrl, importedModuleUrl, path_util_1.ImportEnv.JS) + "');"));
        });
        srcParts.push(ctx.toSource());
        return srcParts.join('\n');
    };
    return JavaScriptEmitter;
}());
exports.JavaScriptEmitter = JavaScriptEmitter;
var JsEmitterVisitor = (function (_super) {
    __extends(JsEmitterVisitor, _super);
    function JsEmitterVisitor(_moduleUrl) {
        _super.call(this);
        this._moduleUrl = _moduleUrl;
        this.importsWithPrefixes = new Map();
    }
    JsEmitterVisitor.prototype.visitExternalExpr = function (ast, ctx) {
        if (lang_1.isPresent(ast.value.moduleUrl) && ast.value.moduleUrl != this._moduleUrl) {
            var prefix = this.importsWithPrefixes.get(ast.value.moduleUrl);
            if (lang_1.isBlank(prefix)) {
                prefix = "import" + this.importsWithPrefixes.size;
                this.importsWithPrefixes.set(ast.value.moduleUrl, prefix);
            }
            ctx.print(prefix + ".");
        }
        ctx.print(ast.value.name);
        return null;
    };
    JsEmitterVisitor.prototype.visitDeclareVarStmt = function (stmt, ctx) {
        _super.prototype.visitDeclareVarStmt.call(this, stmt, ctx);
        if (ctx.isExportedVar(stmt.name)) {
            ctx.println(exportVar(stmt.name));
        }
        return null;
    };
    JsEmitterVisitor.prototype.visitDeclareFunctionStmt = function (stmt, ctx) {
        _super.prototype.visitDeclareFunctionStmt.call(this, stmt, ctx);
        if (ctx.isExportedVar(stmt.name)) {
            ctx.println(exportVar(stmt.name));
        }
        return null;
    };
    JsEmitterVisitor.prototype.visitDeclareClassStmt = function (stmt, ctx) {
        _super.prototype.visitDeclareClassStmt.call(this, stmt, ctx);
        if (ctx.isExportedVar(stmt.name)) {
            ctx.println(exportVar(stmt.name));
        }
        return null;
    };
    return JsEmitterVisitor;
}(abstract_js_emitter_1.AbstractJsEmitterVisitor));
function exportVar(varName) {
    return "Object.defineProperty(exports, '" + varName + "', { get: function() { return " + varName + "; }});";
}
//# sourceMappingURL=js_emitter.js.map