import { Http, Response, Headers } from "@angular/http";
import {Subscription} from "rxjs/Subscription";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";


import {CompleterBaseData} from "./completer-base-data";

export class RemoteData extends CompleterBaseData {
    private _remoteUrl: string;
    private remoteSearch: Subscription;
    private _urlFormater: (term: string) => string = null;
    private _dataField: string = null;
    private _headers: Headers;


    constructor(private http: Http) {
        super();
    }

    public remoteUrl(remoteUrl: string) {
        this._remoteUrl = remoteUrl;
        return this;
    }

    public urlFormater(urlFormater: (term: string) => string) {
        this._urlFormater = urlFormater;
    }

    public dataField(dataField: string) {
        this._dataField = dataField;
    }

    public headers(headers: Headers) {
        this._headers = headers;
    }

    public search(term: string): void {
        this.cancel();
        // let params = {};
        let url = "";
        if (this._urlFormater) {
            url = this._urlFormater(term);
        } else {
            url = this._remoteUrl + encodeURIComponent(term);
        }

        this.remoteSearch = this.http.get(url, { headers: this._headers || new Headers()})
            .map((res: Response) => res.json())
            .map((data: any) => {
                let matchaes = this.extractValue(data, this._dataField);
                // remote data service has already supplied matching items
                // so there is no need to further "extractMatches," here
                //return this.extractMatches(matchaes, term);
                return matchaes;
            })
            .map(
            (matches: any[]) => {
                let results = this.processResults(matches);
                this.next(results);
                return results;
            })
            .catch((err) => {
                this.error(err);
                return null;
            })
            .subscribe();
    }

    public cancel() {
        if (this.remoteSearch) {
            this.remoteSearch.unsubscribe();
        }
    }


}
