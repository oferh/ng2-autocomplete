"use strict";
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from './app-module';

if ("production" === ENV) {
  // Production
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
