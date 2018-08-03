import { React } from "./factory";
import { A1, BaseElement, NativeAttribute, OnHandlerA } from "./index";
import * as R from "./jsx";

// add custom parameters checkChanged etc.
export const CheckBox = (props: { onCheckChanged?: A1<boolean> } & R.InputHTMLAttributes<HTMLInputElement>) => {
    const { onCheckChanged, ...rest } = props;
    const attributes = React.getAttributes(rest as any);
    if (onCheckChanged) {
        attributes.push(
            new OnHandlerA("click",
                (e) => onCheckChanged((e.currentTarget as HTMLInputElement).checked)));
    }
    attributes.push(new NativeAttribute("type", "checkbox"));
    return new BaseElement("input", attributes) as any;
};

export const TextBox = (props: R.InputHTMLAttributes<HTMLInputElement>) =>
    <input {...props} type="text"/>;

export const textVal = (e: R.KeyboardEvent<HTMLInputElement>) => e.currentTarget.value;

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
