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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var di_1 = require('angular2/src/core/di');
var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var exceptions_1 = require('angular2/src/facade/exceptions');
var reflective_exceptions_1 = require('angular2/src/core/di/reflective_exceptions');
var cpl = require('./compile_metadata');
var md = require('angular2/src/core/metadata/directives');
var dimd = require('angular2/src/core/metadata/di');
var directive_resolver_1 = require('./directive_resolver');
var pipe_resolver_1 = require('./pipe_resolver');
var view_resolver_1 = require('./view_resolver');
var directive_lifecycle_reflector_1 = require('./directive_lifecycle_reflector');
var lifecycle_hooks_1 = require('angular2/src/core/metadata/lifecycle_hooks');
var reflection_1 = require('angular2/src/core/reflection/reflection');
var di_2 = require('angular2/src/core/di');
var platform_directives_and_pipes_1 = require('angular2/src/core/platform_directives_and_pipes');
var util_1 = require('./util');
var assertions_1 = require('./assertions');
var url_resolver_1 = require('angular2/src/compiler/url_resolver');
var provider_1 = require('angular2/src/core/di/provider');
var reflective_provider_1 = require('angular2/src/core/di/reflective_provider');
var metadata_1 = require('angular2/src/core/di/metadata');
var reflector_reader_1 = require('angular2/src/core/reflection/reflector_reader');
var RuntimeMetadataResolver = (function () {
    function RuntimeMetadataResolver(_directiveResolver, _pipeResolver, _viewResolver, _platformDirectives, _platformPipes, _reflector) {
        this._directiveResolver = _directiveResolver;
        this._pipeResolver = _pipeResolver;
        this._viewResolver = _viewResolver;
        this._platformDirectives = _platformDirectives;
        this._platformPipes = _platformPipes;
        this._directiveCache = new Map();
        this._pipeCache = new Map();
        this._anonymousTypes = new Map();
        this._anonymousTypeIndex = 0;
        if (lang_1.isPresent(_reflector)) {
            this._reflector = _reflector;
        }
        else {
            this._reflector = reflection_1.reflector;
        }
    }
    RuntimeMetadataResolver.prototype.sanitizeTokenName = function (token) {
        var identifier = lang_1.stringify(token);
        if (identifier.indexOf('(') >= 0) {
            // case: anonymous functions!
            var found = this._anonymousTypes.get(token);
            if (lang_1.isBlank(found)) {
                this._anonymousTypes.set(token, this._anonymousTypeIndex++);
                found = this._anonymousTypes.get(token);
            }
            identifier = "anonymous_token_" + found + "_";
        }
        return util_1.sanitizeIdentifier(identifier);
    };
    RuntimeMetadataResolver.prototype.getDirectiveMetadata = function (directiveType) {
        var meta = this._directiveCache.get(directiveType);
        if (lang_1.isBlank(meta)) {
            var dirMeta = this._directiveResolver.resolve(directiveType);
            var moduleUrl = null;
            var templateMeta = null;
            var changeDetectionStrategy = null;
            var viewProviders = [];
            if (dirMeta instanceof md.ComponentMetadata) {
                assertions_1.assertArrayOfStrings('styles', dirMeta.styles);
                var cmpMeta = dirMeta;
                moduleUrl = calcModuleUrl(this._reflector, directiveType, cmpMeta);
                var viewMeta = this._viewResolver.resolve(directiveType);
                assertions_1.assertArrayOfStrings('styles', viewMeta.styles);
                templateMeta = new cpl.CompileTemplateMetadata({
                    encapsulation: viewMeta.encapsulation,
                    template: viewMeta.template,
                    templateUrl: viewMeta.templateUrl,
                    styles: viewMeta.styles,
                    styleUrls: viewMeta.styleUrls
                });
                changeDetectionStrategy = cmpMeta.changeDetection;
                if (lang_1.isPresent(dirMeta.viewProviders)) {
                    viewProviders = this.getProvidersMetadata(dirMeta.viewProviders);
                }
            }
            var providers = [];
            if (lang_1.isPresent(dirMeta.providers)) {
                providers = this.getProvidersMetadata(dirMeta.providers);
            }
            var queries = [];
            var viewQueries = [];
            if (lang_1.isPresent(dirMeta.queries)) {
                queries = this.getQueriesMetadata(dirMeta.queries, false);
                viewQueries = this.getQueriesMetadata(dirMeta.queries, true);
            }
            meta = cpl.CompileDirectiveMetadata.create({
                selector: dirMeta.selector,
                exportAs: dirMeta.exportAs,
                isComponent: lang_1.isPresent(templateMeta),
                type: this.getTypeMetadata(directiveType, moduleUrl),
                template: templateMeta,
                changeDetection: changeDetectionStrategy,
                inputs: dirMeta.inputs,
                outputs: dirMeta.outputs,
                host: dirMeta.host,
                lifecycleHooks: lifecycle_hooks_1.LIFECYCLE_HOOKS_VALUES.filter(function (hook) { return directive_lifecycle_reflector_1.hasLifecycleHook(hook, directiveType); }),
                providers: providers,
                viewProviders: viewProviders,
                queries: queries,
                viewQueries: viewQueries
            });
            this._directiveCache.set(directiveType, meta);
        }
        return meta;
    };
    RuntimeMetadataResolver.prototype.getTypeMetadata = function (type, moduleUrl) {
        return new cpl.CompileTypeMetadata({
            name: this.sanitizeTokenName(type),
            moduleUrl: moduleUrl,
            runtime: type,
            diDeps: this.getDependenciesMetadata(type, null)
        });
    };
    RuntimeMetadataResolver.prototype.getFactoryMetadata = function (factory, moduleUrl) {
        return new cpl.CompileFactoryMetadata({
            name: this.sanitizeTokenName(factory),
            moduleUrl: moduleUrl,
            runtime: factory,
            diDeps: this.getDependenciesMetadata(factory, null)
        });
    };
    RuntimeMetadataResolver.prototype.getPipeMetadata = function (pipeType) {
        var meta = this._pipeCache.get(pipeType);
        if (lang_1.isBlank(meta)) {
            var pipeMeta = this._pipeResolver.resolve(pipeType);
            var moduleUrl = this._reflector.importUri(pipeType);
            meta = new cpl.CompilePipeMetadata({
                type: this.getTypeMetadata(pipeType, moduleUrl),
                name: pipeMeta.name,
                pure: pipeMeta.pure,
                lifecycleHooks: lifecycle_hooks_1.LIFECYCLE_HOOKS_VALUES.filter(function (hook) { return directive_lifecycle_reflector_1.hasLifecycleHook(hook, pipeType); }),
            });
            this._pipeCache.set(pipeType, meta);
        }
        return meta;
    };
    RuntimeMetadataResolver.prototype.getViewDirectivesMetadata = function (component) {
        var _this = this;
        var view = this._viewResolver.resolve(component);
        var directives = flattenDirectives(view, this._platformDirectives);
        for (var i = 0; i < directives.length; i++) {
            if (!isValidType(directives[i])) {
                throw new exceptions_1.BaseException("Unexpected directive value '" + lang_1.stringify(directives[i]) + "' on the View of component '" + lang_1.stringify(component) + "'");
            }
        }
        return directives.map(function (type) { return _this.getDirectiveMetadata(type); });
    };
    RuntimeMetadataResolver.prototype.getViewPipesMetadata = function (component) {
        var _this = this;
        var view = this._viewResolver.resolve(component);
        var pipes = flattenPipes(view, this._platformPipes);
        for (var i = 0; i < pipes.length; i++) {
            if (!isValidType(pipes[i])) {
                throw new exceptions_1.BaseException("Unexpected piped value '" + lang_1.stringify(pipes[i]) + "' on the View of component '" + lang_1.stringify(component) + "'");
            }
        }
        return pipes.map(function (type) { return _this.getPipeMetadata(type); });
    };
    RuntimeMetadataResolver.prototype.getDependenciesMetadata = function (typeOrFunc, dependencies) {
        var _this = this;
        var deps;
        try {
            deps = reflective_provider_1.constructDependencies(typeOrFunc, dependencies);
        }
        catch (e) {
            if (e instanceof reflective_exceptions_1.NoAnnotationError) {
                deps = [];
            }
            else {
                throw e;
            }
        }
        return deps.map(function (dep) {
            var compileToken;
            var p = dep.properties.find(function (p) { return p instanceof dimd.AttributeMetadata; });
            var isAttribute = false;
            if (lang_1.isPresent(p)) {
                compileToken = _this.getTokenMetadata(p.attributeName);
                isAttribute = true;
            }
            else {
                compileToken = _this.getTokenMetadata(dep.key.token);
            }
            var compileQuery = null;
            var q = dep.properties.find(function (p) { return p instanceof dimd.QueryMetadata; });
            if (lang_1.isPresent(q)) {
                compileQuery = _this.getQueryMetadata(q, null);
            }
            return new cpl.CompileDiDependencyMetadata({
                isAttribute: isAttribute,
                isHost: dep.upperBoundVisibility instanceof metadata_1.HostMetadata,
                isSelf: dep.upperBoundVisibility instanceof metadata_1.SelfMetadata,
                isSkipSelf: dep.lowerBoundVisibility instanceof metadata_1.SkipSelfMetadata,
                isOptional: dep.optional,
                query: lang_1.isPresent(q) && !q.isViewQuery ? compileQuery : null,
                viewQuery: lang_1.isPresent(q) && q.isViewQuery ? compileQuery : null,
                token: compileToken
            });
        });
    };
    RuntimeMetadataResolver.prototype.getTokenMetadata = function (token) {
        token = di_1.resolveForwardRef(token);
        var compileToken;
        if (lang_1.isString(token)) {
            compileToken = new cpl.CompileTokenMetadata({ value: token });
        }
        else {
            compileToken = new cpl.CompileTokenMetadata({
                identifier: new cpl.CompileIdentifierMetadata({ runtime: token, name: this.sanitizeTokenName(token) })
            });
        }
        return compileToken;
    };
    RuntimeMetadataResolver.prototype.getProvidersMetadata = function (providers) {
        var _this = this;
        return providers.map(function (provider) {
            provider = di_1.resolveForwardRef(provider);
            if (lang_1.isArray(provider)) {
                return _this.getProvidersMetadata(provider);
            }
            else if (provider instanceof provider_1.Provider) {
                return _this.getProviderMetadata(provider);
            }
            else {
                return _this.getTypeMetadata(provider, null);
            }
        });
    };
    RuntimeMetadataResolver.prototype.getProviderMetadata = function (provider) {
        var compileDeps;
        if (lang_1.isPresent(provider.useClass)) {
            compileDeps = this.getDependenciesMetadata(provider.useClass, provider.dependencies);
        }
        else if (lang_1.isPresent(provider.useFactory)) {
            compileDeps = this.getDependenciesMetadata(provider.useFactory, provider.dependencies);
        }
        return new cpl.CompileProviderMetadata({
            token: this.getTokenMetadata(provider.token),
            useClass: lang_1.isPresent(provider.useClass) ? this.getTypeMetadata(provider.useClass, null) : null,
            useValue: lang_1.isPresent(provider.useValue) ?
                new cpl.CompileIdentifierMetadata({ runtime: provider.useValue }) :
                null,
            useFactory: lang_1.isPresent(provider.useFactory) ?
                this.getFactoryMetadata(provider.useFactory, null) :
                null,
            useExisting: lang_1.isPresent(provider.useExisting) ? this.getTokenMetadata(provider.useExisting) :
                null,
            deps: compileDeps,
            multi: provider.multi
        });
    };
    RuntimeMetadataResolver.prototype.getQueriesMetadata = function (queries, isViewQuery) {
        var _this = this;
        var compileQueries = [];
        collection_1.StringMapWrapper.forEach(queries, function (query, propertyName) {
            if (query.isViewQuery === isViewQuery) {
                compileQueries.push(_this.getQueryMetadata(query, propertyName));
            }
        });
        return compileQueries;
    };
    RuntimeMetadataResolver.prototype.getQueryMetadata = function (q, propertyName) {
        var _this = this;
        var selectors;
        if (q.isVarBindingQuery) {
            selectors = q.varBindings.map(function (varName) { return _this.getTokenMetadata(varName); });
        }
        else {
            selectors = [this.getTokenMetadata(q.selector)];
        }
        return new cpl.CompileQueryMetadata({
            selectors: selectors,
            first: q.first,
            descendants: q.descendants,
            propertyName: propertyName,
            read: lang_1.isPresent(q.read) ? this.getTokenMetadata(q.read) : null
        });
    };
    RuntimeMetadataResolver = __decorate([
        di_2.Injectable(),
        __param(3, di_2.Optional()),
        __param(3, di_2.Inject(platform_directives_and_pipes_1.PLATFORM_DIRECTIVES)),
        __param(4, di_2.Optional()),
        __param(4, di_2.Inject(platform_directives_and_pipes_1.PLATFORM_PIPES)), 
        __metadata('design:paramtypes', [directive_resolver_1.DirectiveResolver, pipe_resolver_1.PipeResolver, view_resolver_1.ViewResolver, Array, Array, (typeof (_a = typeof reflector_reader_1.ReflectorReader !== 'undefined' && reflector_reader_1.ReflectorReader) === 'function' && _a) || Object])
    ], RuntimeMetadataResolver);
    return RuntimeMetadataResolver;
    var _a;
}());
exports.RuntimeMetadataResolver = RuntimeMetadataResolver;
function flattenDirectives(view, platformDirectives) {
    var directives = [];
    if (lang_1.isPresent(platformDirectives)) {
        flattenArray(platformDirectives, directives);
    }
    if (lang_1.isPresent(view.directives)) {
        flattenArray(view.directives, directives);
    }
    return directives;
}
function flattenPipes(view, platformPipes) {
    var pipes = [];
    if (lang_1.isPresent(platformPipes)) {
        flattenArray(platformPipes, pipes);
    }
    if (lang_1.isPresent(view.pipes)) {
        flattenArray(view.pipes, pipes);
    }
    return pipes;
}
function flattenArray(tree, out) {
    for (var i = 0; i < tree.length; i++) {
        var item = di_1.resolveForwardRef(tree[i]);
        if (lang_1.isArray(item)) {
            flattenArray(item, out);
        }
        else {
            out.push(item);
        }
    }
}
function isValidType(value) {
    return lang_1.isPresent(value) && (value instanceof lang_1.Type);
}
function calcModuleUrl(reflector, type, cmpMetadata) {
    var moduleId = cmpMetadata.moduleId;
    if (lang_1.isPresent(moduleId)) {
        var scheme = url_resolver_1.getUrlScheme(moduleId);
        return lang_1.isPresent(scheme) && scheme.length > 0 ? moduleId :
            "package:" + moduleId + util_1.MODULE_SUFFIX;
    }
    else {
        return reflector.importUri(type);
    }
}
//# sourceMappingURL=runtime_metadata.js.map