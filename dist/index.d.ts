import { A0, A1, Either, F0, F1 } from "rahisi-type-utils";
import { RealEventMap } from "./jsx";
export declare const createRef: () => string;
export interface LifecycleEvent<T = Element> {
    detail: {
        node: T;
    };
}
export declare const mounted = "mounted";
export declare const unmounted = "unmounted";
declare class Notifier {
    private nextId;
    private readonly subscribers;
    start(): void;
    subscribe(onNext: A0, dependency: Node): void;
}
export interface Attribute {
    set(o: HTMLElement | SVGElement, watch: Notifier, isSvg: boolean): void;
}
export interface Renderable {
    mount(parent: HTMLElement | SVGElement | DocumentFragment): HTMLElement | SVGElement | Text;
    render(parent: HTMLElement | SVGElement | DocumentFragment, watch: Notifier, isSvg: boolean): HTMLElement | SVGElement | Text;
}
interface KeyValuePair<K, V> {
    key: K;
    value: V;
}
export declare class VersionedList<T> {
    private items;
    private nextKey;
    constructor(items?: Array<KeyValuePair<number, T>>);
    getItems(): ReadonlyArray<T>;
    getItem(index: number): T;
    count(): number;
    add(item: T): void;
    delete(itemIndex: number): void;
    remove(item: T): void;
    clear(): void;
    indexOf(obj: T, fromIndex?: number): number;
    forEach(action: A1<T>): void;
    filter(filter: F1<T, boolean>): T[];
    setListeners(addListener: A1<Array<KeyValuePair<number, T>>>, removeListener: A1<Array<KeyValuePair<number, T>>>): void;
    private addListener;
    private removeListener;
}
export declare class BaseElement implements Renderable {
    private readonly elementName;
    private readonly attributes;
    private readonly children;
    constructor(elementName: string | undefined, attributes?: Attribute[], children?: Renderable[]);
    mount: (parent: HTMLElement) => HTMLElement | Text | SVGElement;
    render(parent: HTMLElement, watch: Notifier, isSvg: boolean): HTMLElement | SVGElement;
}
export interface ConditionalElement {
    test: F0<boolean>;
    renderable: F0<Renderable>;
}
export declare class ConditionalRenderElement implements Renderable {
    private readonly source;
    private readonly def;
    private currentSource;
    private currentNode;
    private fallback;
    constructor(source: ConditionalElement[], def: F0<Renderable>);
    mount: (parent: HTMLElement) => HTMLElement | Text | SVGElement;
    render(parent: HTMLElement, watch: Notifier, isSvg: boolean): HTMLElement | Text | SVGElement;
}
export declare class TemplateElement<T> implements Renderable {
    private readonly source;
    private readonly template;
    private readonly placeholder;
    private nodes;
    private currentValue;
    constructor(source: Either<VersionedList<T>>, template: F1<T, Renderable>, placeholder: Renderable | null);
    mount(parent: HTMLElement): HTMLElement;
    render(o: HTMLElement, watch: Notifier, isSvg: boolean): HTMLElement;
}
export declare class TextElement implements Renderable {
    private readonly textContent;
    private currentValue;
    constructor(textContent: Either<string>);
    mount: (parent: HTMLElement) => HTMLElement | Text | SVGElement;
    render(parent: HTMLElement, watch: Notifier, _: boolean): Text;
}
export declare class NativeAttribute implements Attribute {
    private readonly attribute;
    private readonly value;
    private static setAttribute;
    private currentValue;
    constructor(attribute: string, value: Either<string>);
    set(o: HTMLElement, watch: Notifier, isSvg: boolean): void;
}
export declare class FocusA implements Attribute {
    private readonly focus;
    private currentValue;
    constructor(focus: Either<boolean>);
    set(o: HTMLElement, watch: Notifier): void;
}
declare type E<T> = keyof RealEventMap<T> | "mounted" | "unmounted";
export declare class OnHandlerA<K extends keyof RealEventMap<T>, T = Element> implements Attribute {
    private readonly eventName;
    private readonly handler;
    static make<T, K extends keyof RealEventMap<T> = "click">(eventName: E<T>, handler: F1<RealEventMap<T>[K], void>): OnHandlerA<K, T>;
    constructor(eventName: E<T>, handler: F1<RealEventMap<T>[K], void>);
    set(o: HTMLElement): void;
}
interface TemplateParams<T> {
    source: VersionedList<T> | (() => VersionedList<T>);
    template: ((t: T) => Renderable);
    placeholder?: Renderable;
}
export declare const Template: <T>(props: TemplateParams<T>) => TemplateElement<T>;
export {};
