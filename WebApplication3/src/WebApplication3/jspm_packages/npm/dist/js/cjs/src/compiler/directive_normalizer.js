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
var lang_1 = require('angular2/src/facade/lang');
var exceptions_1 = require('angular2/src/facade/exceptions');
var async_1 = require('angular2/src/facade/async');
var xhr_1 = require('angular2/src/compiler/xhr');
var url_resolver_1 = require('angular2/src/compiler/url_resolver');
var style_url_resolver_1 = require('./style_url_resolver');
var di_1 = require('angular2/src/core/di');
var view_1 = require('angular2/src/core/metadata/view');
var html_ast_1 = require('./html_ast');
var html_parser_1 = require('./html_parser');
var template_preparser_1 = require('./template_preparser');
var DirectiveNormalizer = (function () {
    function DirectiveNormalizer(_xhr, _urlResolver, _htmlParser) {
        this._xhr = _xhr;
        this._urlResolver = _urlResolver;
        this._htmlParser = _htmlParser;
    }
    DirectiveNormalizer.prototype.normalizeDirective = function (directive) {
        if (!directive.isComponent) {
            // For non components there is nothing to be normalized yet.
            return async_1.PromiseWrapper.resolve(directive);
        }
        return this.normalizeTemplate(directive.type, directive.template)
            .then(function (normalizedTemplate) { return new compile_metadata_1.CompileDirectiveMetadata({
            type: directive.type,
            isComponent: directive.isComponent,
            selector: directive.selector,
            exportAs: directive.exportAs,
            changeDetection: directive.changeDetection,
            inputs: directive.inputs,
            outputs: directive.outputs,
            hostListeners: directive.hostListeners,
            hostProperties: directive.hostProperties,
            hostAttributes: directive.hostAttributes,
            lifecycleHooks: directive.lifecycleHooks,
            providers: directive.providers,
            viewProviders: directive.viewProviders,
            queries: directive.queries,
            viewQueries: directive.viewQueries,
            template: normalizedTemplate
        }); });
    };
    DirectiveNormalizer.prototype.normalizeTemplate = function (directiveType, template) {
        var _this = this;
        if (lang_1.isPresent(template.template)) {
            return async_1.PromiseWrapper.resolve(this.normalizeLoadedTemplate(directiveType, template, template.template, directiveType.moduleUrl));
        }
        else if (lang_1.isPresent(template.templateUrl)) {
            var sourceAbsUrl = this._urlResolver.resolve(directiveType.moduleUrl, template.templateUrl);
            return this._xhr.get(sourceAbsUrl)
                .then(function (templateContent) { return _this.normalizeLoadedTemplate(directiveType, template, templateContent, sourceAbsUrl); });
        }
        else {
            throw new exceptions_1.BaseException("No template specified for component " + directiveType.name);
        }
    };
    DirectiveNormalizer.prototype.normalizeLoadedTemplate = function (directiveType, templateMeta, template, templateAbsUrl) {
        var _this = this;
        var rootNodesAndErrors = this._htmlParser.parse(template, directiveType.name);
        if (rootNodesAndErrors.errors.length > 0) {
            var errorString = rootNodesAndErrors.errors.join('\n');
            throw new exceptions_1.BaseException("Template parse errors:\n" + errorString);
        }
        var visitor = new TemplatePreparseVisitor();
        html_ast_1.htmlVisitAll(visitor, rootNodesAndErrors.rootNodes);
        var allStyles = templateMeta.styles.concat(visitor.styles);
        var allStyleAbsUrls = visitor.styleUrls.filter(style_url_resolver_1.isStyleUrlResolvable)
            .map(function (url) { return _this._urlResolver.resolve(templateAbsUrl, url); })
            .concat(templateMeta.styleUrls.filter(style_url_resolver_1.isStyleUrlResolvable)
            .map(function (url) { return _this._urlResolver.resolve(directiveType.moduleUrl, url); }));
        var allResolvedStyles = allStyles.map(function (style) {
            var styleWithImports = style_url_resolver_1.extractStyleUrls(_this._urlResolver, templateAbsUrl, style);
            styleWithImports.styleUrls.forEach(function (styleUrl) { return allStyleAbsUrls.push(styleUrl); });
            return styleWithImports.style;
        });
        var encapsulation = templateMeta.encapsulation;
        if (encapsulation === view_1.ViewEncapsulation.Emulated && allResolvedStyles.length === 0 &&
            allStyleAbsUrls.length === 0) {
            encapsulation = view_1.ViewEncapsulation.None;
        }
        return new compile_metadata_1.CompileTemplateMetadata({
            encapsulation: encapsulation,
            template: template,
            templateUrl: templateAbsUrl,
            styles: allResolvedStyles,
            styleUrls: allStyleAbsUrls,
            ngContentSelectors: visitor.ngContentSelectors
        });
    };
    DirectiveNormalizer = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof xhr_1.XHR !== 'undefined' && xhr_1.XHR) === 'function' && _a) || Object, (typeof (_b = typeof url_resolver_1.UrlResolver !== 'undefined' && url_resolver_1.UrlResolver) === 'function' && _b) || Object, html_parser_1.HtmlParser])
    ], DirectiveNormalizer);
    return DirectiveNormalizer;
    var _a, _b;
}());
exports.DirectiveNormalizer = DirectiveNormalizer;
var TemplatePreparseVisitor = (function () {
    function TemplatePreparseVisitor() {
        this.ngContentSelectors = [];
        this.styles = [];
        this.styleUrls = [];
        this.ngNonBindableStackCount = 0;
    }
    TemplatePreparseVisitor.prototype.visitElement = function (ast, context) {
        var preparsedElement = template_preparser_1.preparseElement(ast);
        switch (preparsedElement.type) {
            case template_preparser_1.PreparsedElementType.NG_CONTENT:
                if (this.ngNonBindableStackCount === 0) {
                    this.ngContentSelectors.push(preparsedElement.selectAttr);
                }
                break;
            case template_preparser_1.PreparsedElementType.STYLE:
                var textContent = '';
                ast.children.forEach(function (child) {
                    if (child instanceof html_ast_1.HtmlTextAst) {
                        textContent += child.value;
                    }
                });
                this.styles.push(textContent);
                break;
            case template_preparser_1.PreparsedElementType.STYLESHEET:
                this.styleUrls.push(preparsedElement.hrefAttr);
                break;
            default:
                // DDC reports this as error. See:
                // https://github.com/dart-lang/dev_compiler/issues/428
                break;
        }
        if (preparsedElement.nonBindable) {
            this.ngNonBindableStackCount++;
        }
        html_ast_1.htmlVisitAll(this, ast.children);
        if (preparsedElement.nonBindable) {
            this.ngNonBindableStackCount--;
        }
        return null;
    };
    TemplatePreparseVisitor.prototype.visitComment = function (ast, context) { return null; };
    TemplatePreparseVisitor.prototype.visitAttr = function (ast, context) { return null; };
    TemplatePreparseVisitor.prototype.visitText = function (ast, context) { return null; };
    TemplatePreparseVisitor.prototype.visitExpansion = function (ast, context) { return null; };
    TemplatePreparseVisitor.prototype.visitExpansionCase = function (ast, context) { return null; };
    return TemplatePreparseVisitor;
}());
//# sourceMappingURL=directive_normalizer.js.map