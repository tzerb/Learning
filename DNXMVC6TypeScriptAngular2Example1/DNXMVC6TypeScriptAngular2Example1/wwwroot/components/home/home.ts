import {Component, View} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

@Component({
    selector: 'home',
    moduleId: module.id
})
@View({
        templateUrl: 'home.html',
        styleUrls: ['home.css']
})
class HomeComponent {

}
bootstrap(HomeComponent);