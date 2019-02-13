import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs/Subject";

import { CompleterData, CompleterItem } from "../src/ng2-completer";

export class CustomDataWithDisabled extends Subject<CompleterItem[]> implements CompleterData {
    constructor(private http: HttpClient) {
        super();
    }
    public search(term: string): void {
        this.http.get(`https://mysafeinfo.com/api/data?list=beatlesalbums&format=json&abbreviate=false&case=default&typ=${term},contains`)
            .map(data => {
                let matches = (<Array<any>>data)
                    .map((album: any) => this.convertToItem(album))
                    .filter(album => !!album) as CompleterItem[];
                this.next(matches);
            })
            .subscribe();
    }

    public cancel() {
        // Handle cancel
    }

    public convertToItem(data: any): CompleterItem | null {
        if (!data) {
            return null;
        }
        return {
            title: data.Album,
            description: data.Label,
            disabled: data.Label === "Apple"
        } as CompleterItem;
    }
}
