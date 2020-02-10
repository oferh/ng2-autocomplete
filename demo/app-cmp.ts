"use strict";
import { Component } from "@angular/core";

// tslint:disable-next-line: no-var-requires
const template = require("./app-cmp.html");

@Component({
    // tslint:disable-next-line: component-selector
    selector: "demo-app",
    template
})
export class AppComponent {
    public isCollapsed = false;
}
