import { NgModule, ModuleWithProviders } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { CompleterCmp } from "../components/completer-cmp";
import { CompleterListItemCmp } from "../components/completer-list-item-cmp";
import { LocalDataFactory } from "../services/local-data-factory";
import { RemoteDataFactory } from "../services/remote-data-factory";
import { CompleterService } from "../services/completer-service";

import { CtrCompleter } from "../directives/ctr-completer";
import { CtrDropdown } from "../directives/ctr-dropdown";
import { CtrInput } from "../directives/ctr-input";
import { CtrList } from "../directives/ctr-list";
import { CtrRow } from "../directives/ctr-row";

const providers = [
    CompleterService,
    LocalDataFactory,
    RemoteDataFactory
];

@NgModule({
    declarations: [
        CompleterListItemCmp,
        CtrCompleter,
        CtrDropdown,
        CtrInput,
        CtrList,
        CtrRow,
        CompleterCmp
    ],
    exports: [
        CompleterListItemCmp,
        CtrCompleter,
        CtrDropdown,
        CtrInput,
        CtrList,
        CtrRow,
        CompleterCmp
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    providers
})
export class Ng2CompleterModule {

    public static forRoot(): ModuleWithProviders<Ng2CompleterModule> {
        return {
            ngModule: Ng2CompleterModule,
            providers
        };
    }

    public static forChild(): ModuleWithProviders<Ng2CompleterModule> {
        return {
            ngModule: Ng2CompleterModule,
            providers
        };
    }
}
