import { Directive, Host, Input, OnInit, TemplateRef, ViewContainerRef } from "@angular/core";
import { Observable } from "rxjs/Observable";


import { CtrCompleter, CompleterList } from "./ctr-completer";
import { CompleterData } from "../components/ng2-completer/services/completer-data";
import { CompleterItem } from "../components/ng2-completer/completer-item";
import { MIN_SEARCH_LENGTH, PAUSE } from "../globals";


export class CtrListContext {
    constructor(
        public results: CompleterItem[],
        public searching: boolean,
        public searchInitialized: boolean
    ) { }
}

@Directive({
    selector: "[ctrList]",
})
export class CtrList implements OnInit, CompleterList {
    @Input() public ctrListMinSearchLength = MIN_SEARCH_LENGTH;
    @Input() public ctrListPause = PAUSE;
    @Input() public ctrListAutoMatch = false;

    private _dataService: CompleterData;
    // private results: CompleterItem[] = [];
    private term: string = null;
    // private searching = false;
    private searchTimer: NodeJS.Timer = null;
    private ctx = new CtrListContext([], false, false);

    constructor(
        @Host() private completer: CtrCompleter,
        private templateRef: TemplateRef<CtrListContext>,
        private viewContainer: ViewContainerRef) { }

    public ngOnInit() {
        this.completer.registerList(this);
        this.viewContainer.createEmbeddedView(
            this.templateRef,
            new CtrListContext([], false, false)
        );
    }

    @Input("ctrList")
    set dataService(newService: CompleterData) {
        this._dataService = newService;
        if (this._dataService) {
            this._dataService
                .catch(err => this.handleError(err))
                .subscribe(results => {
                    this.ctx.searchInitialized = true;
                    this.ctx.searching = false;
                    this.ctx.results = results;
                    if (this.ctrListAutoMatch && results.length === 1 && results[0].title && this.term &&
                        results[0].title.toLocaleLowerCase() === this.term.toLocaleLowerCase()) {
                        // Do automatch
                        this.completer.onSelected(results[0]);
                    }
                    this.refreshTemplate();
                });
        }
    }

    public search(term: string) {
        if (this.term != term) {
            // Clear selected value
            this.completer.onSelected(null);
        }
        if (term && term.length >= this.ctrListMinSearchLength && this.term !== term) {
            if (this.searchTimer) {
                clearTimeout(this.searchTimer);
            }
            if (!this.ctx.searching) {
                this.ctx.results = [];
                this.ctx.searching = true;
                this.ctx.searchInitialized = true;
                this.refreshTemplate();
            }

            this.searchTimer = setTimeout(
                () => {
                    this.searchTimerComplete(term);
                },
                this.ctrListPause
            );


        }
    }

    public clear() {
        if (this.searchTimer) {
            clearTimeout(this.searchTimer);
        }
        if (this.dataService) {
            this.dataService.cancel();
        }
        this.ctx.results = [];
        this.ctx.searchInitialized = false;
        this.term = null;
        this.viewContainer.clear();
    }

    private searchTimerComplete(term: string) {
        // Begin the search
        if (!term || term.length < this.ctrListMinSearchLength) {
            this.ctx.searching = false;
            return;
        }
        this.term = term;
        this._dataService.search(term);
    }

    private handleError(error: any) {
        this.ctx.searching = false;
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : "Server error";
        if (console && console.error) {
            console.error(errMsg); // log to console 
        }
        this.refreshTemplate();

        return Observable.throw(errMsg);
    }

    private refreshTemplate() {
        // Recreate the template
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(
            this.templateRef,
            this.ctx
        );
    }

}
