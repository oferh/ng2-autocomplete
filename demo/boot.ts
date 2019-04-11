"use strict";
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { Observable } from 'rxjs';
import { setup, track, printSubscribers } from 'observable-profiler';

import { AppModule } from './app-module';

if ("production" === ENV) {
    // Production
    enableProdMode();
}

setup(Observable);
platformBrowserDynamic().bootstrapModule(AppModule).then((ref) => {
    track();
    (window as any).stopProfiler = () => {
        ref.destroy();
        const subscribers = track(false);
        printSubscribers({
            subscribers,
        });
    };
});
