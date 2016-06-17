"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('angular2/src/compiler/template_ast'));
var config_1 = require('./config');
exports.CompilerConfig = config_1.CompilerConfig;
exports.RenderTypes = config_1.RenderTypes;
__export(require('./compile_metadata'));
__export(require('./offline_compiler'));
var runtime_compiler_1 = require('./runtime_compiler');
exports.RuntimeCompiler = runtime_compiler_1.RuntimeCompiler;
__export(require('angular2/src/compiler/url_resolver'));
__export(require('angular2/src/compiler/xhr'));
var view_resolver_1 = require('./view_resolver');
exports.ViewResolver = view_resolver_1.ViewResolver;
var directive_resolver_1 = require('./directive_resolver');
exports.DirectiveResolver = directive_resolver_1.DirectiveResolver;
var pipe_resolver_1 = require('./pipe_resolver');
exports.PipeResolver = pipe_resolver_1.PipeResolver;
var lang_1 = require('angular2/src/facade/lang');
var di_1 = require('angular2/src/core/di');
var template_parser_1 = require('angular2/src/compiler/template_parser');
var html_parser_1 = require('angular2/src/compiler/html_parser');
var directive_normalizer_1 = require('angular2/src/compiler/directive_normalizer');
var runtime_metadata_1 = require('angular2/src/compiler/runtime_metadata');
var style_compiler_1 = require('angular2/src/compiler/style_compiler');
var view_compiler_1 = require('angular2/src/compiler/view_compiler/view_compiler');
var config_2 = require('./config');
var component_resolver_1 = require('angular2/src/core/linker/component_resolver');
var runtime_compiler_2 = require('angular2/src/compiler/runtime_compiler');
var element_schema_registry_1 = require('angular2/src/compiler/schema/element_schema_registry');
var dom_element_schema_registry_1 = require('angular2/src/compiler/schema/dom_element_schema_registry');
var url_resolver_2 = require('angular2/src/compiler/url_resolver');
var parser_1 = require('./expression_parser/parser');
var lexer_1 = require('./expression_parser/lexer');
var view_resolver_2 = require('./view_resolver');
var directive_resolver_2 = require('./directive_resolver');
var pipe_resolver_2 = require('./pipe_resolver');
function _createCompilerConfig() {
    return new config_2.CompilerConfig(lang_1.assertionsEnabled(), false, true);
}
/**
 * A set of providers that provide `RuntimeCompiler` and its dependencies to use for
 * template compilation.
 */
exports.COMPILER_PROVIDERS = lang_1.CONST_EXPR([
    lexer_1.Lexer,
    parser_1.Parser,
    html_parser_1.HtmlParser,
    template_parser_1.TemplateParser,
    directive_normalizer_1.DirectiveNormalizer,
    runtime_metadata_1.RuntimeMetadataResolver,
    url_resolver_2.DEFAULT_PACKAGE_URL_PROVIDER,
    style_compiler_1.StyleCompiler,
    view_compiler_1.ViewCompiler,
    new di_1.Provider(config_2.CompilerConfig, { useFactory: _createCompilerConfig, deps: [] }),
    runtime_compiler_2.RuntimeCompiler,
    new di_1.Provider(component_resolver_1.ComponentResolver, { useExisting: runtime_compiler_2.RuntimeCompiler }),
    dom_element_schema_registry_1.DomElementSchemaRegistry,
    new di_1.Provider(element_schema_registry_1.ElementSchemaRegistry, { useExisting: dom_element_schema_registry_1.DomElementSchemaRegistry }),
    url_resolver_2.UrlResolver,
    view_resolver_2.ViewResolver,
    directive_resolver_2.DirectiveResolver,
    pipe_resolver_2.PipeResolver
]);
//# sourceMappingURL=compiler.js.map