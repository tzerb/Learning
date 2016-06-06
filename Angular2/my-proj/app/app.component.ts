import {Component, ViewChildren, Pipe, PipeTransform} from 'angular2/core';
import {Tester1} from './app.tester1';

@Pipe({name: 'hp'})
export class HelloPipe implements PipeTransform
{
    transform(value:string, args: any[]){
        return 'HelloPipe ' + value;
    }
}

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    //template: `here
    //`,
    styles: [`
        .active {
            background: green;
        }
        .inactive {
            background: yellow;
        }
    `],
    pipes : [HelloPipe],
    directives: [Tester1],
    providers:[]
})
export class AppComponent { 
    @ViewChildren(Tester1) tester1 : Tester1[];
    isOn:boolean = false;
    bgColor:string="pink";
    helloMsg:string = "Custom Hello Message";
    testArr = [{t:'hello1', n:3.1459, id: 1, dt: new Date()}, {t:'hello2', n:55, id:2, dt: new Date('1/1/2015')}, {t:'hello11', n:55, id: 11, dt: new Date('1/1/2015')}, {t:'hello22', n:55, id:22, dt:'1/1/2015'}];
    mousemoveit(e)
    {
        // alert('here');
        console.log(e);
        if (false && (e.x != undefined))
        {
            this.helloMsg = "IE Chrome (" + e.x + ", " + e.y + ")"; 
        }
        else {
            this.helloMsg = "FireFox (" + e.clientX + ", " + e.clientY + ")";
        } 
    }
    
    clickit() {
        //alert('clickit');
        this.helloMsg = "clicked it"; 
    }
    
    dblclick(e)
    {
        e.preventDefault();
    }
    
    focus(e){
        e.preventDefault();
        console.log('focus');
        this.isOn = !this.isOn;
    }
}

