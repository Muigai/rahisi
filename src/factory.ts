import {
    Attribute,
    BaseElement,
    ConditionalRenderElement,
    FocusA,
    NativeAttribute,
    OnHandlerA,
    Renderable,
    TemplateElement,
    TextElement,
} from "./index";

import {
    Either,
    F1,
    F2,
} from "rahisi-type-utils";

type K = keyof HTMLElementEventMap;

interface AttributeValue {
    [name: string]: Either<string> | Either<boolean> | F1<HTMLElementEventMap[K], any>;
}

export class React {

    public static createElement = (
        tagName: string | F2<Attribute[], Renderable[], Renderable>,
        attributes: AttributeValue | null, ...children: any[]): Renderable => {

        if (typeof tagName === "function") {
            return tagName(attributes as any, children);
        }

        const attribs = React.getAttributes(attributes);

        const kids = React.getChildren(children);

        return new BaseElement(tagName, attribs, kids);
    }

    public static getAttributes = (attributes: AttributeValue | null) => {

        const attribs = new Array<Attribute>();

        if (attributes) {
            for (const k of Object.keys(attributes)) {

                const key = k.toLowerCase().replace("doubleclick", "dblclick");

                const attributeValue = attributes[k];

                if (key === "onevent") {
                    const { event, handler } = attributeValue as  any;
                    attribs.push(new OnHandlerA(event, handler, true));
                    continue;
                }

                if (key.startsWith("on")) {
                    const event = key.substring(2) as K;
                    attribs.push(new OnHandlerA(event, attributeValue as F1<HTMLElementEventMap[K], any>));
                    continue;
                }

                switch (key) {
                    case "classname":
                        attribs.push(new NativeAttribute("class", attributeValue as Either<string>));
                        break;
                    case "htmlfor":
                        attribs.push(new NativeAttribute("for", attributeValue as Either<string>));
                        break;
                    case "focus":
                        attribs.push(new FocusA(attributeValue as Either<boolean>));
                        break;
                    default:
                        attribs.push(new NativeAttribute(key, attributeValue as Either<string>));
                        break;
                }
            }
        }

        return attribs;
    }

    public static getChildren = (children: any[]) => {

        const kids = new Array<Renderable>();

        for (const child of children) {
            React.appendChild(kids, child);
        }

        return kids;
    }

    private static appendChild = (kids: Renderable[], child: any) => {

        // <>{condition && <a>Display when condition is true</a>}</>
        // if condition is false, the child is a boolean, but we don't want to display anything
        if (typeof child === "undefined" || typeof child === "boolean" || child === null) {
            return;
        }

        if (Array.isArray(child)) {
            for (const value of child) {
                React.appendChild(kids, value);
            }
        } else if (typeof child === "string" || typeof child === "number") {
            kids.push(new TextElement(child.toString()));
        } else if (child instanceof BaseElement
            || child instanceof TextElement
            || child instanceof ConditionalRenderElement
            || child instanceof TemplateElement) {
            kids.push(child);
        } else if (typeof child === "function") {
            kids.push(new TextElement(child));
        } else {
            kids.push(new TextElement(String(child)));
        }
    }
}
