import { A0, A1, Either, F0, F1, View } from "rahisi-type-utils";
export declare const createRef: () => string;
export declare const mounted = "mounted";
export declare const unmounted = "unmounted";
declare class Notifier {
    private nextId;
    private readonly subscribers;
    start(): void;
    subscribe(onNext: A0, dependency: Node): void;
}
export interface Attribute {
    set(o: View | SVGElement, watch: Notifier, isSvg: boolean): void;
}
export interface Renderable {
    mount(parent: View | SVGElement | DocumentFragment): View | SVGElement | Text;
    render(parent: View | SVGElement | DocumentFragment, watch: Notifier, isSvg: boolean): View | SVGElement | Text;
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
    mount(parent: View): HTMLElement | SVGElement;
    render(parent: View, watch: Notifier, isSvg: boolean): HTMLElement | SVGElement;
}
export interface ConditionalElement {
    test: F0<boolean>;
    renderable: () => Renderable;
}
export declare class ConditionalRenderElement implements Renderable {
    private readonly source;
    private readonly def;
    private currentSource;
    private currentNode;
    private fallback;
    constructor(source: ConditionalElement[], def: Renderable);
    mount(parent: View): HTMLElement | SVGElement | Text;
    render(parent: View, watch: Notifier, isSvg: boolean): HTMLElement | SVGElement | Text;
}
export declare class TemplateElement<T> implements Renderable {
    private readonly source;
    private readonly template;
    private readonly placeholder;
    private nodes;
    private currentValue;
    constructor(source: Either<VersionedList<T>>, template: F1<T, Renderable>, placeholder: Renderable | null);
    mount(parent: View): HTMLElement;
    render(o: View, watch: Notifier, isSvg: boolean): HTMLElement;
}
export declare class TextElement implements Renderable {
    private readonly textContent;
    private currentValue;
    constructor(textContent: Either<string>);
    mount(parent: View): Text;
    render(parent: View, watch: Notifier, _: boolean): Text;
}
export declare class NativeAttribute implements Attribute {
    private readonly attribute;
    private readonly value;
    private static setAttribute;
    private currentValue;
    constructor(attribute: string, value: Either<string>);
    set(o: View, watch: Notifier, isSvg: boolean): void;
}
export declare class FocusA implements Attribute {
    private readonly focus;
    private currentValue;
    constructor(focus: Either<boolean>);
    set(o: View, watch: Notifier): void;
}
export declare class OnHandlerA<K extends keyof HTMLElementEventMap> implements Attribute {
    private readonly eventName;
    private readonly handler;
    constructor(eventName: K | "mounted" | "unmounted", handler: F1<HTMLElementEventMap[K], any>);
    set(o: View, _: Notifier): void;
}
interface TemplateParams<T> {
    source: VersionedList<T> | (() => VersionedList<T>);
    template: ((t: T) => Renderable);
    placeholder?: Renderable;
}
export declare const Template: <T>(props: TemplateParams<T>) => any;
export {};
