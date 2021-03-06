import { A0, A1, Either, F0, F1 } from "rahisi-type-utils";
import { RealEventMap } from "./jsx";

export const createRef = (
    () => {
        let id = 0; // possible collision
        return () => `id_${id++}`;
    }
)();

export interface LifecycleEvent<T = Element> { detail: { node: T }; }

export const mounted = "mounted";

export const unmounted = "unmounted";

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === "childList") {

            mutation.addedNodes.forEach((n) => n.dispatchEvent(new CustomEvent(mounted, { detail: { node: n } })));

            mutation.removedNodes.forEach((n) => n.dispatchEvent(new CustomEvent(unmounted, { detail: { node: n } })));
        }
    });
});

document.addEventListener(
    "DOMContentLoaded",
    () => observer.observe(document.body,
        {
            attributes: false,
            characterData: false,
            childList: true,
            subtree: true,
        }),
    false);

class Notifier {

    private nextId = 0;

    private readonly subscribers = new Map<number, A0>();

    public start() {

        const notify = () => {
            this.subscribers.forEach((v) => v());
            window.requestAnimationFrame(notify);
        };

        window.requestAnimationFrame(notify);
    }

    public subscribe(onNext: A0, dependency: Node) {

        const currentId = this.nextId;

        this.nextId++;

        this.subscribers.set(currentId, onNext);

        dependency.addEventListener(unmounted, () => this.subscribers.delete(currentId));
    }
}

export interface Attribute {
    set(o: HTMLElement | SVGElement, watch: Notifier, isSvg: boolean): void;
}

export interface Renderable {

    mount(parent: HTMLElement | SVGElement | DocumentFragment): HTMLElement | SVGElement | Text;

    render(parent: HTMLElement | SVGElement | DocumentFragment, watch: Notifier, isSvg: boolean):
        HTMLElement | SVGElement | Text;
}

interface KeyValuePair<K, V> {
    key: K;
    value: V;
}

export class VersionedList<T> {

    private nextKey = 0;

    constructor(private items: Array<KeyValuePair<number, T>> = new Array<KeyValuePair<number, T>>()) { }

    public getItems(): ReadonlyArray<T> {
        return this.items.map((a) => a.value);
    }

    public getItem(index: number): T {
        return this.items[index].value;
    }

    public count() { return this.items.length; }

    public add(item: T) {

        const val = { key: this.nextKey, value: item };

        this.items.push(val);

        this.nextKey++;

        this.addListener([val]);
    }

    public delete(itemIndex: number) {

        const val = this.items[itemIndex];

        this.items.splice(itemIndex, 1);

        this.nextKey++;

        this.removeListener([val]);
    }

    public remove(item: T) {
        this.delete(this.indexOf(item));
    }

    public clear() {

        const cleared = this.items.splice(0);

        this.items.length = 0;

        this.nextKey++;

        this.removeListener(cleared);
    }

    public indexOf(obj: T, fromIndex = 0): number {

        if (fromIndex < 0) {
            fromIndex = Math.max(0, this.items.length + fromIndex);
        }
        for (let i = fromIndex, j = this.items.length; i < j; i++) {
            if (this.items[i].value === obj) {
                return i;
            }
        }
        return -1;
    }

    public forEach(action: A1<T>) {
        this.getItems().forEach(action);
    }

    public filter(filter: F1<T, boolean>) {
        return this.getItems().filter(filter);
    }

    public setListeners(
        addListener: A1<Array<KeyValuePair<number, T>>>,
        removeListener: A1<Array<KeyValuePair<number, T>>>) {

        this.addListener = addListener;

        this.removeListener = removeListener;

        this.addListener(this.items);
    }

    // tslint:disable-next-line:no-empty
    private addListener: A1<Array<KeyValuePair<number, T>>> = () => { };

    // tslint:disable-next-line:no-empty
    private removeListener: A1<Array<KeyValuePair<number, T>>> = () => { };
}

function doMount(parent: HTMLElement, child: Renderable) {

    const notifier = new Notifier();

    const v = child.render(parent, notifier, false);

    notifier.start();

    return v;
}

export class BaseElement implements Renderable {

    constructor(
        private readonly elementName: string | undefined,
        private readonly attributes: Attribute[] = new Array<Attribute>(),
        private readonly children: Renderable[] = new Array<Renderable>()) { }

    public mount = (parent: HTMLElement): HTMLElement | SVGElement | Text => doMount(parent, this);

    public render(parent: HTMLElement, watch: Notifier, isSvg: boolean) {

        const useSvg = isSvg || this.elementName === "svg";

        if (this.elementName == null) { // it's a fragment

            const view = document.createDocumentFragment();

            this.children.forEach((a) => a.render(view, watch, useSvg));

            parent.appendChild(view);

            return parent;
        }

        const view =
            useSvg ? document.createElementNS("http://www.w3.org/2000/svg", this.elementName) :
                document.createElement(this.elementName);

        this.attributes.forEach((a) => a.set(view, watch, useSvg));

        this.children.forEach((a) => a.render(view, watch, useSvg));

        parent.appendChild(view);

        return view;
    }
}

export interface ConditionalElement {
    test: F0<boolean>;
    renderable: F0<Renderable>;
}

export class ConditionalRenderElement implements Renderable {

    private currentSource: ConditionalElement;

    private currentNode: HTMLElement | SVGElement | Text = document.createTextNode("");

    private fallback: ConditionalElement;

    constructor(private readonly source: ConditionalElement[], private readonly def: F0<Renderable>) {

        this.fallback = { test: () => true, renderable: def };

        this.currentSource = source.find((a) => a.test()) || this.fallback;
    }

    public mount = (parent: HTMLElement): HTMLElement | SVGElement | Text => doMount(parent, this);

    public render(parent: HTMLElement, watch: Notifier, isSvg: boolean) {

        this.currentNode =
            this.currentSource
                .renderable()
                .render(parent, watch, isSvg);

        const gen = this.source;

        watch.subscribe(
            () => {

                const s = gen.find((a) => a.test());

                if (this.currentSource !== s) {

                    this.currentSource = s || this.fallback;

                    const replacement =
                        this.currentSource
                            .renderable()
                            .render(document.createDocumentFragment(), watch, isSvg);

                    parent.replaceChild(replacement, this.currentNode);

                    this.currentNode = replacement;
                }
            },
            parent,
        );

        return this.currentNode;
    }
}

export class TemplateElement<T> implements Renderable {

    private nodes = new Map<number, Node>();

    private currentValue = new VersionedList<T>();

    public constructor(
        private readonly source: Either<VersionedList<T>>,
        private readonly template: F1<T, Renderable>,
        private readonly placeholder: Renderable | null) { }

    public mount(parent: HTMLElement) {

        const notifier = new Notifier();

        const v = this.render(parent, notifier, false);

        notifier.start();

        return v;
    }

    public render(o: HTMLElement, watch: Notifier, isSvg: boolean) {

        const placeholderNode =
            this.placeholder ? this.placeholder.render(document.createDocumentFragment(), watch, isSvg) : null;

        const showPlaceHolder =
            () => {
                if (!placeholderNode) {
                    return;
                }
                if (this.nodes.size === 0) {
                    const _ = placeholderNode.parentElement === o || o.appendChild(placeholderNode);
                } else {
                    const _ = placeholderNode.parentElement === o && o.removeChild(placeholderNode);
                }
            };

        const subscribe =
            () => {

                this.nodes.forEach((child, _) => o.removeChild(child));

                this.nodes.clear();

                this.currentValue.setListeners(
                    (items) => {

                        const fragment = document.createDocumentFragment();

                        items.forEach((i) => {

                            const child = this.template(i.value).render(fragment, watch, isSvg);

                            this.nodes.set(i.key, child);
                        });

                        o.appendChild(fragment);

                        showPlaceHolder();
                    },
                    (items) => {

                        items.forEach((i) => {

                            o.removeChild(this.nodes.get(i.key)!);

                            this.nodes.delete(i.key);
                        });

                        showPlaceHolder();
                    },
                );

                showPlaceHolder();
            };

        if (this.source instanceof VersionedList) {

            this.currentValue = this.source;

            subscribe();
        } else {

            this.currentValue = this.source();

            subscribe();

            const gen = this.source;

            watch.subscribe(
                () => {
                    const s = gen();

                    if (this.currentValue !== s) {

                        this.currentValue = s;

                        subscribe();
                    }
                },
                o,
            );
        }

        return o;
    }
}

export class TextElement implements Renderable {

    private currentValue = "";

    constructor(private readonly textContent: Either<string>) { }

    public mount = (parent: HTMLElement): HTMLElement | SVGElement | Text => doMount(parent, this);

    public render(parent: HTMLElement, watch: Notifier, _: boolean) {

        const o = document.createTextNode("");

        if (typeof this.textContent !== "function") {

            this.currentValue = typeof this.textContent === "boolean" ? "" : this.textContent;

            o.textContent = this.currentValue;
        } else {

            const gen = this.textContent;

            const getValue = () => typeof gen() === "boolean" ? "" : gen();

            this.currentValue = getValue();

            o.textContent = this.currentValue;

            watch.subscribe(
                () => {

                    const s = getValue();

                    if (this.currentValue !== s) {

                        this.currentValue = s;

                        o.textContent = this.currentValue;
                    }
                },
                o,
            );
        }

        parent.appendChild(o);

        return o;
    }
}

// xss via href
export class NativeAttribute implements Attribute {

    private static setAttribute =
        (attribute: string, element: any, value: any, isSvg: boolean) => {

            if (attribute === "style") {
                for (const key of Object.keys(value)) {
                    const style = value == null || value[key] == null ? "" : value[key];
                    if (key[0] === "-") {
                        element[attribute].setProperty(key, style);
                    } else {
                        element[attribute][key] = style;
                    }
                }
            } else if (

                attribute in element &&

                attribute !== "list" &&

                attribute !== "type" &&

                attribute !== "draggable" &&

                attribute !== "spellcheck" &&

                attribute !== "translate" &&

                !isSvg

            ) {

                element[attribute] = value == null ? "" : value;

            } else if (value != null && value !== false) {

                element.setAttribute(attribute, value);

            }

            if (value == null || value === false) {

                element.removeAttribute(attribute);

            }
        }

    private currentValue = "";

    public constructor(private readonly attribute: string, private readonly value: Either<string>) { }

    public set(o: HTMLElement, watch: Notifier, isSvg: boolean) {

        if (typeof this.value !== "function") {

            this.currentValue = this.value;

            NativeAttribute.setAttribute(this.attribute, o, this.currentValue, isSvg);

        } else {

            this.currentValue = this.value();

            NativeAttribute.setAttribute(this.attribute, o, this.currentValue, isSvg);

            const gen = this.value;

            watch.subscribe(
                () => {

                    const s = gen();

                    if (this.currentValue !== s) {

                        this.currentValue = s;

                        NativeAttribute.setAttribute(this.attribute, o, this.currentValue, isSvg);
                    }
                },
                o,
            );
        }
    }
}

// lose focus when body is clicked
export class FocusA implements Attribute {

    private currentValue = false;

    public constructor(private readonly focus: Either<boolean>) { }

    public set(o: HTMLElement, watch: Notifier) {

        if (typeof this.focus !== "function") {
            this.currentValue = this.focus;

            if (this.currentValue) {
                o.focus();
            }
        } else {
            this.currentValue = this.focus();

            if (this.currentValue) {
                o.focus();
            }

            const gen = this.focus;

            watch.subscribe(
                () => {

                    const s = gen();

                    if (this.currentValue !== s) {

                        this.currentValue = s;
                    }

                    if (this.currentValue && document.activeElement !== o) {
                        o.focus();
                    }
                },
                o,
            );
        }
    }
}

type E<T> = keyof RealEventMap<T> | "mounted" | "unmounted";

export class OnHandlerA<K extends keyof RealEventMap<T>, T = Element> implements Attribute {

    public static make<T,
        /* hack to only specify one type <T> parameter, */
        K extends keyof RealEventMap<T> = "click">(
            eventName: E<T>,
            handler: F1<RealEventMap<T>[K], void>) {
        return new OnHandlerA(eventName, handler);
    }

    public constructor(
        private readonly eventName: E<T>,
        private readonly handler: F1<RealEventMap<T>[K], void>) { }

    public set(o: HTMLElement) {

        o.addEventListener(this.eventName, this.handler as any);
    }
}

interface TemplateParams<T> {
    source: VersionedList<T> | (() => VersionedList<T>);
    template: ((t: T) => Renderable);
    placeholder?: Renderable;
}

export const Template =
    <T>(props: TemplateParams<T>) => {

        const { source, template, placeholder } = props;

        return new TemplateElement(source, template, placeholder || null); // no props
    };
