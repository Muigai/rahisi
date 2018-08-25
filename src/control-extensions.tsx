import { A1 } from "rahisi-type-utils";
import { React } from "./factory";
import { BaseElement, NativeAttribute, OnHandlerA } from "./index";
import * as R from "./jsx";

export const CheckBox = (props: { onCheckChanged?: A1<boolean> } & R.InputHTMLAttributes<HTMLInputElement>) => {
    const { onCheckChanged, ...rest } = props;
    const attributes = React.getAttributes(rest);
    if (onCheckChanged) {
        attributes.push(OnHandlerA.make<HTMLInputElement>("click", (e) => onCheckChanged(e.currentTarget.checked)));
    }
    attributes.push(new NativeAttribute("type", "checkbox"));
    return new BaseElement("input", attributes);
};

export const TextBox = (props: { onTextChanged?: A1<string> } & R.InputHTMLAttributes<HTMLInputElement>) => {
    const { onTextChanged, ...rest } = props;
    const attributes = React.getAttributes(rest);
    if (onTextChanged) {
        const handler =
            (() => {
                let val = "";
                const onInput = (e: R.FormEvent<HTMLInputElement>) => {
                    if (e.currentTarget.value === val) {
                        return;
                    }
                    val = e.currentTarget.value;
                    onTextChanged(val);
                };
                return onInput;
            })();
        attributes.push(OnHandlerA.make<HTMLInputElement>("input", handler));
    }
    attributes.push(new NativeAttribute("type", "text"));
    return new BaseElement("input", attributes);
};

export const doScroll = (o: HTMLElement, element: HTMLElement, to?: number, duration?: number) => {

    const start = element.scrollTop;
    const change = (to || o.offsetTop - 10) - start;
    const increment = 20;
    let currentTime = 0;

    const easeInOutQuad = (t: number, b: number, c: number, d: number) => {

        t /= d / 2;

        if (t < 1) {

            return c / 2 * t * t + b;

        }

        t--;

        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    const animateScroll = () => {

        currentTime += increment;

        const d = duration || 300;

        const val = easeInOutQuad(currentTime, start, change, d);

        element.scrollTop = val;

        if (currentTime < d) {
            setTimeout(animateScroll, increment);
        }
    };

    animateScroll();
};
