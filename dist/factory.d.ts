import { Attribute, Renderable } from "./index";
import { Either, F1, F2 } from "rahisi-type-utils";
declare type K = keyof HTMLElementEventMap;
interface AttributeValue {
    [name: string]: Either<string> | Either<boolean> | F1<HTMLElementEventMap[K], any>;
}
export declare class React {
    static createElement: (tagName: string | F2<Attribute[], Renderable[], Renderable>, attributes: AttributeValue | null, ...children: any[]) => Renderable;
    static getAttributes: (attributes: AttributeValue | null) => Attribute[];
    static getChildren: (children: any[]) => Renderable[];
    private static appendChild;
}
export {};
