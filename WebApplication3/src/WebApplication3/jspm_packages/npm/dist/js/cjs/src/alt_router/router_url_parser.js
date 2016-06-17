"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var segments_1 = require('./segments');
var exceptions_1 = require('angular2/src/facade/exceptions');
var RouterUrlParser = (function () {
    function RouterUrlParser() {
    }
    return RouterUrlParser;
}());
exports.RouterUrlParser = RouterUrlParser;
var DefaultRouterUrlParser = (function (_super) {
    __extends(DefaultRouterUrlParser, _super);
    function DefaultRouterUrlParser() {
        _super.apply(this, arguments);
    }
    DefaultRouterUrlParser.prototype.parse = function (url) {
        if (url.length === 0) {
            throw new exceptions_1.BaseException("Invalid url '" + url + "'");
        }
        return new segments_1.Tree(this._parseNodes(url));
    };
    DefaultRouterUrlParser.prototype._parseNodes = function (url) {
        var index = url.indexOf("/", 1);
        var children;
        var currentUrl;
        if (index > -1) {
            children = this._parseNodes(url.substring(index + 1));
            currentUrl = url.substring(0, index);
        }
        else {
            children = [];
            currentUrl = url;
        }
        return [new segments_1.UrlSegment(currentUrl, {}, "")].concat(children);
    };
    return DefaultRouterUrlParser;
}(RouterUrlParser));
exports.DefaultRouterUrlParser = DefaultRouterUrlParser;
//# sourceMappingURL=router_url_parser.js.map