"use strict";
import { Component, ViewChild } from "@angular/core";

import { Observable } from "rxjs/Rx";

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

    @ViewChild("openCloseExample") private openCloseExample: CompleterCmp;

    private dataService: CompleterData;
    private dataService2: CompleterData;
    private countryName2 = "";
    private countryNameResponseFormatter = "";
    private quote = "";
    private dataRemote: CompleterData;
    private dataRemote2: RemoteData;
    private dataRemoteResponseFormatter: RemoteData;
    private dataService3: CompleterData;
    private dataService4: CompleterData;
    private customData: CustomData;
    private isOpen: boolean = false;

    constructor(completerService: CompleterService, http: Http) {
        this.dataService = completerService.local(this.countries, "name", "name").imageField("flag");
        this.dataService2 = completerService.local(this.quotes, "nm", "nm").descriptionField("qt");
        this.dataRemote = completerService.remote(
            "https://raw.githubusercontent.com/oferh/ng2-completer/master/demo/res/data/countries.json?",
            "name",
            "name");
        this.dataRemote2 = completerService.remote(
            null,
            null,
            "Title");
        this.dataRemote2.urlFormater(term => {
            return `http://www.omdbapi.com/?s=${term}&type=movie`;
        });
        this.dataRemote2.dataField("Search");
        this.setDataResponseFormatter(completerService);
        // For async local the source can also be HTTP request
        // let source = http.get("https://raw.githubusercontent.com/oferh/ng2-completer/master/demo/res/data/countries.json?").map((res: any) => res.json());
        let source = Observable.from([this.countries]).delay(3000);
        this.dataService3 = completerService.local(<Observable<any[]>>source, "name", "name");
        this.customData = new CustomData(http);
        this.dataService4 = completerService.local(this.colors, null, null);
    }

    private setDataResponseFormatter(completerService: CompleterService){
        this.dataRemoteResponseFormatter = completerService.remote(
            "https://raw.githubusercontent.com/oferh/ng2-completer/master/demo/res/data/countries.json?",
            "name",
            "name");
        this.dataRemoteResponseFormatter.descriptionField("description");
        this.dataRemoteResponseFormatter.responseFormatter(function(data:CompleterItem[]):CompleterItem[]{
            for(let i in data){
                data[i]['description'] = 'code:' + data[i].originalObject.code;
            }
            return data;
        });
    }
    
    public onCountrySelectedResponseFormatter(selected: CompleterItem) {
        if (selected) {
            this.countryNameResponseFormatter = selected.title;
        } else {
            this.countryNameResponseFormatter = "";
        }
    }

    public onCountrySelected(selected: CompleterItem) {
        if (selected) {
            this.countryName2 = selected.title;
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
