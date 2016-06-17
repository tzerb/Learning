/**
 * @module
 * @description
 * Alternative implementation of the router. Experimental.
 */
"use strict";
var router_1 = require('./src/alt_router/router');
exports.Router = router_1.Router;
exports.RouterOutletMap = router_1.RouterOutletMap;
var segments_1 = require('./src/alt_router/segments');
exports.RouteSegment = segments_1.RouteSegment;
var decorators_1 = require('./src/alt_router/metadata/decorators');
exports.Routes = decorators_1.Routes;
var metadata_1 = require('./src/alt_router/metadata/metadata');
exports.Route = metadata_1.Route;
var router_url_parser_1 = require('./src/alt_router/router_url_parser');
exports.RouterUrlParser = router_url_parser_1.RouterUrlParser;
exports.DefaultRouterUrlParser = router_url_parser_1.DefaultRouterUrlParser;
var router_outlet_1 = require('./src/alt_router/directives/router_outlet');
var lang_1 = require('./src/facade/lang');
exports.ROUTER_DIRECTIVES = lang_1.CONST_EXPR([router_outlet_1.RouterOutlet]);
//# sourceMappingURL=alt_router.js.map