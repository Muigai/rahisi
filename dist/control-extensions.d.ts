import { A1 } from "rahisi-type-utils";
import * as R from "./jsx";
export declare const CheckBox: (props: {
    onCheckChanged?: A1<boolean> | undefined;
} & R.InputHTMLAttributes<HTMLInputElement>) => any;
export declare const TextBox: (props: {
    onTextChanged?: A1<string> | undefined;
} & R.InputHTMLAttributes<HTMLInputElement>) => any;
export declare const doScroll: (o: HTMLElement, element: HTMLElement, to?: number | undefined, duration?: number | undefined) => void;
