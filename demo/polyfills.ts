import "core-js/es/reflect";
import "core-js/proposals/reflect-metadata";
import "zone.js/dist/zone";
if (process.env.ENV === "production") {
    // Production
} else {
    // Development
    Error.stackTraceLimit = Infinity;
    // tslint:disable-next-line: no-var-requires
    require("zone.js/dist/long-stack-trace-zone");
}
