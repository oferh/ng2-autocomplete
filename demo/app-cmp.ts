"use strict";
import { Component } from "@angular/core";

@Component({
    // tslint:disable-next-line: component-selector
    selector: "demo-app",
    templateUrl: "./app-cmp.html"
})
export class AppComponent {
    public isCollapsed = false;
}
