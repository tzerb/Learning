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
var lang_1 = require('angular2/src/facade/lang');
var exceptions_1 = require('angular2/src/facade/exceptions');
var collection_1 = require('angular2/src/facade/collection');
var async_1 = require('angular2/src/facade/async');
var compile_metadata_1 = require('./compile_metadata');
var di_1 = require('angular2/src/core/di');
var style_compiler_1 = require('./style_compiler');
var view_compiler_1 = require('./view_compiler/view_compiler');
var template_parser_1 = require('./template_parser');
var directive_normalizer_1 = require('./directive_normalizer');
var runtime_metadata_1 = require('./runtime_metadata');
var component_factory_1 = require('angular2/src/core/linker/component_factory');
var config_1 = require('./config');
var ir = require('./output/output_ast');
var output_jit_1 = require('./output/output_jit');
var output_interpreter_1 = require('./output/output_interpreter');
var interpretive_view_1 = require('./output/interpretive_view');
var xhr_1 = require('angular2/src/compiler/xhr');
/**
 * An internal module of the Angular compiler that begins with component types,
 * extracts templates, and eventually produces a compiled version of the component
 * ready for linking into an application.
 */
var RuntimeCompiler = (function () {
    function RuntimeCompiler(_runtimeMetadataResolver, _templateNormalizer, _templateParser, _styleCompiler, _viewCompiler, _xhr, _genConfig) {
        this._runtimeMetadataResolver = _runtimeMetadataResolver;
        this._templateNormalizer = _templateNormalizer;
        this._templateParser = _templateParser;
        this._styleCompiler = _styleCompiler;
        this._viewCompiler = _viewCompiler;
        this._xhr = _xhr;
        this._genConfig = _genConfig;
        this._styleCache = new Map();
        this._hostCacheKeys = new Map();
        this._compiledTemplateCache = new Map();
        this._compiledTemplateDone = new Map();
    }
    RuntimeCompiler.prototype.resolveComponent = function (componentType) {
        var compMeta = this._runtimeMetadataResolver.getDirectiveMetadata(componentType);
        var hostCacheKey = this._hostCacheKeys.get(componentType);
        if (lang_1.isBlank(hostCacheKey)) {
            hostCacheKey = new Object();
            this._hostCacheKeys.set(componentType, hostCacheKey);
            assertComponent(compMeta);
            var hostMeta = compile_metadata_1.createHostComponentMeta(compMeta.type, compMeta.selector);
            this._loadAndCompileComponent(hostCacheKey, hostMeta, [compMeta], [], []);
        }
        return this._compiledTemplateDone.get(hostCacheKey)
            .then(function (compiledTemplate) { return new component_factory_1.ComponentFactory(compMeta.selector, compiledTemplate.viewFactory, componentType); });
    };
    RuntimeCompiler.prototype.clearCache = function () {
        this._styleCache.clear();
        this._compiledTemplateCache.clear();
        this._compiledTemplateDone.clear();
        this._hostCacheKeys.clear();
    };
    RuntimeCompiler.prototype._loadAndCompileComponent = function (cacheKey, compMeta, viewDirectives, pipes, compilingComponentsPath) {
        var _this = this;
        var compiledTemplate = this._compiledTemplateCache.get(cacheKey);
        var done = this._compiledTemplateDone.get(cacheKey);
        if (lang_1.isBlank(compiledTemplate)) {
            compiledTemplate = new CompiledTemplate();
            this._compiledTemplateCache.set(cacheKey, compiledTemplate);
            done =
                async_1.PromiseWrapper.all([this._compileComponentStyles(compMeta)].concat(viewDirectives.map(function (dirMeta) { return _this._templateNormalizer.normalizeDirective(dirMeta); })))
                    .then(function (stylesAndNormalizedViewDirMetas) {
                    var normalizedViewDirMetas = stylesAndNormalizedViewDirMetas.slice(1);
                    var styles = stylesAndNormalizedViewDirMetas[0];
                    var parsedTemplate = _this._templateParser.parse(compMeta, compMeta.template.template, normalizedViewDirMetas, pipes, compMeta.type.name);
                    var childPromises = [];
                    compiledTemplate.init(_this._compileComponent(compMeta, parsedTemplate, styles, pipes, compilingComponentsPath, childPromises));
                    return async_1.PromiseWrapper.all(childPromises).then(function (_) { return compiledTemplate; });
                });
            this._compiledTemplateDone.set(cacheKey, done);
        }
        return compiledTemplate;
    };
    RuntimeCompiler.prototype._compileComponent = function (compMeta, parsedTemplate, styles, pipes, compilingComponentsPath, childPromises) {
        var _this = this;
        var compileResult = this._viewCompiler.compileComponent(compMeta, parsedTemplate, new ir.ExternalExpr(new compile_metadata_1.CompileIdentifierMetadata({ runtime: styles })), pipes);
        compileResult.dependencies.forEach(function (dep) {
            var childCompilingComponentsPath = collection_1.ListWrapper.clone(compilingComponentsPath);
            var childCacheKey = dep.comp.type.runtime;
            var childViewDirectives = _this._runtimeMetadataResolver.getViewDirectivesMetadata(dep.comp.type.runtime);
            var childViewPipes = _this._runtimeMetadataResolver.getViewPipesMetadata(dep.comp.type.runtime);
            var childIsRecursive = collection_1.ListWrapper.contains(childCompilingComponentsPath, childCacheKey);
            childCompilingComponentsPath.push(childCacheKey);
            var childComp = _this._loadAndCompileComponent(dep.comp.type.runtime, dep.comp, childViewDirectives, childViewPipes, childCompilingComponentsPath);
            dep.factoryPlaceholder.runtime = childComp.proxyViewFactory;
            dep.factoryPlaceholder.name = "viewFactory_" + dep.comp.type.name;
            if (!childIsRecursive) {
                // Only wait for a child if it is not a cycle
                childPromises.push(_this._compiledTemplateDone.get(childCacheKey));
            }
        });
        var factory;
        if (lang_1.IS_DART || !this._genConfig.useJit) {
            factory = output_interpreter_1.interpretStatements(compileResult.statements, compileResult.viewFactoryVar, new interpretive_view_1.InterpretiveAppViewInstanceFactory());
        }
        else {
            factory = output_jit_1.jitStatements(compMeta.type.name + ".template.js", compileResult.statements, compileResult.viewFactoryVar);
        }
        return factory;
    };
    RuntimeCompiler.prototype._compileComponentStyles = function (compMeta) {
        var compileResult = this._styleCompiler.compileComponent(compMeta);
        return this._resolveStylesCompileResult(compMeta.type.name, compileResult);
    };
    RuntimeCompiler.prototype._resolveStylesCompileResult = function (sourceUrl, result) {
        var _this = this;
        var promises = result.dependencies.map(function (dep) { return _this._loadStylesheetDep(dep); });
        return async_1.PromiseWrapper.all(promises)
            .then(function (cssTexts) {
            var nestedCompileResultPromises = [];
            for (var i = 0; i < result.dependencies.length; i++) {
                var dep = result.dependencies[i];
                var cssText = cssTexts[i];
                var nestedCompileResult = _this._styleCompiler.compileStylesheet(dep.sourceUrl, cssText, dep.isShimmed);
                nestedCompileResultPromises.push(_this._resolveStylesCompileResult(dep.sourceUrl, nestedCompileResult));
            }
            return async_1.PromiseWrapper.all(nestedCompileResultPromises);
        })
            .then(function (nestedStylesArr) {
            for (var i = 0; i < result.dependencies.length; i++) {
                var dep = result.dependencies[i];
                dep.valuePlaceholder.runtime = nestedStylesArr[i];
                dep.valuePlaceholder.name = "importedStyles" + i;
            }
            if (lang_1.IS_DART || !_this._genConfig.useJit) {
                return output_interpreter_1.interpretStatements(result.statements, result.stylesVar, new interpretive_view_1.InterpretiveAppViewInstanceFactory());
            }
            else {
                return output_jit_1.jitStatements(sourceUrl + ".css.js", result.statements, result.stylesVar);
            }
        });
    };
    RuntimeCompiler.prototype._loadStylesheetDep = function (dep) {
        var cacheKey = "" + dep.sourceUrl + (dep.isShimmed ? '.shim' : '');
        var cssTextPromise = this._styleCache.get(cacheKey);
        if (lang_1.isBlank(cssTextPromise)) {
            cssTextPromise = this._xhr.get(dep.sourceUrl);
            this._styleCache.set(cacheKey, cssTextPromise);
        }
        return cssTextPromise;
    };
    RuntimeCompiler = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [runtime_metadata_1.RuntimeMetadataResolver, directive_normalizer_1.DirectiveNormalizer, template_parser_1.TemplateParser, style_compiler_1.StyleCompiler, view_compiler_1.ViewCompiler, (typeof (_a = typeof xhr_1.XHR !== 'undefined' && xhr_1.XHR) === 'function' && _a) || Object, config_1.CompilerConfig])
    ], RuntimeCompiler);
    return RuntimeCompiler;
    var _a;
}());
exports.RuntimeCompiler = RuntimeCompiler;
var CompiledTemplate = (function () {
    function CompiledTemplate() {
        var _this = this;
        this.viewFactory = null;
        this.proxyViewFactory = function (viewUtils, childInjector, contextEl) {
            return _this.viewFactory(viewUtils, childInjector, contextEl);
        };
    }
    CompiledTemplate.prototype.init = function (viewFactory) { this.viewFactory = viewFactory; };
    return CompiledTemplate;
}());
function assertComponent(meta) {
    if (!meta.isComponent) {
        throw new exceptions_1.BaseException("Could not compile '" + meta.type.name + "' because it is not a component.");
    }
}
//# sourceMappingURL=runtime_compiler.js.map