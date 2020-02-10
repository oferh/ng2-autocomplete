"use strict";
import { Component, Input, Output, EventEmitter, OnInit, ViewChild, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

import { CtrCompleter, CompleterData, CompleterItem } from "../src/ngx-completer";
import { MAX_CHARS, MIN_SEARCH_LENGTH, PAUSE, TEXT_SEARCHING, TEXT_NO_RESULTS } from "../src/globals";




// tslint:disable-next-line: no-empty
const noop = () => { };

const COMPLETER_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line: no-forward-ref
    useExisting: forwardRef(() => CompleterCmpMd),
    multi: true
};


@Component({
    // tslint:disable-next-line: component-selector
    selector: "ngx-completer-md",
    templateUrl: "./completer-cmp-md.html",
    styleUrls: ["./completer-cmp-md.css"],
    providers: [COMPLETER_CONTROL_VALUE_ACCESSOR]
})
// tslint:disable-next-line: component-class-suffix
export class CompleterCmpMd implements OnInit, ControlValueAccessor {
    @Input() public dataService: CompleterData | undefined;
    @Input() public inputName = "";
    @Input() public pause = PAUSE;
    @Input() public minSearchLength = MIN_SEARCH_LENGTH;
    @Input() public maxChars = MAX_CHARS;
    @Input() public overrideSuggested = false;
    @Input() public fillHighlighted = true;
    @Input() public clearSelected = false;
    @Input() public placeholder = "";
    @Input() public matchClass: string | undefined;
    @Input() public textSearching = TEXT_SEARCHING;
    @Input() public textNoResults = TEXT_NO_RESULTS;
    @Input() public fieldTabindex: number | undefined;
    @Input() public autoMatch = false;
    @Input() public disableInput = false;
    @Output() public selected = new EventEmitter<CompleterItem>();
    @Output() public highlighted = new EventEmitter<CompleterItem>();
    @Output() public blur = new EventEmitter<void>();

    public displaySearching = true;
    public searchStr = "";

    @ViewChild(CtrCompleter, { static: false }) private completer: CtrCompleter | undefined;

    private _onTouchedCallback: () => void = noop;
    private _onChangeCallback: (_: any) => void = noop;

    // tslint:disable-next-line: no-empty
    constructor() { }

    get value(): any { return this.searchStr; };

    set value(v: any) {
        if (v !== this.searchStr) {
            this.searchStr = v;
            this._onChangeCallback(v);
        }
    }

    public onTouched() {
        this._onTouchedCallback();
    }

    public writeValue(value: any) {
        this.searchStr = value;
    }

    public registerOnChange(fn: any) {
        this._onChangeCallback = fn;
    }

    public registerOnTouched(fn: any) {
        this._onTouchedCallback = fn;
    }

    public ngOnInit() {
        if (!this.completer) {
            return;
        }

        this.completer.selected.subscribe((item: CompleterItem) => {
            this.selected.emit(item);
            if (item) {
                this._onChangeCallback(item.title);
            }
        });
        this.completer.highlighted.subscribe((item: CompleterItem) => {
            this.highlighted.emit(item);
        });

        if (this.textSearching === "false") {
            this.displaySearching = false;
        }
    }

    public onBlur() {
        this.blur.emit();
        this.onTouched();
    }
}
