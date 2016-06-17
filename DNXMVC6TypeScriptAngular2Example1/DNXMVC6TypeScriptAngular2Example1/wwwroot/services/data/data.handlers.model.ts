/* Model for storing data handlers */
export class DataHandlersModel {
    public handlers: Array<DataHandlerModel> = [];

    constructor() {
        this.addApplicationHandlers();
    }

    public addApplicationHandlers() {
        this.handlers.push({ identifier: DataHandlerIdentifier.GetConfig, url: "/Application/GetConfig" });
    }
}

/* DataHandler identifiers */
export enum DataHandlerIdentifier {
    GetConfig
}

/* DataHandler */
export class DataHandlerModel implements IDataHandler {
    public identifier: DataHandlerIdentifier;
    public url: string;
}

export interface IDataHandler {
    identifier: DataHandlerIdentifier;
    url: string;
}

