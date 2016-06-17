"use strict";
/* Model for storing data handlers */
var DataHandlersModel = (function () {
    function DataHandlersModel() {
        this.handlers = [];
        this.addApplicationHandlers();
    }
    DataHandlersModel.prototype.addApplicationHandlers = function () {
        this.handlers.push({ identifier: DataHandlerIdentifier.GetConfig, url: "/Application/GetConfig" });
    };
    return DataHandlersModel;
}());
exports.DataHandlersModel = DataHandlersModel;
/* DataHandler identifiers */
(function (DataHandlerIdentifier) {
    DataHandlerIdentifier[DataHandlerIdentifier["GetConfig"] = 0] = "GetConfig";
})(exports.DataHandlerIdentifier || (exports.DataHandlerIdentifier = {}));
var DataHandlerIdentifier = exports.DataHandlerIdentifier;
/* DataHandler */
var DataHandlerModel = (function () {
    function DataHandlerModel() {
    }
    return DataHandlerModel;
}());
exports.DataHandlerModel = DataHandlerModel;
//# sourceMappingURL=data.handlers.model.js.map