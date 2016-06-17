import {bootstrap} from 'angular2/platform/browser';
import {Component, View, Inject} from 'angular2/core';
import {ConfigModel} from './../shared/config.model';
import {DataHandlerIdentifier} from './../../services/data/data.handlers.model';
import {DataService} from './../../services/data/data.service';
import {HTTP_PROVIDERS} from 'angular2/http';

@Component({
    moduleId: module.id,
    selector: 'header'
})
@View({
        styleUrls: ['header.css'],
        templateUrl: 'header.html'
})
class HeaderComponent {
    public vm: HeaderComponentViewModel;

    private dataService: DataService;

    constructor( @Inject(DataService) dataService) {
        this.dataService = dataService;

        this.vm = new HeaderComponentViewModel();

        this.getConfig();
    }

    private getConfig(): void {
        this.dataService.getData(DataHandlerIdentifier.GetConfig, response => this.vm.config = response);
    }
}

class HeaderComponentViewModel {
    public config: ConfigModel;

    constructor() {
        this.config = new ConfigModel();
    }
}

bootstrap(HeaderComponent, [HTTP_PROVIDERS, DataService]);