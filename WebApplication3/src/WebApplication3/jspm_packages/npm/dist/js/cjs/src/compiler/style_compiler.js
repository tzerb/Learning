"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var compile_metadata_1 = require('./compile_metadata');
var o = require('./output/output_ast');
var view_1 = require('angular2/src/core/metadata/view');
var shadow_css_1 = require('angular2/src/compiler/shadow_css');
var url_resolver_1 = require('angular2/src/compiler/url_resolver');
var style_url_resolver_1 = require('./style_url_resolver');
var di_1 = require('angular2/src/core/di');
var lang_1 = require('angular2/src/facade/lang');
var COMPONENT_VARIABLE = '%COMP%';
var HOST_ATTR = "_nghost-" + COMPONENT_VARIABLE;
var CONTENT_ATTR = "_ngcontent-" + COMPONENT_VARIABLE;
var StylesCompileDependency = (function () {
    function StylesCompileDependency(sourceUrl, isShimmed, valuePlaceholder) {
        this.sourceUrl = sourceUrl;
        this.isShimmed = isShimmed;
        this.valuePlaceholder = valuePlaceholder;
    }
    return StylesCompileDependency;
}());
exports.StylesCompileDependency = StylesCompileDependency;
var StylesCompileResult = (function () {
    function StylesCompileResult(statements, stylesVar, dependencies) {
        this.statements = statements;
        this.stylesVar = stylesVar;
        this.dependencies = dependencies;
    }
    return StylesCompileResult;
}());
exports.StylesCompileResult = StylesCompileResult;
var StyleCompiler = (function () {
    function StyleCompiler(_urlResolver) {
        this._urlResolver = _urlResolver;
        this._shadowCss = new shadow_css_1.ShadowCss();
    }
    StyleCompiler.prototype.compileComponent = function (comp) {
        var shim = comp.template.encapsulation === view_1.ViewEncapsulation.Emulated;
        return this._compileStyles(getStylesVarName(comp), comp.template.styles, comp.template.styleUrls, shim);
    };
    StyleCompiler.prototype.compileStylesheet = function (stylesheetUrl, cssText, isShimmed) {
        var styleWithImports = style_url_resolver_1.extractStyleUrls(this._urlResolver, stylesheetUrl, cssText);
        return this._compileStyles(getStylesVarName(null), [styleWithImports.style], styleWithImports.styleUrls, isShimmed);
    };
    StyleCompiler.prototype._compileStyles = function (stylesVar, plainStyles, absUrls, shim) {
        var _this = this;
        var styleExpressions = plainStyles.map(function (plainStyle) { return o.literal(_this._shimIfNeeded(plainStyle, shim)); });
        var dependencies = [];
        for (var i = 0; i < absUrls.length; i++) {
            var identifier = new compile_metadata_1.CompileIdentifierMetadata({ name: getStylesVarName(null) });
            dependencies.push(new StylesCompileDependency(absUrls[i], shim, identifier));
            styleExpressions.push(new o.ExternalExpr(identifier));
        }
        // styles variable contains plain strings and arrays of other styles arrays (recursive),
        // so we set its type to dynamic.
        var stmt = o.variable(stylesVar)
            .set(o.literalArr(styleExpressions, new o.ArrayType(o.DYNAMIC_TYPE, [o.TypeModifier.Const])))
            .toDeclStmt(null, [o.StmtModifier.Final]);
        return new StylesCompileResult([stmt], stylesVar, dependencies);
    };
    StyleCompiler.prototype._shimIfNeeded = function (style, shim) {
        return shim ? this._shadowCss.shimCssText(style, CONTENT_ATTR, HOST_ATTR) : style;
    };
    StyleCompiler = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof url_resolver_1.UrlResolver !== 'undefined' && url_resolver_1.UrlResolver) === 'function' && _a) || Object])
    ], StyleCompiler);
    return StyleCompiler;
    var _a;
}());
exports.StyleCompiler = StyleCompiler;
function getStylesVarName(component) {
    var result = "styles";
    if (lang_1.isPresent(component)) {
        result += "_" + component.type.name;
    }
    return result;
}
//# sourceMappingURL=style_compiler.js.map