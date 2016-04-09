import {Component, Input, Output, ViewChild} from 'angular2/core';
@Component({
    selector: 'tester1',
    template: '<h1 (click)="clickit()">Tester1</h1><h4>{{helloMsg}}</h4>'
})
export class Tester1 { 
    @Input() param1 : string;
    helloMsg:string = "Custom Hello Message";
    ngOnInit(){
        this.helloMsg =this.param1; 
    }    
    clearit()
    {
        this.helloMsg = 'clear';
    }
    clickit(){
        // alert('clickit');
        this.helloMsg = 'here - ' + this.param1;
    }
}