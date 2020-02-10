import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

import { CompleterData, CompleterItem } from "../src/ngx-completer";

export class CustomData extends Subject<CompleterItem[]> implements CompleterData {
    constructor(private http: HttpClient) {
        super();
    }
    public search(term: string): void {
        this.http.get("http://mysafeinfo.com/api/data?list=seinfeldepisodes&format=json&nm=" + term + ",contains")
            .pipe(
                map((data: any) => {
                    const matches = (data)
                        .map((episode: any) => this.convertToItem(episode))
                        .filter((episode: CompleterItem | null) => !!episode) as CompleterItem[];
                    this.next(matches);
                })
            )
            .subscribe();
    }

    public cancel() {
        // Handle cancel
    }

    public convertToItem(data: any): CompleterItem | null {
        if (!data) {
            return null;
        }
        // data will be string if an initial value is set
        return {
            title: typeof data === "string" ? data : data.nm
        } as CompleterItem;
    }
}
