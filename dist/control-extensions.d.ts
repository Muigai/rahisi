import { A1 } from "rahisi-type-utils";
import * as R from "./jsx";
export declare const CheckBox: (props: {
    onCheckChanged?: A1<boolean> | undefined;
} & R.InputHTMLAttributes<HTMLInputElement>) => any;
export declare const TextBox: (props: R.InputHTMLAttributes<HTMLInputElement>) => JSX.Element;
export declare const textVal: (e: R.KeyboardEvent<HTMLInputElement>) => string;
export declare const doScroll: (o: HTMLElement, element: HTMLElement, to?: number | undefined, duration?: number | undefined) => void;
