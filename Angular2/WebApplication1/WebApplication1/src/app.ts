//our root app component
import {Component} from 'node_modules/angular2/core'

@Component({
    selector: 'my-app',
    providers: [],
    template: `
    <div>
      here
    </div>
  `,
    directives: []
})
export class App {
    constructor() {
        //this.name = 'Angular2'
    }
}