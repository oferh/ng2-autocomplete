"use strict";
import { Component } from "@angular/core";

import { CompleterService, CompleterData } from "../src/ngx-completer";

// tslint:disable-next-line: no-var-requires
const template = require("./material-cmp.html");
// tslint:disable-next-line: no-var-requires
const style = require("./material-cmp.css");

@Component({
    // tslint:disable-next-line: component-selector
    selector: "material-cmp",
    template,
    styles: [style]
})
// tslint:disable-next-line: component-class-suffix
export class MaterialCmp {
    public countries = require("./res/data/countries.json");

    public dataService: CompleterData;

    constructor(completerService: CompleterService) {
        this.dataService = completerService.local(this.countries, "name", "name").imageField("flag");
    }

}
