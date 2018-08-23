import { Attribute, Renderable } from "./index";
import { AllHTMLAttributes } from "./jsx";
import { F2 } from "rahisi-type-utils";
export declare class React {
    static createElement: (tagName: string | F2<Attribute[], Renderable[], Renderable>, attributes: AllHTMLAttributes<Element> | null, ...children: any[]) => Renderable;
    static getAttributes: <T = Element>(attributes: AllHTMLAttributes<T> | null) => Attribute[];
    static getChildren: (children: any[]) => Renderable[];
    private static appendChild;
}
