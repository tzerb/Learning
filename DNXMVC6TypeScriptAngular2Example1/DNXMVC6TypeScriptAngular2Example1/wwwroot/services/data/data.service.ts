import {DataHandlersModel, DataHandlerIdentifier, IDataHandler} from './data.handlers.model';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Inject} from 'angular2/core';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/map';

export class DataService {
    private handlers: any;
    private http: Http;

    constructor( @Inject(Http) http) {
        var dataHandlersModel = new DataHandlersModel();

        this.handlers = dataHandlersModel.handlers;
        this.http = http;
    }

    public getData(identifier: DataHandlerIdentifier, observableOrNext: Observer<any> | ((value: any) => void)): void {
        var handler: IDataHandler = null;

        for (var i = 0, length = this.handlers.length; i < length; i++) {
            for (var enumMember in DataHandlerIdentifier) {
                // if (enumMember == identifier) {
                    handler = this.handlers[i];
                    i = length;
                //}
            }
        }

        if (handler !== null) {
            this.http.get(handler.url)
                .map(res => res.json())
                .subscribe(observableOrNext);
        }
    }
}

