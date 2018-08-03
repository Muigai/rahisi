export type A0 = () => void;

export type A1<T> = (b: T) => void;

export type A2<T, U> = (b: T, c: U) => void;

export type F0<T> = () => T;

export type F1<T, U> = (b: T) => U;

export type F2<T, U, V> = (b: T, c: U) => V;

export type View = HTMLElement;

export type Either<T> = T | F0<T>;

export const ENTER_KEY = 13;

export const ESCAPE_KEY = 27;

export const notNullOrWhiteSpace = (s: string | null): s is string => !!s && s.trim().length > 0;

export const createRef = (
    () => {
        let id = 0; // possible collision
        return () => `id_${id++}`;
    }
)();

export const mounted = "mounted";

export const unmounted = "unmounted";

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === "childList") {

            mutation.addedNodes.forEach((n) => n.dispatchEvent(new Event(mounted)));

            mutation.removedNodes.forEach((n) => n.dispatchEvent(new Event(unmounted)));
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

export class BaseElement implements Renderable {

    constructor(
        private readonly elementName: string | undefined,
        private readonly attributes: Attribute[] = new Array<Attribute>(),
        private readonly children: Renderable[] = new Array<Renderable>()) { }

    // factor out
    public mount(parent: View) {

        const notifier = new Notifier();

        const v = this.render(parent, notifier, false);

        notifier.start();

        return v;
    }

    public render(parent: View, watch: Notifier, isSvg: boolean) {

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

export class ConditionalRenderElement implements Renderable {

    private currentNode: HTMLElement | SVGElement | Text = document.createTextNode("");

    constructor(private readonly source: F0<F0<Renderable>>) { }

    public mount(parent: View) {

        const notifier = new Notifier();

        const v = this.render(parent, notifier, false);

        notifier.start();

        return v;
    }

    public render(parent: View, watch: Notifier, isSvg: boolean) {

        this.currentSource = this.source();

        this.currentNode = this.currentSource().render(parent, watch, isSvg);

        const gen = this.source;

        watch.subscribe(
            () => {

                const s = gen();

                if (this.currentSource !== s) {

                    this.currentSource = s;

                    const replacement =
                        this.currentSource().render(document.createDocumentFragment(), watch, isSvg);

                    parent.replaceChild(replacement, this.currentNode); // node
                }
            },
            parent,
        );

        parent.appendChild(this.currentNode);

        return this.currentNode;
    }

    private currentSource: F0<Renderable> = () => { throw new Error("undefined"); };
}

export class TemplateElement<T> implements Renderable {

    private nodes = new Map<number, Node>();

    private currentValue = new VersionedList<T>();

    public constructor(
        private readonly source: Either<VersionedList<T>>,
        private readonly template: F1<T, Renderable>,
        private readonly placeholder: Renderable | null) { }

    public mount(parent: View) {

        const notifier = new Notifier();

        const v = this.render(parent, notifier, false);

        notifier.start();

        return v;
    }

    public render(o: View, watch: Notifier, isSvg: boolean) {

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

    public mount(parent: View) {

        const notifier = new Notifier();

        const v = this.render(parent, notifier, false);

        notifier.start();

        return v;
    }

    public render(parent: View, watch: Notifier, _: boolean) {

        const o = document.createTextNode("");

        if (typeof this.textContent !== "function") {

            this.currentValue = this.textContent;

            o.textContent = this.currentValue;
        } else {

            this.currentValue = this.textContent();

            o.textContent = this.currentValue;

            const gen = this.textContent;

            watch.subscribe(
                () => {

                    const s = gen();

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

    public set(o: View, watch: Notifier, isSvg: boolean) {

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

    public set(o: View, watch: Notifier) {

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

export class OnHandlerA<K extends keyof HTMLElementEventMap> implements Attribute {

    public constructor(
        private readonly eventName: K | "mounted" | "unmounted",
        private readonly handler: F1<HTMLElementEventMap[K], any>) { }

    public set(o: View, _: Notifier) {

        o.addEventListener(this.eventName, this.handler);
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

        return new TemplateElement(source, template, placeholder || null) as any; // no props
    };
