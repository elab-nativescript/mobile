import { View } from "ui/core/view";
import { Property } from "ui/core/dependency-observable";
export declare class NumberProgressBar extends View {
    static progressTextSizeProperty: Property;
    static progressTextColorProperty: Property;
    static progressUnreachedBarHeightProperty: Property;
    static progressReachedBarHeightProperty: Property;
    static progressUnreachedColorProperty: Property;
    static progressReachedColorProperty: Property;
    constructor();
    progress_text_size: string;
    progress_text_color: string;
    progress_unreached_bar_height: string;
    progress_reached_bar_height: string;
    progress_unreached_color: string;
    progress_reached_color: string;
    incrementProgressBy(value: any): any;
    getProgress(): any;
    setProgress(value: any): any;
    getProgressMax(): any;
    setProgressMax(value: any): any;
    setProgressTextVisibility(value: any): void;
}
