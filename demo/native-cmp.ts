"use strict";
import { Component, ViewChild } from "@angular/core";

import { Observable } from "rxjs/Observable";

import { CompleterCmp, CompleterData, CompleterService, CompleterItem, RemoteData } from "../src";
import { CustomData } from "./custom-data";
import { Http } from "@angular/http";

let template = require("./native-cmp.html");
let style = require("./native-cmp.css");

@Component({
    selector: "native-cmp",
    template: template,
    styles: [style]
})
export class NativeCmp {
    public countries = require("./res/data/countries.json");
    public colors = require("./res/data/colors.json");
    public quotes = [
        {
            qt: "Always forgive your enemies; nothing annoys them so much.",
            nm: "Friedrich Nietzsche"
        },
        {
            qt: "Analyzing humor is like dissecting a frog. Few people are interested and the frog dies of it.",
            nm: "E.B. White"
        },
        {
            qt: "Humor is perhaps a sense of intellectual perspective: an awareness that some things are really important, others not; and that the two kinds are most oddly jumbled in everyday affairs.",
            nm: "Voltaire"
        },
        {
            qt: "I think the next best thing to solving a problem is finding some humor in it.",
            nm: "Frank Howard Clark"
        },
        {
            qt: "Life is tough, and if you have the ability to laugh at it you have the ability to enjoy it.",
            nm: "Salma Hayek"
        },
        {
            qt: "Never be afraid to laugh at yourself. After all, you could be missing out on the joke of the century.",
            nm: "Benjamin Franklin"
        },
        {
            qt: "That is the saving grace of humor. If you fail no one is laughing at you.",
            nm: "William Arthur Ward"
        },
        {
            qt: "The best jokes are dangerous, and dangerous because they are in some way truthful.",
            nm: "Kurt Vonnegut"
        },
        {
            qt: "There’s so much comedy on television. Does that cause comedy in the streets?",
            nm: "Henry Ford"
        },
        {
            qt: "You are not angry with people when you laugh at them. Humor teaches tolerance.",
            nm: "W. Somerset Maugham"
        }
    ];
    public seinfeldEpisode: any;
    public color2: string = "lig";
    public dataService: CompleterData;
    public dataService2: CompleterData;
    public countryName2 = "";
    public countryName3 = "";
    public quote: string | undefined = "";
    public dataRemote: CompleterData;
    public dataRemote2: RemoteData;
    public dataService3: CompleterData;
    public dataService4: CompleterData;
    public customData: CustomData;
    public isOpen: boolean = false;

    @ViewChild("openCloseExample") private openCloseExample: CompleterCmp;
    @ViewChild("remoteDataExample") private remoteDataExample: CompleterCmp;

    constructor(completerService: CompleterService, http: Http) {
        this.dataService = completerService.local(this.countries, "name", "name").imageField("flag");
        this.dataService2 = completerService.local(this.quotes, "nm", "nm").descriptionField("qt");
        this.dataRemote = completerService.remote(
            "https://raw.githubusercontent.com/oferh/ng2-completer/master/demo/res/data/countries.json?",
            "name",
            "name");
        this.dataRemote2 = completerService.remote(
            null,
            "title",
            "title");
        this.dataRemote2.urlFormater(term => {
            return `https://api.themoviedb.org/3/search/movie?api_key=36bf560f8967672b5e428038340f0065&language=en-US&query=${term}&page=1&include_adult=false`;
        });
        this.dataRemote2.dataField("results");
        // For async local the source can also be HTTP request
        // let source = http.get("https://raw.githubusercontent.com/oferh/ng2-completer/master/demo/res/data/countries.json?").map((res: any) => res.json());
        let source = Observable.from([this.countries]).delay(3000);
        this.dataService3 = completerService.local(<Observable<any[]>>source, "name", "name");
        this.customData = new CustomData(http);
        this.dataService4 = completerService.local(this.colors, null, null);
    }

    public onCountrySelected(selected: CompleterItem) {
        if (selected) {
            this.countryName2 = selected.title;
            this.remoteDataExample.blur();
        } else {
            this.countryName2 = "";
        }
    }

    public onQuoteSelected(selected: CompleterItem) {
        if (selected) {
            this.quote = selected.description;
        } else {
            this.quote = "";
        }
    }

    public onOpened(isOpen: boolean) {
        this.isOpen = isOpen;
    }

    public onToggle() {
        if (this.isOpen) {
            this.openCloseExample.close();
        } else {
            this.openCloseExample.open();
            this.openCloseExample.focus();
        }
    }

    public onFocus() {
        this.openCloseExample.focus();
    }
}
