"use strict";
import { Component } from "@angular/core";

import { CompleterService, CompleterData } from "../src/ngx-completer";

@Component({
    // tslint:disable-next-line: component-selector
    selector: "material-cmp",
    templateUrl: "./material-cmp.html",
    styleUrls: ["./material-cmp.css"]
})
// tslint:disable-next-line: component-class-suffix
export class MaterialCmp {
    public countries = require("./res/data/countries.json");

    public dataService: CompleterData;

    constructor(completerService: CompleterService) {
        this.dataService = completerService.local(this.countries, "name", "name").imageField("flag");
    }

}
