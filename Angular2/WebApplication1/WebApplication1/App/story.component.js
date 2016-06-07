var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'node_modules/angular2/core'], factory);
    }
})(function (require, exports) {
    "use strict";
    const core_1 = require('node_modules/angular2/core');
    let StoryComponent = class StoryComponent {
        constructor() {
            this.story = { id: 100, name: 'The Force Awakens' };
            this.color = 'blue';
        }
    };
    StoryComponent = __decorate([
        core_1.Component({
            selector: 'my-story',
            template: `
    <h3>{{story.name}}</h3>
    <h3 [innerText]="story.name"></h3>
    <div [style.color]="color">{{story.name}}</div>
  `
        })
    ], StoryComponent);
    exports.StoryComponent = StoryComponent;
});
//# sourceMappingURL=story.component.js.map