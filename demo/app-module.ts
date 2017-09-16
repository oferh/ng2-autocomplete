import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { MdInputModule, MdListModule } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { CollapseModule } from "ng2-bootstrap/collapse";

import { AppComponent } from "./app-cmp";
import { MaterialCmp } from "./material-cmp";
import { NativeCmp } from "./native-cmp";
import { routing } from "./app.routing";
import { Ng2CompleterModule } from "../src";
import { CompleterCmpMd } from "./completer-cmp-md";


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    Ng2CompleterModule,
    MdInputModule,
    MdListModule,
    FormsModule,
    HttpModule,
    routing,
    CollapseModule
  ],
  declarations: [AppComponent, CompleterCmpMd, NativeCmp, MaterialCmp],
  bootstrap: [AppComponent]
})
export class AppModule { }
