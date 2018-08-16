// Type defs modified from React as below
// Type definitions for React 16.4
// Project: http://facebook.github.io/react/
// Definitions by: Asana <https://asana.com>
//                 AssureSign <http://www.assuresign.com>
//                 Microsoft <https://microsoft.com>
//                 John Reilly <https://github.com/johnnyreilly>
//                 Benoit Benezech <https://github.com/bbenezech>
//                 Patricio Zavolinsky <https://github.com/pzavolinsky>
//                 Digiguru <https://github.com/digiguru>
//                 Eric Anderson <https://github.com/ericanderson>
//                 Albert Kurniawan <https://github.com/morcerf>
//                 Tanguy Krotoff <https://github.com/tkrotoff>
//                 Dovydas Navickas <https://github.com/DovydasNavickas>
//                 Stéphane Goetz <https://github.com/onigoetz>
//                 Josh Rutherford <https://github.com/theruther4d>
//                 Guilherme Hübner <https://github.com/guilhermehubner>
//                 Ferdy Budhidharma <https://github.com/ferdaber>
//                 Johann Rakotoharisoa <https://github.com/jrakotoharisoa>
//                 Olivier Pascal <https://github.com/pascaloliv>
//                 Martin Hochel <https://github.com/hotell>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.6

import * as CSS from 'csstype';

// tslint:disable-next-line:export-just-namespace
export = React;
export as namespace React;

declare namespace React {
    //
    // React Elements
    // ----------------------------------------------------------------------

    interface Attributes {}

    interface ClassAttributes<T> {}

    interface ReactElement<P> {
        props: P;
        mount(parent: HTMLElement |
                       SVGElement |
                       DocumentFragment): HTMLElement | SVGElement | Text;
        render(parent: HTMLElement | SVGElement | DocumentFragment,
               watch: never,
               isSvg: never): HTMLElement | SVGElement | Text; 
    }

    // string fallback for custom web-components
    interface DOMElement<P extends HTMLAttributes<T> | SVGAttributes<T>, T extends Element> extends ReactElement<P> {
        type: string;
    }

    // ReactHTML for ReactHTMLElement
    // tslint:disable-next-line:no-empty-interface
    // interface ReactHTMLElement<T extends HTMLElement> extends DetailedReactHTMLElement<AllHTMLAttributes<T>, T> { }

    interface DetailedReactHTMLElement<P extends HTMLAttributes<T>, T extends HTMLElement> extends DOMElement<P, T> {
        type: keyof ReactHTML;
    }

    // ReactSVG for ReactSVGElement
    interface ReactSVGElement extends DOMElement<SVGAttributes<SVGElement>, SVGElement> {
        type: keyof ReactSVG;
    }

    type DOMFactory<P extends DOMAttributes<T>, T extends Element> =
        (props?: ClassAttributes<T> & P | null, ...children: ReactNode[]) => DOMElement<P, T>;

    // tslint:disable-next-line:no-empty-interface
    // interface HTMLFactory<T extends HTMLElement> extends DetailedHTMLFactory<AllHTMLAttributes<T>, T> {}

    interface DetailedHTMLFactory<P extends HTMLAttributes<T>, T extends HTMLElement> extends DOMFactory<P, T> {
        (props?: ClassAttributes<T> & P | null, ...children: ReactNode[]): DetailedReactHTMLElement<P, T>;
    }

    interface SVGFactory extends DOMFactory<SVGAttributes<SVGElement>, SVGElement> {
        (props?: ClassAttributes<SVGElement> & SVGAttributes<SVGElement> | null, ...children: ReactNode[]): ReactSVGElement;
    }

    //
    // React Nodes
    // http://facebook.github.io/react/docs/glossary.html
    // ----------------------------------------------------------------------

    type ReactText = string | number;
    type ReactChild = ReactElement<any> | ReactText;

    interface ReactNodeArray extends Array<ReactNode> {}
    type ReactFragment = {} | ReactNodeArray;
    type ReactNode = ReactChild | ReactFragment | string | number | boolean | null | undefined;

    //
    // Event System
    // ----------------------------------------------------------------------
    // _ | () => _ is wrong
    interface SyntheticEvent<T = Element> {
        bubbles: boolean;
        /**
         * A reference to the element on which the event listener is registered.
         */
        currentTarget: EventTarget & T;
        cancelable: boolean;
        defaultPrevented: boolean;
        eventPhase: number;
        isTrusted: boolean; 
        nativeEvent: Event;
        preventDefault(): void;
        // isDefaultPrevented(): boolean; // x
        stopPropagation(): void;
        // isPropagationStopped(): boolean; // x
        // persist(): void; // x
        // If you thought this should be `EventTarget & T`, see https://github.com/DefinitelyTyped/DefinitelyTyped/pull/12239
        /**
         * A reference to the element from which the event was originally dispatched.
         * This might be a child element to the element on which the event listener is registered.
         *
         * @see currentTarget
         */
        target: EventTarget;
        timeStamp: number;
        type: string;
    }

    interface ClipboardEvent<T = Element> extends SyntheticEvent<T> {
        clipboardData: DataTransfer;
    }

    interface CompositionEvent<T = Element> extends SyntheticEvent<T> {
        data: string;
    }

    interface DragEvent<T = Element> extends MouseEvent<T> {
        dataTransfer: DataTransfer;
    }

    interface PointerEvent<T = Element> extends MouseEvent<T> {
        pointerId: number;
        pressure: number;
        tiltX: number;
        tiltY: number;
        width: number;
        height: number;
        pointerType: 'mouse' | 'pen' | 'touch';
        isPrimary: boolean;
    }

    interface FocusEvent<T = Element> extends SyntheticEvent<T> {
        relatedTarget: EventTarget;
        target: EventTarget & T;
    }

    // tslint:disable-next-line:no-empty-interface
    interface FormEvent<T = Element> extends SyntheticEvent<T> {
    }

    interface InvalidEvent<T = Element> extends SyntheticEvent<T> {
        target: EventTarget & T;
    }

    interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
        target: EventTarget & T;
    }

    interface KeyboardEvent<T = Element> extends SyntheticEvent<T> {
        altKey: boolean;
        charCode: number;
        ctrlKey: boolean;
        /**
         * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid (case-sensitive) arguments to this method.
         */
        getModifierState(key: string): boolean;
        /**
         * See the [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#named-key-attribute-values). for possible values
         */
        key: string;
        keyCode: number;
        locale: string;
        location: number;
        metaKey: boolean;
        repeat: boolean;
        shiftKey: boolean;
        which: number;
    }

    interface MouseEvent<T = Element> extends SyntheticEvent<T> {
        altKey: boolean;
        button: number;
        buttons: number;
        clientX: number;
        clientY: number;
        ctrlKey: boolean;
        /**
         * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid (case-sensitive) arguments to this method.
         */
        getModifierState(key: string): boolean;
        metaKey: boolean;
        pageX: number;
        pageY: number;
        relatedTarget: EventTarget;
        screenX: number;
        screenY: number;
        shiftKey: boolean;
    }

    interface TouchEvent<T = Element> extends SyntheticEvent<T> {
        altKey: boolean;
        changedTouches: TouchList;
        ctrlKey: boolean;
        /**
         * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid (case-sensitive) arguments to this method.
         */
        getModifierState(key: string): boolean;
        metaKey: boolean;
        shiftKey: boolean;
        targetTouches: TouchList;
        touches: TouchList;
    }

    interface UIEvent<T = Element> extends SyntheticEvent<T> {
        detail: number;
        view: AbstractView;
    }

    interface WheelEvent<T = Element> extends MouseEvent<T> {
        deltaMode: number;
        deltaX: number;
        deltaY: number;
        deltaZ: number;
    }

    interface AnimationEvent<T = Element> extends SyntheticEvent<T> {
        animationName: string;
        elapsedTime: number;
        pseudoElement: string;
    }

    interface TransitionEvent<T = Element> extends SyntheticEvent<T> {
        elapsedTime: number;
        propertyName: string;
        pseudoElement: string;
    }
    
    //
    // Event Handler Types
    // ----------------------------------------------------------------------

    type EventHandler<E extends SyntheticEvent<any>> = { bivarianceHack(event: E): void }["bivarianceHack"];

    type ReactEventHandler<T = Element> = EventHandler<SyntheticEvent<T>>;

    type ClipboardEventHandler<T = Element> = EventHandler<ClipboardEvent<T>>;
    type CompositionEventHandler<T = Element> = EventHandler<CompositionEvent<T>>;
    type DragEventHandler<T = Element> = EventHandler<DragEvent<T>>;
    type FocusEventHandler<T = Element> = EventHandler<FocusEvent<T>>;
    type FormEventHandler<T = Element> = EventHandler<FormEvent<T>>;
    type ChangeEventHandler<T = Element> = EventHandler<ChangeEvent<T>>;
    type KeyboardEventHandler<T = Element> = EventHandler<KeyboardEvent<T>>;
    type MouseEventHandler<T = Element> = EventHandler<MouseEvent<T>>;
    type TouchEventHandler<T = Element> = EventHandler<TouchEvent<T>>;
    type PointerEventHandler<T = Element> = EventHandler<PointerEvent<T>>;
    type UIEventHandler<T = Element> = EventHandler<UIEvent<T>>;
    type WheelEventHandler<T = Element> = EventHandler<WheelEvent<T>>;
    type AnimationEventHandler<T = Element> = EventHandler<AnimationEvent<T>>;
    type TransitionEventHandler<T = Element> = EventHandler<TransitionEvent<T>>;

    // interface HTMLProps<T> extends AllHTMLAttributes<T>, ClassAttributes<T> {
    // }

    type DetailedHTMLProps<E extends HTMLAttributes<T>, T> = ClassAttributes<T> & E;

    interface SVGProps<T> extends SVGAttributes<T>, ClassAttributes<T> {
    }

    interface DOMAttributes<T> {
        children?: ReactNode;
        // dangerouslySetInnerHTML?: {
        //     __html: string | (() => string);
        // };

        // Clipboard Events
        onCopy?: ClipboardEventHandler<T>;
        onCopyCapture?: ClipboardEventHandler<T>;
        onCut?: ClipboardEventHandler<T>;
        onCutCapture?: ClipboardEventHandler<T>;
        onPaste?: ClipboardEventHandler<T>;
        onPasteCapture?: ClipboardEventHandler<T>;

        // Composition Events
        onCompositionEnd?: CompositionEventHandler<T>;
        onCompositionEndCapture?: CompositionEventHandler<T>;
        onCompositionStart?: CompositionEventHandler<T>;
        onCompositionStartCapture?: CompositionEventHandler<T>;
        onCompositionUpdate?: CompositionEventHandler<T>;
        onCompositionUpdateCapture?: CompositionEventHandler<T>;

        // Focus Events
        onFocus?: FocusEventHandler<T>;
        onFocusCapture?: FocusEventHandler<T>;
        onBlur?: FocusEventHandler<T>;
        onBlurCapture?: FocusEventHandler<T>;

        // Form Events
        onChange?: FormEventHandler<T>;
        onChangeCapture?: FormEventHandler<T>;
        onInput?: FormEventHandler<T>;
        onInputCapture?: FormEventHandler<T>;
        onReset?: FormEventHandler<T>;
        onResetCapture?: FormEventHandler<T>;
        onSubmit?: FormEventHandler<T>;
        onSubmitCapture?: FormEventHandler<T>;
        onInvalid?: FormEventHandler<T>;
        onInvalidCapture?: FormEventHandler<T>;

        // Image Events
        onLoad?: ReactEventHandler<T>;
        onLoadCapture?: ReactEventHandler<T>;
        onError?: ReactEventHandler<T>; // also a Media Event
        onErrorCapture?: ReactEventHandler<T>; // also a Media Event

        // Keyboard Events
        onKeyDown?: KeyboardEventHandler<T>;
        onKeyDownCapture?: KeyboardEventHandler<T>;
        onKeyPress?: KeyboardEventHandler<T>;
        onKeyPressCapture?: KeyboardEventHandler<T>;
        onKeyUp?: KeyboardEventHandler<T>;
        onKeyUpCapture?: KeyboardEventHandler<T>;

        // Media Events
        onAbort?: ReactEventHandler<T>;
        onAbortCapture?: ReactEventHandler<T>;
        onCanPlay?: ReactEventHandler<T>;
        onCanPlayCapture?: ReactEventHandler<T>;
        onCanPlayThrough?: ReactEventHandler<T>;
        onCanPlayThroughCapture?: ReactEventHandler<T>;
        onDurationChange?: ReactEventHandler<T>;
        onDurationChangeCapture?: ReactEventHandler<T>;
        onEmptied?: ReactEventHandler<T>;
        onEmptiedCapture?: ReactEventHandler<T>;
        onEncrypted?: ReactEventHandler<T>;
        onEncryptedCapture?: ReactEventHandler<T>;
        onEnded?: ReactEventHandler<T>;
        onEndedCapture?: ReactEventHandler<T>;
        onLoadedData?: ReactEventHandler<T>;
        onLoadedDataCapture?: ReactEventHandler<T>;
        onLoadedMetadata?: ReactEventHandler<T>;
        onLoadedMetadataCapture?: ReactEventHandler<T>;
        onLoadStart?: ReactEventHandler<T>;
        onLoadStartCapture?: ReactEventHandler<T>;
        onPause?: ReactEventHandler<T>;
        onPauseCapture?: ReactEventHandler<T>;
        onPlay?: ReactEventHandler<T>;
        onPlayCapture?: ReactEventHandler<T>;
        onPlaying?: ReactEventHandler<T>;
        onPlayingCapture?: ReactEventHandler<T>;
        onProgress?: ReactEventHandler<T>;
        onProgressCapture?: ReactEventHandler<T>;
        onRateChange?: ReactEventHandler<T>;
        onRateChangeCapture?: ReactEventHandler<T>;
        onSeeked?: ReactEventHandler<T>;
        onSeekedCapture?: ReactEventHandler<T>;
        onSeeking?: ReactEventHandler<T>;
        onSeekingCapture?: ReactEventHandler<T>;
        onStalled?: ReactEventHandler<T>;
        onStalledCapture?: ReactEventHandler<T>;
        onSuspend?: ReactEventHandler<T>;
        onSuspendCapture?: ReactEventHandler<T>;
        onTimeUpdate?: ReactEventHandler<T>;
        onTimeUpdateCapture?: ReactEventHandler<T>;
        onVolumeChange?: ReactEventHandler<T>;
        onVolumeChangeCapture?: ReactEventHandler<T>;
        onWaiting?: ReactEventHandler<T>;
        onWaitingCapture?: ReactEventHandler<T>;

        // MouseEvents
        onClick?: MouseEventHandler<T>;
        onClickCapture?: MouseEventHandler<T>;
        onContextMenu?: MouseEventHandler<T>;
        onContextMenuCapture?: MouseEventHandler<T>;
        onDoubleClick?: MouseEventHandler<T>;
        onDoubleClickCapture?: MouseEventHandler<T>;
        onDrag?: DragEventHandler<T>;
        onDragCapture?: DragEventHandler<T>;
        onDragEnd?: DragEventHandler<T>;
        onDragEndCapture?: DragEventHandler<T>;
        onDragEnter?: DragEventHandler<T>;
        onDragEnterCapture?: DragEventHandler<T>;
        onDragExit?: DragEventHandler<T>;
        onDragExitCapture?: DragEventHandler<T>;
        onDragLeave?: DragEventHandler<T>;
        onDragLeaveCapture?: DragEventHandler<T>;
        onDragOver?: DragEventHandler<T>;
        onDragOverCapture?: DragEventHandler<T>;
        onDragStart?: DragEventHandler<T>;
        onDragStartCapture?: DragEventHandler<T>;
        onDrop?: DragEventHandler<T>;
        onDropCapture?: DragEventHandler<T>;
        onMouseDown?: MouseEventHandler<T>;
        onMouseDownCapture?: MouseEventHandler<T>;
        onMouseEnter?: MouseEventHandler<T>;
        onMouseLeave?: MouseEventHandler<T>;
        onMouseMove?: MouseEventHandler<T>;
        onMouseMoveCapture?: MouseEventHandler<T>;
        onMouseOut?: MouseEventHandler<T>;
        onMouseOutCapture?: MouseEventHandler<T>;
        onMouseOver?: MouseEventHandler<T>;
        onMouseOverCapture?: MouseEventHandler<T>;
        onMouseUp?: MouseEventHandler<T>;
        onMouseUpCapture?: MouseEventHandler<T>;

        // Selection Events
        onSelect?: ReactEventHandler<T>;
        onSelectCapture?: ReactEventHandler<T>;

        // Touch Events
        onTouchCancel?: TouchEventHandler<T>;
        onTouchCancelCapture?: TouchEventHandler<T>;
        onTouchEnd?: TouchEventHandler<T>;
        onTouchEndCapture?: TouchEventHandler<T>;
        onTouchMove?: TouchEventHandler<T>;
        onTouchMoveCapture?: TouchEventHandler<T>;
        onTouchStart?: TouchEventHandler<T>;
        onTouchStartCapture?: TouchEventHandler<T>;

        // Pointer Events
        onPointerDown?: PointerEventHandler<T>;
        onPointerDownCapture?: PointerEventHandler<T>;
        onPointerMove?: PointerEventHandler<T>;
        onPointerMoveCapture?: PointerEventHandler<T>;
        onPointerUp?: PointerEventHandler<T>;
        onPointerUpCapture?: PointerEventHandler<T>;
        onPointerCancel?: PointerEventHandler<T>;
        onPointerCancelCapture?: PointerEventHandler<T>;
        onPointerEnter?: PointerEventHandler<T>;
        onPointerEnterCapture?: PointerEventHandler<T>;
        onPointerLeave?: PointerEventHandler<T>;
        onPointerLeaveCapture?: PointerEventHandler<T>;
        onPointerOver?: PointerEventHandler<T>;
        onPointerOverCapture?: PointerEventHandler<T>;
        onPointerOut?: PointerEventHandler<T>;
        onPointerOutCapture?: PointerEventHandler<T>;
        onGotPointerCapture?: PointerEventHandler<T>;
        onGotPointerCaptureCapture?: PointerEventHandler<T>;
        onLostPointerCapture?: PointerEventHandler<T>;
        onLostPointerCaptureCapture?: PointerEventHandler<T>;

        // UI Events
        onScroll?: UIEventHandler<T>;
        onScrollCapture?: UIEventHandler<T>;

        // Wheel Events
        onWheel?: WheelEventHandler<T>;
        onWheelCapture?: WheelEventHandler<T>;

        // Animation Events
        onAnimationStart?: AnimationEventHandler<T>;
        onAnimationStartCapture?: AnimationEventHandler<T>;
        onAnimationEnd?: AnimationEventHandler<T>;
        onAnimationEndCapture?: AnimationEventHandler<T>;
        onAnimationIteration?: AnimationEventHandler<T>;
        onAnimationIterationCapture?: AnimationEventHandler<T>;

        // Transition Events
        onTransitionEnd?: TransitionEventHandler<T>;
        onTransitionEndCapture?: TransitionEventHandler<T>;
    }

    export interface CSSProperties extends CSS.Properties<string | number> {
        /**
         * The index signature was removed to enable closed typing for style
         * using CSSType. You're able to use type assertion or module augmentation
         * to add properties or an index signature of your own.
         *
         * For examples and more information, visit:
         * https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors
         */
    }

    interface HTMLAttributes<T> extends DOMAttributes<T> {
        // React-specific Attributes
        // defaultChecked?: boolean | (() => boolean);
        // defaultValue?: string | string[] | (() => string) | (() => string[]);
        // suppressContentEditableWarning?: boolean | (() => boolean);
        // suppressHydrationWarning?: boolean | (() => boolean);

        // extension
        onMounted?: ((this: HTMLElement, ev: SyntheticEvent<T>) => any);
        onUnmounted?: ((this: HTMLElement, ev: SyntheticEvent<T>) => any);
        focus?: boolean | (() => boolean);

        // Standard HTML Attributes
        accessKey?: string | (() => string);
        className?: string | (() => string);
        contentEditable?: boolean | (() => boolean);
        contextMenu?: string | (() => string);
        dir?: string | (() => string);
        draggable?: boolean | (() => boolean);
        hidden?: boolean | (() => boolean);
        id?: string | (() => string);
        lang?: string | (() => string);
        placeholder?: string | (() => string);
        slot?: string | (() => string);
        spellCheck?: boolean | (() => boolean);
        style?: CSSProperties;
        tabIndex?: number | (() => number);
        title?: string | (() => string);

        // Unknown
        inputMode?: string | (() => string);
        is?: string | (() => string);
        radioGroup?: string | (() => string); // <command>, <menuitem>

        // WAI-ARIA
        role?: string | (() => string);

        // RDFa Attributes
        about?: string | (() => string);
        datatype?: string | (() => string);
        inlist?: any;
        prefix?: string | (() => string);
        property?: string | (() => string);
        resource?: string | (() => string);
        typeof?: string | (() => string);
        vocab?: string | (() => string);

        // Non-standard Attributes
        autoCapitalize?: string | (() => string);
        autoCorrect?: string | (() => string);
        autoSave?: string | (() => string);
        color?: string | (() => string);
        itemProp?: string | (() => string);
        itemScope?: boolean | (() => boolean);
        itemType?: string | (() => string);
        itemID?: string | (() => string);
        itemRef?: string | (() => string);
        results?: number | (() => number);
        security?: string | (() => string);
        unselectable?: boolean | (() => boolean);
    }

    // All the WAI-ARIA 1.1 attributes from https://www.w3.org/TR/wai-aria-1.1/
    interface HTMLAttributes<T> extends DOMAttributes<T> {
        /** Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. */
        'aria-activedescendant'?: string | (() => string);
        /** Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. */
        'aria-atomic'?: boolean | 'false' | 'true';
        /**
         * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
         * presented if they are made.
         */
        'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both';
        /** Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. */
        'aria-busy'?: boolean | 'false' | 'true';
        /**
         * Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
         * @see aria-pressed @see aria-selected.
         */
        'aria-checked'?: boolean | 'false' | 'mixed' | 'true';
        /**
         * Defines the total number of columns in a table, grid, or treegrid.
         * @see aria-colindex.
         */
        'aria-colcount'?: number | (() => number);
        /**
         * Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
         * @see aria-colcount @see aria-colspan.
         */
        'aria-colindex'?: number | (() => number);
        /**
         * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
         * @see aria-colindex @see aria-rowspan.
         */
        'aria-colspan'?: number | (() => number);
        /**
         * Identifies the element (or elements) whose contents or presence are controlled by the current element.
         * @see aria-owns.
         */
        'aria-controls'?: string | (() => string);
        /** Indicates the element that represents the current item within a container or set of related elements. */
        'aria-current'?: boolean | 'false' | 'true' | 'page' | 'step' | 'location' | 'date' | 'time';
        /**
         * Identifies the element (or elements) that describes the object.
         * @see aria-labelledby
         */
        'aria-describedby'?: string | (() => string);
        /**
         * Identifies the element that provides a detailed, extended description for the object.
         * @see aria-describedby.
         */
        'aria-details'?: string | (() => string);
        /**
         * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
         * @see aria-hidden @see aria-readonly.
         */
        'aria-disabled'?: boolean | 'false' | 'true';
        /**
         * Indicates what functions can be performed when a dragged object is released on the drop target.
         * @deprecated in ARIA 1.1
         */
        'aria-dropeffect'?: 'none' | 'copy' | 'execute' | 'link' | 'move' | 'popup';
        /**
         * Identifies the element that provides an error message for the object.
         * @see aria-invalid @see aria-describedby.
         */
        'aria-errormessage'?: string | (() => string);
        /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
        'aria-expanded'?: boolean | 'false' | 'true';
        /**
         * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
         * allows assistive technology to override the general default of reading in document source order.
         */
        'aria-flowto'?: string | (() => string);
        /**
         * Indicates an element's "grabbed" state in a drag-and-drop operation.
         * @deprecated in ARIA 1.1
         */
        'aria-grabbed'?: boolean | 'false' | 'true';
        /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
        'aria-haspopup'?: boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
        /**
         * Indicates whether the element is exposed to an accessibility API.
         * @see aria-disabled.
         */
        'aria-hidden'?: boolean | 'false' | 'true';
        /**
         * Indicates the entered value does not conform to the format expected by the application.
         * @see aria-errormessage.
         */
        'aria-invalid'?: boolean | 'false' | 'true' | 'grammar' | 'spelling';
        /** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
        'aria-keyshortcuts'?: string | (() => string);
        /**
         * Defines a string value that labels the current element.
         * @see aria-labelledby.
         */
        'aria-label'?: string | (() => string);
        /**
         * Identifies the element (or elements) that labels the current element.
         * @see aria-describedby.
         */
        'aria-labelledby'?: string | (() => string);
        /** Defines the hierarchical level of an element within a structure. */
        'aria-level'?: number | (() => number);
        /** Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. */
        'aria-live'?: 'off' | 'assertive' | 'polite';
        /** Indicates whether an element is modal when displayed. */
        'aria-modal'?: boolean | 'false' | 'true';
        /** Indicates whether a text box accepts multiple lines of input or only a single line. */
        'aria-multiline'?: boolean | 'false' | 'true';
        /** Indicates that the user may select more than one item from the current selectable descendants. */
        'aria-multiselectable'?: boolean | 'false' | 'true';
        /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
        'aria-orientation'?: 'horizontal' | 'vertical';
        /**
         * Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
         * between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
         * @see aria-controls.
         */
        'aria-owns'?: string | (() => string);
        /**
         * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
         * A hint could be a sample value or a brief description of the expected format.
         */
        'aria-placeholder'?: string | (() => string);
        /**
         * Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
         * @see aria-setsize.
         */
        'aria-posinset'?: number | (() => number);
        /**
         * Indicates the current "pressed" state of toggle buttons.
         * @see aria-checked @see aria-selected.
         */
        'aria-pressed'?: boolean | 'false' | 'mixed' | 'true';
        /**
         * Indicates that the element is not editable, but is otherwise operable.
         * @see aria-disabled.
         */
        'aria-readonly'?: boolean | 'false' | 'true';
        /**
         * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
         * @see aria-atomic.
         */
        'aria-relevant'?: 'additions' | 'additions text' | 'all' | 'removals' | 'text';
        /** Indicates that user input is required on the element before a form may be submitted. */
        'aria-required'?: boolean | 'false' | 'true';
        /** Defines a human-readable, author-localized description for the role of an element. */
        'aria-roledescription'?: string | (() => string);
        /**
         * Defines the total number of rows in a table, grid, or treegrid.
         * @see aria-rowindex.
         */
        'aria-rowcount'?: number | (() => number);
        /**
         * Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
         * @see aria-rowcount @see aria-rowspan.
         */
        'aria-rowindex'?: number | (() => number);
        /**
         * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
         * @see aria-rowindex @see aria-colspan.
         */
        'aria-rowspan'?: number | (() => number);
        /**
         * Indicates the current "selected" state of various widgets.
         * @see aria-checked @see aria-pressed.
         */
        'aria-selected'?: boolean | 'false' | 'true';
        /**
         * Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
         * @see aria-posinset.
         */
        'aria-setsize'?: number | (() => number);
        /** Indicates if items in a table or grid are sorted in ascending or descending order. */
        'aria-sort'?: 'none' | 'ascending' | 'descending' | 'other';
        /** Defines the maximum allowed value for a range widget. */
        'aria-valuemax'?: number | (() => number);
        /** Defines the minimum allowed value for a range widget. */
        'aria-valuemin'?: number | (() => number);
        /**
         * Defines the current value for a range widget.
         * @see aria-valuetext.
         */
        'aria-valuenow'?: number | (() => number);
        /** Defines the human readable text alternative of aria-valuenow for a range widget. */
        'aria-valuetext'?: string | (() => string);
    }

    // interface AllHTMLAttributes<T> extends HTMLAttributes<T> {
    //     // Standard HTML Attributes
    //     accept?: string | (() => string);
    //     acceptCharset?: string | (() => string);
    //     action?: string | (() => string);
    //     allowFullScreen?: boolean | (() => boolean);
    //     allowTransparency?: boolean | (() => boolean);
    //     alt?: string | (() => string);
    //     as?: string | (() => string);
    //     async?: boolean | (() => boolean);
    //     autoComplete?: string | (() => string);
    //     autoFocus?: boolean | (() => boolean);
    //     autoPlay?: boolean | (() => boolean);
    //     capture?: boolean | string;
    //     cellPadding?: number | string | (() => number) | (() => string);
    //     cellSpacing?: number | string | (() => number) | (() => string);
    //     charSet?: string | (() => string);
    //     challenge?: string | (() => string);
    //     checked?: boolean | (() => boolean);
    //     cite?: string | (() => string);
    //     classID?: string | (() => string);
    //     cols?: number | (() => number);
    //     colSpan?: number | (() => number);
    //     content?: string | (() => string);
    //     controls?: boolean | (() => boolean);
    //     coords?: string | (() => string);
    //     crossOrigin?: string | (() => string);
    //     data?: string | (() => string);
    //     dateTime?: string | (() => string);
    //     default?: boolean | (() => boolean);
    //     defer?: boolean | (() => boolean);
    //     disabled?: boolean | (() => boolean);
    //     download?: any;
    //     encType?: string | (() => string);
    //     form?: string | (() => string);
    //     formAction?: string | (() => string);
    //     formEncType?: string | (() => string);
    //     formMethod?: string | (() => string);
    //     formNoValidate?: boolean | (() => boolean);
    //     formTarget?: string | (() => string);
    //     frameBorder?: number | string | (() => number) | (() => string);
    //     headers?: string | (() => string);
    //     height?: number | string | (() => number) | (() => string);
    //     high?: number | (() => number);
    //     href?: string | (() => string);
    //     hrefLang?: string | (() => string);
    //     htmlFor?: string | (() => string);
    //     httpEquiv?: string | (() => string);
    //     integrity?: string | (() => string);
    //     keyParams?: string | (() => string);
    //     keyType?: string | (() => string);
    //     kind?: string | (() => string);
    //     label?: string | (() => string);
    //     list?: string | (() => string);
    //     loop?: boolean | (() => boolean);
    //     low?: number | (() => number);
    //     manifest?: string | (() => string);
    //     marginHeight?: number | (() => number);
    //     marginWidth?: number | (() => number);
    //     max?: number | string | (() => number) | (() => string);
    //     maxLength?: number | (() => number);
    //     media?: string | (() => string);
    //     mediaGroup?: string | (() => string);
    //     method?: string | (() => string);
    //     min?: number | string | (() => number) | (() => string);
    //     minLength?: number | (() => number);
    //     multiple?: boolean | (() => boolean);
    //     muted?: boolean | (() => boolean);
    //     name?: string | (() => string);
    //     nonce?: string | (() => string);
    //     noValidate?: boolean | (() => boolean);
    //     open?: boolean | (() => boolean);
    //     optimum?: number | (() => number);
    //     pattern?: string | (() => string);
    //     placeholder?: string | (() => string);
    //     playsInline?: boolean | (() => boolean);
    //     poster?: string | (() => string);
    //     preload?: string | (() => string);
    //     readOnly?: boolean | (() => boolean);
    //     rel?: string | (() => string);
    //     required?: boolean | (() => boolean);
    //     reversed?: boolean | (() => boolean);
    //     rows?: number | (() => number);
    //     rowSpan?: number | (() => number);
    //     sandbox?: string | (() => string);
    //     scope?: string | (() => string);
    //     scoped?: boolean | (() => boolean);
    //     scrolling?: string | (() => string);
    //     seamless?: boolean | (() => boolean);
    //     selected?: boolean | (() => boolean);
    //     shape?: string | (() => string);
    //     size?: number | (() => number);
    //     sizes?: string | (() => string);
    //     span?: number | (() => number);
    //     src?: string | (() => string);
    //     srcDoc?: string | (() => string);
    //     srcLang?: string | (() => string);
    //     srcSet?: string | (() => string);
    //     start?: number | (() => number);
    //     step?: number | string | (() => number) | (() => string);
    //     summary?: string | (() => string);
    //     target?: string | (() => string);
    //     type?: string | (() => string);
    //     useMap?: string | (() => string);
    //     value?: string | string[] | number | (() => string) | (() => string[]) | (() => number);
    //     width?: number | string | (() => number) | (() => string);
    //     wmode?: string | (() => string);
    //     wrap?: string | (() => string);
    // }

    interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
        download?: any;
        href?: string | (() => string);
        hrefLang?: string | (() => string);
        media?: string | (() => string);
        rel?: string | (() => string);
        target?: string | (() => string);
        type?: string | (() => string);
    }

    // tslint:disable-next-line:no-empty-interface
    interface AudioHTMLAttributes<T> extends MediaHTMLAttributes<T> {}

    interface AreaHTMLAttributes<T> extends HTMLAttributes<T> {
        alt?: string | (() => string);
        coords?: string | (() => string);
        download?: any;
        href?: string | (() => string);
        hrefLang?: string | (() => string);
        media?: string | (() => string);
        rel?: string | (() => string);
        shape?: string | (() => string);
        target?: string | (() => string);
    }

    interface BaseHTMLAttributes<T> extends HTMLAttributes<T> {
        href?: string | (() => string);
        target?: string | (() => string);
    }

    interface BlockquoteHTMLAttributes<T> extends HTMLAttributes<T> {
        cite?: string | (() => string);
    }

    interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
        autoFocus?: boolean | (() => boolean);
        disabled?: boolean | (() => boolean);
        form?: string | (() => string);
        formAction?: string | (() => string);
        formEncType?: string | (() => string);
        formMethod?: string | (() => string);
        formNoValidate?: boolean | (() => boolean);
        formTarget?: string | (() => string);
        name?: string | (() => string);
        type?: string | (() => string);
        value?: string | string[] | number | (() => string) | (() => string[]) | (() => number);
    }

    interface CanvasHTMLAttributes<T> extends HTMLAttributes<T> {
        height?: number | string | (() => number) | (() => string);
        width?: number | string | (() => number) | (() => string);
    }

    interface ColHTMLAttributes<T> extends HTMLAttributes<T> {
        span?: number | (() => number);
        width?: number | string | (() => number) | (() => string);
    }

    interface ColgroupHTMLAttributes<T> extends HTMLAttributes<T> {
        span?: number | (() => number);
    }

    interface DetailsHTMLAttributes<T> extends HTMLAttributes<T> {
        open?: boolean | (() => boolean);
    }

    interface DelHTMLAttributes<T> extends HTMLAttributes<T> {
        cite?: string | (() => string);
        dateTime?: string | (() => string);
    }

    interface DialogHTMLAttributes<T> extends HTMLAttributes<T> {
        open?: boolean | (() => boolean);
    }

    interface EmbedHTMLAttributes<T> extends HTMLAttributes<T> {
        height?: number | string | (() => number) | (() => string);
        src?: string | (() => string);
        type?: string | (() => string);
        width?: number | string | (() => number) | (() => string);
    }

    interface FieldsetHTMLAttributes<T> extends HTMLAttributes<T> {
        disabled?: boolean | (() => boolean);
        form?: string | (() => string);
        name?: string | (() => string);
    }

    interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
        acceptCharset?: string | (() => string);
        action?: string | (() => string);
        autoComplete?: string | (() => string);
        encType?: string | (() => string);
        method?: string | (() => string);
        name?: string | (() => string);
        noValidate?: boolean | (() => boolean);
        target?: string | (() => string);
    }

    interface HtmlHTMLAttributes<T> extends HTMLAttributes<T> {
        manifest?: string | (() => string);
    }

    interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
        allowFullScreen?: boolean | (() => boolean);
        allowTransparency?: boolean | (() => boolean);
        frameBorder?: number | string | (() => number) | (() => string);
        height?: number | string | (() => number) | (() => string);
        marginHeight?: number | (() => number);
        marginWidth?: number | (() => number);
        name?: string | (() => string);
        sandbox?: string | (() => string);
        scrolling?: string | (() => string);
        seamless?: boolean | (() => boolean);
        src?: string | (() => string);
        srcDoc?: string | (() => string);
        width?: number | string | (() => number) | (() => string);
    }

    interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
        alt?: string | (() => string);
        crossOrigin?: "anonymous" | "use-credentials" | "";
        height?: number | string | (() => number) | (() => string);
        sizes?: string | (() => string);
        src?: string | (() => string);
        srcSet?: string | (() => string);
        useMap?: string | (() => string);
        width?: number | string | (() => number) | (() => string);
    }

    interface InsHTMLAttributes<T> extends HTMLAttributes<T> {
        cite?: string | (() => string);
        dateTime?: string | (() => string);
    }

    interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
        accept?: string | (() => string);
        alt?: string | (() => string);
        autoComplete?: string | (() => string);
        autoFocus?: boolean | (() => boolean);
        capture?: boolean | string; // https://www.w3.org/TR/html-media-capture/#the-capture-attribute
        checked?: boolean | (() => boolean);
        crossOrigin?: string | (() => string);
        disabled?: boolean | (() => boolean);
        form?: string | (() => string);
        formAction?: string | (() => string);
        formEncType?: string | (() => string);
        formMethod?: string | (() => string);
        formNoValidate?: boolean | (() => boolean);
        formTarget?: string | (() => string);
        height?: number | string | (() => number) | (() => string);
        list?: string | (() => string);
        max?: number | string | (() => number) | (() => string);
        maxLength?: number | (() => number);
        min?: number | string | (() => number) | (() => string);
        minLength?: number | (() => number);
        multiple?: boolean | (() => boolean);
        name?: string | (() => string);
        pattern?: string | (() => string);
        placeholder?: string | (() => string);
        readOnly?: boolean | (() => boolean);
        required?: boolean | (() => boolean);
        size?: number | (() => number);
        src?: string | (() => string);
        step?: number | string | (() => number) | (() => string);
        type?: string | (() => string);
        value?: string | string[] | number | (() => string) | (() => string[]) | (() => number);
        width?: number | string | (() => number) | (() => string);

        onChange?: ChangeEventHandler<T>;
    }

    interface KeygenHTMLAttributes<T> extends HTMLAttributes<T> {
        autoFocus?: boolean | (() => boolean);
        challenge?: string | (() => string);
        disabled?: boolean | (() => boolean);
        form?: string | (() => string);
        keyType?: string | (() => string);
        keyParams?: string | (() => string);
        name?: string | (() => string);
    }

    interface LabelHTMLAttributes<T> extends HTMLAttributes<T> {
        form?: string | (() => string);
        htmlFor?: string | (() => string);
    }

    interface LiHTMLAttributes<T> extends HTMLAttributes<T> {
        value?: string | string[] | number | (() => string) | (() => string[]) | (() => number);
    }

    interface LinkHTMLAttributes<T> extends HTMLAttributes<T> {
        as?: string | (() => string);
        crossOrigin?: string | (() => string);
        href?: string | (() => string);
        hrefLang?: string | (() => string);
        integrity?: string | (() => string);
        media?: string | (() => string);
        rel?: string | (() => string);
        sizes?: string | (() => string);
        type?: string | (() => string);
    }

    interface MapHTMLAttributes<T> extends HTMLAttributes<T> {
        name?: string | (() => string);
    }

    interface MenuHTMLAttributes<T> extends HTMLAttributes<T> {
        type?: string | (() => string);
    }

    interface MediaHTMLAttributes<T> extends HTMLAttributes<T> {
        autoPlay?: boolean | (() => boolean);
        controls?: boolean | (() => boolean);
        controlsList?: string | (() => string);
        crossOrigin?: string | (() => string);
        loop?: boolean | (() => boolean);
        mediaGroup?: string | (() => string);
        muted?: boolean | (() => boolean);
        playsinline?: boolean | (() => boolean);
        preload?: string | (() => string);
        src?: string | (() => string);
    }

    interface MetaHTMLAttributes<T> extends HTMLAttributes<T> {
        charSet?: string | (() => string);
        content?: string | (() => string);
        httpEquiv?: string | (() => string);
        name?: string | (() => string);
    }

    interface MeterHTMLAttributes<T> extends HTMLAttributes<T> {
        form?: string | (() => string);
        high?: number | (() => number);
        low?: number | (() => number);
        max?: number | string | (() => number) | (() => string);
        min?: number | string | (() => number) | (() => string);
        optimum?: number | (() => number);
        value?: string | string[] | number | (() => string) | (() => string[]) | (() => number);
    }

    interface QuoteHTMLAttributes<T> extends HTMLAttributes<T> {
        cite?: string | (() => string);
    }

    interface ObjectHTMLAttributes<T> extends HTMLAttributes<T> {
        classID?: string | (() => string);
        data?: string | (() => string);
        form?: string | (() => string);
        height?: number | string | (() => number) | (() => string);
        name?: string | (() => string);
        type?: string | (() => string);
        useMap?: string | (() => string);
        width?: number | string | (() => number) | (() => string);
        wmode?: string | (() => string);
    }

    interface OlHTMLAttributes<T> extends HTMLAttributes<T> {
        reversed?: boolean | (() => boolean);
        start?: number | (() => number);
        type?: '1' | 'a' | 'A' | 'i' | 'I';
    }

    interface OptgroupHTMLAttributes<T> extends HTMLAttributes<T> {
        disabled?: boolean | (() => boolean);
        label?: string | (() => string);
    }

    interface OptionHTMLAttributes<T> extends HTMLAttributes<T> {
        disabled?: boolean | (() => boolean);
        label?: string | (() => string);
        selected?: boolean | (() => boolean);
        value?: string | string[] | number | (() => string) | (() => string[]) | (() => number);
    }

    interface OutputHTMLAttributes<T> extends HTMLAttributes<T> {
        form?: string | (() => string);
        htmlFor?: string | (() => string);
        name?: string | (() => string);
    }

    interface ParamHTMLAttributes<T> extends HTMLAttributes<T> {
        name?: string | (() => string);
        value?: string | string[] | number | (() => string) | (() => string[]) | (() => number);
    }

    interface ProgressHTMLAttributes<T> extends HTMLAttributes<T> {
        max?: number | string | (() => number) | (() => string);
        value?: string | string[] | number | (() => string) | (() => string[]) | (() => number);
    }

    interface ScriptHTMLAttributes<T> extends HTMLAttributes<T> {
        async?: boolean | (() => boolean);
        charSet?: string | (() => string);
        crossOrigin?: string | (() => string);
        defer?: boolean | (() => boolean);
        integrity?: string | (() => string);
        noModule?: boolean | (() => boolean);
        nonce?: string | (() => string);
        src?: string | (() => string);
        type?: string | (() => string);
    }

    interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {
        autoComplete?: string | (() => string);
        autoFocus?: boolean | (() => boolean);
        disabled?: boolean | (() => boolean);
        form?: string | (() => string);
        multiple?: boolean | (() => boolean);
        name?: string | (() => string);
        required?: boolean | (() => boolean);
        size?: number | (() => number);
        value?: string | string[] | number | (() => string) | (() => string[]) | (() => number);
        onChange?: ChangeEventHandler<T>;
    }

    interface SourceHTMLAttributes<T> extends HTMLAttributes<T> {
        media?: string | (() => string);
        sizes?: string | (() => string);
        src?: string | (() => string);
        srcSet?: string | (() => string);
        type?: string | (() => string);
    }

    interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
        media?: string | (() => string);
        nonce?: string | (() => string);
        scoped?: boolean | (() => boolean);
        type?: string | (() => string);
    }

    interface TableHTMLAttributes<T> extends HTMLAttributes<T> {
        cellPadding?: number | string | (() => number) | (() => string);
        cellSpacing?: number | string | (() => number) | (() => string);
        summary?: string | (() => string);
    }

    interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
        autoComplete?: string | (() => string);
        autoFocus?: boolean | (() => boolean);
        cols?: number | (() => number);
        dirName?: string | (() => string);
        disabled?: boolean | (() => boolean);
        form?: string | (() => string);
        maxLength?: number | (() => number);
        minLength?: number | (() => number);
        name?: string | (() => string);
        placeholder?: string | (() => string);
        readOnly?: boolean | (() => boolean);
        required?: boolean | (() => boolean);
        rows?: number | (() => number);
        value?: string | string[] | number | (() => string) | (() => string[]) | (() => number);
        wrap?: string | (() => string);

        onChange?: ChangeEventHandler<T>;
    }

    interface TdHTMLAttributes<T> extends HTMLAttributes<T> {
        colSpan?: number | (() => number);
        headers?: string | (() => string);
        rowSpan?: number | (() => number);
        scope?: string | (() => string);
    }

    interface ThHTMLAttributes<T> extends HTMLAttributes<T> {
        colSpan?: number | (() => number);
        headers?: string | (() => string);
        rowSpan?: number | (() => number);
        scope?: string | (() => string);
    }

    interface TimeHTMLAttributes<T> extends HTMLAttributes<T> {
        dateTime?: string | (() => string);
    }

    interface TrackHTMLAttributes<T> extends HTMLAttributes<T> {
        default?: boolean | (() => boolean);
        kind?: string | (() => string);
        label?: string | (() => string);
        src?: string | (() => string);
        srcLang?: string | (() => string);
    }

    interface VideoHTMLAttributes<T> extends MediaHTMLAttributes<T> {
        height?: number | string | (() => number) | (() => string);
        playsInline?: boolean | (() => boolean);
        poster?: string | (() => string);
        width?: number | string | (() => number) | (() => string);
    }

    // this list is "complete" in that it contains every SVG attribute
    // that React supports, but the types can be improved.
    // Full list here: https://facebook.github.io/react/docs/dom-elements.html
    //
    // The three broad type categories are (in order of restrictiveness):
    //   - "number | string"
    //   - "string"
    //   - union of string literals
    interface SVGAttributes<T> extends DOMAttributes<T> {
         // extension
         onMounted?: ((this: SVGElement, ev: SyntheticEvent<T>) => any);
         onUnmounted?: ((this: SVGElement, ev: SyntheticEvent<T>) => any);
         focus?: boolean | (() => boolean);

        // Attributes which also defined in HTMLAttributes
        // See comment in SVGDOMPropertyConfig.js
        className?: string | (() => string);
        color?: string | (() => string);
        height?: number | string | (() => number) | (() => string);
        id?: string | (() => string);
        lang?: string | (() => string);
        max?: number | string | (() => number) | (() => string);
        media?: string | (() => string);
        method?: string | (() => string);
        min?: number | string | (() => number) | (() => string);
        name?: string | (() => string);
        style?: CSSProperties;
        target?: string | (() => string);
        type?: string | (() => string);
        width?: number | string | (() => number) | (() => string);

        // Other HTML properties supported by SVG elements in browsers
        role?: string | (() => string);
        tabIndex?: number | (() => number);

        // SVG Specific attributes
        accentHeight?: number | string | (() => number) | (() => string);
        accumulate?: "none" | "sum";
        additive?: "replace" | "sum";
        alignmentBaseline?: "auto" | "baseline" | "before-edge" | "text-before-edge" | "middle" | "central" | "after-edge" |
        "text-after-edge" | "ideographic" | "alphabetic" | "hanging" | "mathematical" | "inherit";
        allowReorder?: "no" | "yes";
        alphabetic?: number | string | (() => number) | (() => string);
        amplitude?: number | string | (() => number) | (() => string);
        arabicForm?: "initial" | "medial" | "terminal" | "isolated";
        ascent?: number | string | (() => number) | (() => string);
        attributeName?: string | (() => string);
        attributeType?: string | (() => string);
        autoReverse?: number | string | (() => number) | (() => string);
        azimuth?: number | string | (() => number) | (() => string);
        baseFrequency?: number | string | (() => number) | (() => string);
        baselineShift?: number | string | (() => number) | (() => string);
        baseProfile?: number | string | (() => number) | (() => string);
        bbox?: number | string | (() => number) | (() => string);
        begin?: number | string | (() => number) | (() => string);
        bias?: number | string | (() => number) | (() => string);
        by?: number | string | (() => number) | (() => string);
        calcMode?: number | string | (() => number) | (() => string);
        capHeight?: number | string | (() => number) | (() => string);
        clip?: number | string | (() => number) | (() => string);
        clipPath?: string | (() => string);
        clipPathUnits?: number | string | (() => number) | (() => string);
        clipRule?: number | string | (() => number) | (() => string);
        colorInterpolation?: number | string | (() => number) | (() => string);
        colorInterpolationFilters?: "auto" | "sRGB" | "linearRGB" | "inherit";
        colorProfile?: number | string | (() => number) | (() => string);
        colorRendering?: number | string | (() => number) | (() => string);
        contentScriptType?: number | string | (() => number) | (() => string);
        contentStyleType?: number | string | (() => number) | (() => string);
        cursor?: number | string | (() => number) | (() => string);
        cx?: number | string | (() => number) | (() => string);
        cy?: number | string | (() => number) | (() => string);
        d?: string | (() => string);
        decelerate?: number | string | (() => number) | (() => string);
        descent?: number | string | (() => number) | (() => string);
        diffuseConstant?: number | string | (() => number) | (() => string);
        direction?: number | string | (() => number) | (() => string);
        display?: number | string | (() => number) | (() => string);
        divisor?: number | string | (() => number) | (() => string);
        dominantBaseline?: number | string | (() => number) | (() => string);
        dur?: number | string | (() => number) | (() => string);
        dx?: number | string | (() => number) | (() => string);
        dy?: number | string | (() => number) | (() => string);
        edgeMode?: number | string | (() => number) | (() => string);
        elevation?: number | string | (() => number) | (() => string);
        enableBackground?: number | string | (() => number) | (() => string);
        end?: number | string | (() => number) | (() => string);
        exponent?: number | string | (() => number) | (() => string);
        externalResourcesRequired?: number | string | (() => number) | (() => string);
        fill?: string | (() => string);
        fillOpacity?: number | string | (() => number) | (() => string);
        fillRule?: "nonzero" | "evenodd" | "inherit";
        filter?: string | (() => string);
        filterRes?: number | string | (() => number) | (() => string);
        filterUnits?: number | string | (() => number) | (() => string);
        floodColor?: number | string | (() => number) | (() => string);
        floodOpacity?: number | string | (() => number) | (() => string);
        focusable?: number | string | (() => number) | (() => string);
        fontFamily?: string | (() => string);
        fontSize?: number | string | (() => number) | (() => string);
        fontSizeAdjust?: number | string | (() => number) | (() => string);
        fontStretch?: number | string | (() => number) | (() => string);
        fontStyle?: number | string | (() => number) | (() => string);
        fontVariant?: number | string | (() => number) | (() => string);
        fontWeight?: number | string | (() => number) | (() => string);
        format?: number | string | (() => number) | (() => string);
        from?: number | string | (() => number) | (() => string);
        fx?: number | string | (() => number) | (() => string);
        fy?: number | string | (() => number) | (() => string);
        g1?: number | string | (() => number) | (() => string);
        g2?: number | string | (() => number) | (() => string);
        glyphName?: number | string | (() => number) | (() => string);
        glyphOrientationHorizontal?: number | string | (() => number) | (() => string);
        glyphOrientationVertical?: number | string | (() => number) | (() => string);
        glyphRef?: number | string | (() => number) | (() => string);
        gradientTransform?: string | (() => string);
        gradientUnits?: string | (() => string);
        hanging?: number | string | (() => number) | (() => string);
        horizAdvX?: number | string | (() => number) | (() => string);
        horizOriginX?: number | string | (() => number) | (() => string);
        href?: string | (() => string);
        ideographic?: number | string | (() => number) | (() => string);
        imageRendering?: number | string | (() => number) | (() => string);
        in2?: number | string | (() => number) | (() => string);
        in?: string | (() => string);
        intercept?: number | string | (() => number) | (() => string);
        k1?: number | string | (() => number) | (() => string);
        k2?: number | string | (() => number) | (() => string);
        k3?: number | string | (() => number) | (() => string);
        k4?: number | string | (() => number) | (() => string);
        k?: number | string | (() => number) | (() => string);
        kernelMatrix?: number | string | (() => number) | (() => string);
        kernelUnitLength?: number | string | (() => number) | (() => string);
        kerning?: number | string | (() => number) | (() => string);
        keyPoints?: number | string | (() => number) | (() => string);
        keySplines?: number | string | (() => number) | (() => string);
        keyTimes?: number | string | (() => number) | (() => string);
        lengthAdjust?: number | string | (() => number) | (() => string);
        letterSpacing?: number | string | (() => number) | (() => string);
        lightingColor?: number | string | (() => number) | (() => string);
        limitingConeAngle?: number | string | (() => number) | (() => string);
        local?: number | string | (() => number) | (() => string);
        markerEnd?: string | (() => string);
        markerHeight?: number | string | (() => number) | (() => string);
        markerMid?: string | (() => string);
        markerStart?: string | (() => string);
        markerUnits?: number | string | (() => number) | (() => string);
        markerWidth?: number | string | (() => number) | (() => string);
        mask?: string | (() => string);
        maskContentUnits?: number | string | (() => number) | (() => string);
        maskUnits?: number | string | (() => number) | (() => string);
        mathematical?: number | string | (() => number) | (() => string);
        mode?: number | string | (() => number) | (() => string);
        numOctaves?: number | string | (() => number) | (() => string);
        offset?: number | string | (() => number) | (() => string);
        opacity?: number | string | (() => number) | (() => string);
        operator?: number | string | (() => number) | (() => string);
        order?: number | string | (() => number) | (() => string);
        orient?: number | string | (() => number) | (() => string);
        orientation?: number | string | (() => number) | (() => string);
        origin?: number | string | (() => number) | (() => string);
        overflow?: number | string | (() => number) | (() => string);
        overlinePosition?: number | string | (() => number) | (() => string);
        overlineThickness?: number | string | (() => number) | (() => string);
        paintOrder?: number | string | (() => number) | (() => string);
        panose1?: number | string | (() => number) | (() => string);
        pathLength?: number | string | (() => number) | (() => string);
        patternContentUnits?: string | (() => string);
        patternTransform?: number | string | (() => number) | (() => string);
        patternUnits?: string | (() => string);
        pointerEvents?: number | string | (() => number) | (() => string);
        points?: string | (() => string);
        pointsAtX?: number | string | (() => number) | (() => string);
        pointsAtY?: number | string | (() => number) | (() => string);
        pointsAtZ?: number | string | (() => number) | (() => string);
        preserveAlpha?: number | string | (() => number) | (() => string);
        preserveAspectRatio?: string | (() => string);
        primitiveUnits?: number | string | (() => number) | (() => string);
        r?: number | string | (() => number) | (() => string);
        radius?: number | string | (() => number) | (() => string);
        refX?: number | string | (() => number) | (() => string);
        refY?: number | string | (() => number) | (() => string);
        renderingIntent?: number | string | (() => number) | (() => string);
        repeatCount?: number | string | (() => number) | (() => string);
        repeatDur?: number | string | (() => number) | (() => string);
        requiredExtensions?: number | string | (() => number) | (() => string);
        requiredFeatures?: number | string | (() => number) | (() => string);
        restart?: number | string | (() => number) | (() => string);
        result?: string | (() => string);
        rotate?: number | string | (() => number) | (() => string);
        rx?: number | string | (() => number) | (() => string);
        ry?: number | string | (() => number) | (() => string);
        scale?: number | string | (() => number) | (() => string);
        seed?: number | string | (() => number) | (() => string);
        shapeRendering?: number | string | (() => number) | (() => string);
        slope?: number | string | (() => number) | (() => string);
        spacing?: number | string | (() => number) | (() => string);
        specularConstant?: number | string | (() => number) | (() => string);
        specularExponent?: number | string | (() => number) | (() => string);
        speed?: number | string | (() => number) | (() => string);
        spreadMethod?: string | (() => string);
        startOffset?: number | string | (() => number) | (() => string);
        stdDeviation?: number | string | (() => number) | (() => string);
        stemh?: number | string | (() => number) | (() => string);
        stemv?: number | string | (() => number) | (() => string);
        stitchTiles?: number | string | (() => number) | (() => string);
        stopColor?: string | (() => string);
        stopOpacity?: number | string | (() => number) | (() => string);
        strikethroughPosition?: number | string | (() => number) | (() => string);
        strikethroughThickness?: number | string | (() => number) | (() => string);
        string?: number | string | (() => number) | (() => string);
        stroke?: string | (() => string);
        strokeDasharray?: string | number;
        strokeDashoffset?: string | number;
        strokeLinecap?: "butt" | "round" | "square" | "inherit";
        strokeLinejoin?: "miter" | "round" | "bevel" | "inherit";
        strokeMiterlimit?: number | string | (() => number) | (() => string);
        strokeOpacity?: number | string | (() => number) | (() => string);
        strokeWidth?: number | string | (() => number) | (() => string);
        surfaceScale?: number | string | (() => number) | (() => string);
        systemLanguage?: number | string | (() => number) | (() => string);
        tableValues?: number | string | (() => number) | (() => string);
        targetX?: number | string | (() => number) | (() => string);
        targetY?: number | string | (() => number) | (() => string);
        textAnchor?: string | (() => string);
        textDecoration?: number | string | (() => number) | (() => string);
        textLength?: number | string | (() => number) | (() => string);
        textRendering?: number | string | (() => number) | (() => string);
        to?: number | string | (() => number) | (() => string);
        transform?: string | (() => string);
        u1?: number | string | (() => number) | (() => string);
        u2?: number | string | (() => number) | (() => string);
        underlinePosition?: number | string | (() => number) | (() => string);
        underlineThickness?: number | string | (() => number) | (() => string);
        unicode?: number | string | (() => number) | (() => string);
        unicodeBidi?: number | string | (() => number) | (() => string);
        unicodeRange?: number | string | (() => number) | (() => string);
        unitsPerEm?: number | string | (() => number) | (() => string);
        vAlphabetic?: number | string | (() => number) | (() => string);
        values?: string | (() => string);
        vectorEffect?: number | string | (() => number) | (() => string);
        version?: string | (() => string);
        vertAdvY?: number | string | (() => number) | (() => string);
        vertOriginX?: number | string | (() => number) | (() => string);
        vertOriginY?: number | string | (() => number) | (() => string);
        vHanging?: number | string | (() => number) | (() => string);
        vIdeographic?: number | string | (() => number) | (() => string);
        viewBox?: string | (() => string);
        viewTarget?: number | string | (() => number) | (() => string);
        visibility?: number | string | (() => number) | (() => string);
        vMathematical?: number | string | (() => number) | (() => string);
        widths?: number | string | (() => number) | (() => string);
        wordSpacing?: number | string | (() => number) | (() => string);
        writingMode?: number | string | (() => number) | (() => string);
        x1?: number | string | (() => number) | (() => string);
        x2?: number | string | (() => number) | (() => string);
        x?: number | string | (() => number) | (() => string);
        xChannelSelector?: string | (() => string);
        xHeight?: number | string | (() => number) | (() => string);
        xlinkActuate?: string | (() => string);
        xlinkArcrole?: string | (() => string);
        xlinkHref?: string | (() => string);
        xlinkRole?: string | (() => string);
        xlinkShow?: string | (() => string);
        xlinkTitle?: string | (() => string);
        xlinkType?: string | (() => string);
        xmlBase?: string | (() => string);
        xmlLang?: string | (() => string);
        xmlns?: string | (() => string);
        xmlnsXlink?: string | (() => string);
        xmlSpace?: string | (() => string);
        y1?: number | string | (() => number) | (() => string);
        y2?: number | string | (() => number) | (() => string);
        y?: number | string | (() => number) | (() => string);
        yChannelSelector?: string | (() => string);
        z?: number | string | (() => number) | (() => string);
        zoomAndPan?: string | (() => string);
    }

    //
    // React.DOM
    // ----------------------------------------------------------------------

    interface ReactHTML {
        a: DetailedHTMLFactory<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
        abbr: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        address: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        area: DetailedHTMLFactory<AreaHTMLAttributes<HTMLAreaElement>, HTMLAreaElement>;
        article: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        aside: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        audio: DetailedHTMLFactory<AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement>;
        b: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        base: DetailedHTMLFactory<BaseHTMLAttributes<HTMLBaseElement>, HTMLBaseElement>;
        bdi: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        bdo: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        big: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        blockquote: DetailedHTMLFactory<BlockquoteHTMLAttributes<HTMLElement>, HTMLElement>;
        body: DetailedHTMLFactory<HTMLAttributes<HTMLBodyElement>, HTMLBodyElement>;
        br: DetailedHTMLFactory<HTMLAttributes<HTMLBRElement>, HTMLBRElement>;
        button: DetailedHTMLFactory<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
        canvas: DetailedHTMLFactory<CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>;
        caption: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        cite: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        code: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        col: DetailedHTMLFactory<ColHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>;
        colgroup: DetailedHTMLFactory<ColgroupHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>;
        data: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        datalist: DetailedHTMLFactory<HTMLAttributes<HTMLDataListElement>, HTMLDataListElement>;
        dd: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        del: DetailedHTMLFactory<DelHTMLAttributes<HTMLElement>, HTMLElement>;
        details: DetailedHTMLFactory<DetailsHTMLAttributes<HTMLElement>, HTMLElement>;
        dfn: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        dialog: DetailedHTMLFactory<DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement>;
        div: DetailedHTMLFactory<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
        dl: DetailedHTMLFactory<HTMLAttributes<HTMLDListElement>, HTMLDListElement>;
        dt: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        em: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        embed: DetailedHTMLFactory<EmbedHTMLAttributes<HTMLEmbedElement>, HTMLEmbedElement>;
        fieldset: DetailedHTMLFactory<FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement>;
        figcaption: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        figure: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        footer: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        form: DetailedHTMLFactory<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;
        h1: DetailedHTMLFactory<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
        h2: DetailedHTMLFactory<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
        h3: DetailedHTMLFactory<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
        h4: DetailedHTMLFactory<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
        h5: DetailedHTMLFactory<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
        h6: DetailedHTMLFactory<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
        head: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLHeadElement>;
        header: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        hgroup: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        hr: DetailedHTMLFactory<HTMLAttributes<HTMLHRElement>, HTMLHRElement>;
        html: DetailedHTMLFactory<HtmlHTMLAttributes<HTMLHtmlElement>, HTMLHtmlElement>;
        i: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        iframe: DetailedHTMLFactory<IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>;
        img: DetailedHTMLFactory<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
        input: DetailedHTMLFactory<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
        ins: DetailedHTMLFactory<InsHTMLAttributes<HTMLModElement>, HTMLModElement>;
        kbd: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        keygen: DetailedHTMLFactory<KeygenHTMLAttributes<HTMLElement>, HTMLElement>;
        label: DetailedHTMLFactory<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;
        legend: DetailedHTMLFactory<HTMLAttributes<HTMLLegendElement>, HTMLLegendElement>;
        li: DetailedHTMLFactory<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>;
        link: DetailedHTMLFactory<LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>;
        main: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        map: DetailedHTMLFactory<MapHTMLAttributes<HTMLMapElement>, HTMLMapElement>;
        mark: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        menu: DetailedHTMLFactory<MenuHTMLAttributes<HTMLElement>, HTMLElement>;
        menuitem: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        meta: DetailedHTMLFactory<MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>;
        meter: DetailedHTMLFactory<MeterHTMLAttributes<HTMLElement>, HTMLElement>;
        nav: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        noscript: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        object: DetailedHTMLFactory<ObjectHTMLAttributes<HTMLObjectElement>, HTMLObjectElement>;
        ol: DetailedHTMLFactory<OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>;
        optgroup: DetailedHTMLFactory<OptgroupHTMLAttributes<HTMLOptGroupElement>, HTMLOptGroupElement>;
        option: DetailedHTMLFactory<OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>;
        output: DetailedHTMLFactory<OutputHTMLAttributes<HTMLElement>, HTMLElement>;
        p: DetailedHTMLFactory<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
        param: DetailedHTMLFactory<ParamHTMLAttributes<HTMLParamElement>, HTMLParamElement>;
        picture: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        pre: DetailedHTMLFactory<HTMLAttributes<HTMLPreElement>, HTMLPreElement>;
        progress: DetailedHTMLFactory<ProgressHTMLAttributes<HTMLProgressElement>, HTMLProgressElement>;
        q: DetailedHTMLFactory<QuoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>;
        rp: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        rt: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        ruby: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        s: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        samp: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        script: DetailedHTMLFactory<ScriptHTMLAttributes<HTMLScriptElement>, HTMLScriptElement>;
        section: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        select: DetailedHTMLFactory<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;
        small: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        source: DetailedHTMLFactory<SourceHTMLAttributes<HTMLSourceElement>, HTMLSourceElement>;
        span: DetailedHTMLFactory<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
        strong: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        style: DetailedHTMLFactory<StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement>;
        sub: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        summary: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        sup: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        table: DetailedHTMLFactory<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>;
        tbody: DetailedHTMLFactory<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
        td: DetailedHTMLFactory<TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>;
        textarea: DetailedHTMLFactory<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
        tfoot: DetailedHTMLFactory<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
        th: DetailedHTMLFactory<ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement>;
        thead: DetailedHTMLFactory<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
        time: DetailedHTMLFactory<TimeHTMLAttributes<HTMLElement>, HTMLElement>;
        title: DetailedHTMLFactory<HTMLAttributes<HTMLTitleElement>, HTMLTitleElement>;
        tr: DetailedHTMLFactory<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>;
        track: DetailedHTMLFactory<TrackHTMLAttributes<HTMLTrackElement>, HTMLTrackElement>;
        u: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        ul: DetailedHTMLFactory<HTMLAttributes<HTMLUListElement>, HTMLUListElement>;
        "var": DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
        video: DetailedHTMLFactory<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>;
        wbr: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    }

    interface ReactSVG {
        animate: SVGFactory;
        circle: SVGFactory;
        clipPath: SVGFactory;
        defs: SVGFactory;
        desc: SVGFactory;
        ellipse: SVGFactory;
        feBlend: SVGFactory;
        feColorMatrix: SVGFactory;
        feComponentTransfer: SVGFactory;
        feComposite: SVGFactory;
        feConvolveMatrix: SVGFactory;
        feDiffuseLighting: SVGFactory;
        feDisplacementMap: SVGFactory;
        feDistantLight: SVGFactory;
        feDropShadow: SVGFactory;
        feFlood: SVGFactory;
        feFuncA: SVGFactory;
        feFuncB: SVGFactory;
        feFuncG: SVGFactory;
        feFuncR: SVGFactory;
        feGaussianBlur: SVGFactory;
        feImage: SVGFactory;
        feMerge: SVGFactory;
        feMergeNode: SVGFactory;
        feMorphology: SVGFactory;
        feOffset: SVGFactory;
        fePointLight: SVGFactory;
        feSpecularLighting: SVGFactory;
        feSpotLight: SVGFactory;
        feTile: SVGFactory;
        feTurbulence: SVGFactory;
        filter: SVGFactory;
        foreignObject: SVGFactory;
        g: SVGFactory;
        image: SVGFactory;
        line: SVGFactory;
        linearGradient: SVGFactory;
        marker: SVGFactory;
        mask: SVGFactory;
        metadata: SVGFactory;
        path: SVGFactory;
        pattern: SVGFactory;
        polygon: SVGFactory;
        polyline: SVGFactory;
        radialGradient: SVGFactory;
        rect: SVGFactory;
        stop: SVGFactory;
        svg: SVGFactory;
        switch: SVGFactory;
        symbol: SVGFactory;
        text: SVGFactory;
        textPath: SVGFactory;
        tspan: SVGFactory;
        use: SVGFactory;
        view: SVGFactory;
    }

    interface ReactDOM extends ReactHTML, ReactSVG { }

    //
    // Browser Interfaces
    // https://github.com/nikeee/2048-typescript/blob/master/2048/js/touch.d.ts
    // ----------------------------------------------------------------------

    interface AbstractView {
        styleMedia: StyleMedia;
        document: Document;
    }

    interface Touch {
        identifier: number;
        target: EventTarget;
        screenX: number;
        screenY: number;
        clientX: number;
        clientY: number;
        pageX: number;
        pageY: number;
    }

    interface TouchList {
        [index: number]: Touch;
        length: number;
        item(index: number): Touch;
        identifiedTouch(identifier: number): Touch;
    }

}

declare global {
    namespace JSX {
        // tslint:disable-next-line:no-empty-interface
        interface Element extends React.ReactElement<any> { }
        interface ElementAttributesProperty { props: {}; }
        interface ElementChildrenAttribute { children: {}; }

        // tslint:disable-next-line:no-empty-interface
        interface IntrinsicAttributes extends React.Attributes { }
        // tslint:disable-next-line:no-empty-interface
        interface IntrinsicClassAttributes<T> extends React.ClassAttributes<T> { }

        export interface IntrinsicElements {
            // HTML
            a: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
            abbr: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            address: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            area: React.DetailedHTMLProps<React.AreaHTMLAttributes<HTMLAreaElement>, HTMLAreaElement>;
            article: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            aside: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            audio: React.DetailedHTMLProps<React.AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement>;
            b: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            base: React.DetailedHTMLProps<React.BaseHTMLAttributes<HTMLBaseElement>, HTMLBaseElement>;
            bdi: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            bdo: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            big: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            blockquote: React.DetailedHTMLProps<React.BlockquoteHTMLAttributes<HTMLElement>, HTMLElement>;
            body: React.DetailedHTMLProps<React.HTMLAttributes<HTMLBodyElement>, HTMLBodyElement>;
            br: React.DetailedHTMLProps<React.HTMLAttributes<HTMLBRElement>, HTMLBRElement>;
            button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
            canvas: React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>;
            caption: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            cite: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            code: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            col: React.DetailedHTMLProps<React.ColHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>;
            colgroup: React.DetailedHTMLProps<React.ColgroupHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>;
            data: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            datalist: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDataListElement>, HTMLDataListElement>;
            dd: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            del: React.DetailedHTMLProps<React.DelHTMLAttributes<HTMLElement>, HTMLElement>;
            details: React.DetailedHTMLProps<React.DetailsHTMLAttributes<HTMLElement>, HTMLElement>;
            dfn: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            dialog: React.DetailedHTMLProps<React.DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement>;
            div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
            dl: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDListElement>, HTMLDListElement>;
            dt: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            em: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            embed: React.DetailedHTMLProps<React.EmbedHTMLAttributes<HTMLEmbedElement>, HTMLEmbedElement>;
            fieldset: React.DetailedHTMLProps<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement>;
            figcaption: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            figure: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            footer: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            form: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;
            h1: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
            h2: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
            h3: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
            h4: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
            h5: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
            h6: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
            head: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadElement>, HTMLHeadElement>;
            header: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            hgroup: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            hr: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHRElement>, HTMLHRElement>;
            html: React.DetailedHTMLProps<React.HtmlHTMLAttributes<HTMLHtmlElement>, HTMLHtmlElement>;
            i: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            iframe: React.DetailedHTMLProps<React.IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>;
            img: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
            input: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
            ins: React.DetailedHTMLProps<React.InsHTMLAttributes<HTMLModElement>, HTMLModElement>;
            kbd: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            keygen: React.DetailedHTMLProps<React.KeygenHTMLAttributes<HTMLElement>, HTMLElement>;
            label: React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;
            legend: React.DetailedHTMLProps<React.HTMLAttributes<HTMLLegendElement>, HTMLLegendElement>;
            li: React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>;
            link: React.DetailedHTMLProps<React.LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>;
            main: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            map: React.DetailedHTMLProps<React.MapHTMLAttributes<HTMLMapElement>, HTMLMapElement>;
            mark: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            menu: React.DetailedHTMLProps<React.MenuHTMLAttributes<HTMLElement>, HTMLElement>;
            menuitem: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            meta: React.DetailedHTMLProps<React.MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>;
            meter: React.DetailedHTMLProps<React.MeterHTMLAttributes<HTMLElement>, HTMLElement>;
            nav: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            noindex: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            noscript: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            object: React.DetailedHTMLProps<React.ObjectHTMLAttributes<HTMLObjectElement>, HTMLObjectElement>;
            ol: React.DetailedHTMLProps<React.OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>;
            optgroup: React.DetailedHTMLProps<React.OptgroupHTMLAttributes<HTMLOptGroupElement>, HTMLOptGroupElement>;
            option: React.DetailedHTMLProps<React.OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>;
            output: React.DetailedHTMLProps<React.OutputHTMLAttributes<HTMLElement>, HTMLElement>;
            p: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
            param: React.DetailedHTMLProps<React.ParamHTMLAttributes<HTMLParamElement>, HTMLParamElement>;
            picture: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            pre: React.DetailedHTMLProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement>;
            progress: React.DetailedHTMLProps<React.ProgressHTMLAttributes<HTMLProgressElement>, HTMLProgressElement>;
            q: React.DetailedHTMLProps<React.QuoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>;
            rp: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            rt: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            ruby: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            s: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            samp: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            script: React.DetailedHTMLProps<React.ScriptHTMLAttributes<HTMLScriptElement>, HTMLScriptElement>;
            section: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            select: React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;
            small: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            source: React.DetailedHTMLProps<React.SourceHTMLAttributes<HTMLSourceElement>, HTMLSourceElement>;
            span: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
            strong: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            style: React.DetailedHTMLProps<React.StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement>;
            sub: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            summary: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            sup: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            table: React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>;
            tbody: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
            td: React.DetailedHTMLProps<React.TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>;
            textarea: React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
            tfoot: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
            th: React.DetailedHTMLProps<React.ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement>;
            thead: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
            time: React.DetailedHTMLProps<React.TimeHTMLAttributes<HTMLElement>, HTMLElement>;
            title: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTitleElement>, HTMLTitleElement>;
            tr: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>;
            track: React.DetailedHTMLProps<React.TrackHTMLAttributes<HTMLTrackElement>, HTMLTrackElement>;
            u: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            ul: React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>;
            "var": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            video: React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>;
            wbr: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

            // SVG
            svg: React.SVGProps<SVGSVGElement>;

            animate: React.SVGProps<SVGElement>; // TODO: It is SVGAnimateElement but is not in TypeScript's lib.dom.d.ts for now.
            animateTransform: React.SVGProps<SVGElement>; // TODO: It is SVGAnimateTransformElement but is not in TypeScript's lib.dom.d.ts for now.
            circle: React.SVGProps<SVGCircleElement>;
            clipPath: React.SVGProps<SVGClipPathElement>;
            defs: React.SVGProps<SVGDefsElement>;
            desc: React.SVGProps<SVGDescElement>;
            ellipse: React.SVGProps<SVGEllipseElement>;
            feBlend: React.SVGProps<SVGFEBlendElement>;
            feColorMatrix: React.SVGProps<SVGFEColorMatrixElement>;
            feComponentTransfer: React.SVGProps<SVGFEComponentTransferElement>;
            feComposite: React.SVGProps<SVGFECompositeElement>;
            feConvolveMatrix: React.SVGProps<SVGFEConvolveMatrixElement>;
            feDiffuseLighting: React.SVGProps<SVGFEDiffuseLightingElement>;
            feDisplacementMap: React.SVGProps<SVGFEDisplacementMapElement>;
            feDistantLight: React.SVGProps<SVGFEDistantLightElement>;
            feFlood: React.SVGProps<SVGFEFloodElement>;
            feFuncA: React.SVGProps<SVGFEFuncAElement>;
            feFuncB: React.SVGProps<SVGFEFuncBElement>;
            feFuncG: React.SVGProps<SVGFEFuncGElement>;
            feFuncR: React.SVGProps<SVGFEFuncRElement>;
            feGaussianBlur: React.SVGProps<SVGFEGaussianBlurElement>;
            feImage: React.SVGProps<SVGFEImageElement>;
            feMerge: React.SVGProps<SVGFEMergeElement>;
            feMergeNode: React.SVGProps<SVGFEMergeNodeElement>;
            feMorphology: React.SVGProps<SVGFEMorphologyElement>;
            feOffset: React.SVGProps<SVGFEOffsetElement>;
            fePointLight: React.SVGProps<SVGFEPointLightElement>;
            feSpecularLighting: React.SVGProps<SVGFESpecularLightingElement>;
            feSpotLight: React.SVGProps<SVGFESpotLightElement>;
            feTile: React.SVGProps<SVGFETileElement>;
            feTurbulence: React.SVGProps<SVGFETurbulenceElement>;
            filter: React.SVGProps<SVGFilterElement>;
            foreignObject: React.SVGProps<SVGForeignObjectElement>;
            g: React.SVGProps<SVGGElement>;
            image: React.SVGProps<SVGImageElement>;
            line: React.SVGProps<SVGLineElement>;
            linearGradient: React.SVGProps<SVGLinearGradientElement>;
            marker: React.SVGProps<SVGMarkerElement>;
            mask: React.SVGProps<SVGMaskElement>;
            metadata: React.SVGProps<SVGMetadataElement>;
            path: React.SVGProps<SVGPathElement>;
            pattern: React.SVGProps<SVGPatternElement>;
            polygon: React.SVGProps<SVGPolygonElement>;
            polyline: React.SVGProps<SVGPolylineElement>;
            radialGradient: React.SVGProps<SVGRadialGradientElement>;
            rect: React.SVGProps<SVGRectElement>;
            stop: React.SVGProps<SVGStopElement>;
            switch: React.SVGProps<SVGSwitchElement>;
            symbol: React.SVGProps<SVGSymbolElement>;
            text: React.SVGProps<SVGTextElement>;
            textPath: React.SVGProps<SVGTextPathElement>;
            tspan: React.SVGProps<SVGTSpanElement>;
            use: React.SVGProps<SVGUseElement>;
            view: React.SVGProps<SVGViewElement>;
        }
    }
}