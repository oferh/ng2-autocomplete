"use strict";
import { Component } from "@angular/core";

let template = require("./app-cmp.html");

@Component({
    selector: "demo-app",
    template: template
})
export class AppComponent {
    public isCollapsed = false;
}
