import common = require("./number-progressbar.common");
export declare class NumberProgressBar extends common.NumberProgressBar {
    private _android;
    readonly android: any;
    readonly _nativeView: any;
    _createUI(): void;
    incrementProgressBy(value: any): void;
    getProgress(): any;
    setProgress(value: any): void;
    getProgressMax(): any;
    setProgressMax(value: any): void;
}
