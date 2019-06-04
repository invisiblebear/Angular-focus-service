import { Injectable } from '@angular/core';

@Injectable()
export class FocusService {
    constructor() {}

    private async delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    set(el: string) {
        const element = document.querySelector(el) as HTMLElement;
        if (element) {
            element.focus();
        }
    }

    first(el: string) {
        this.delay(0).then(() => {
            const container = document.querySelector(el) as HTMLElement;

            const focusableElements = this.getFocusableElements(container);
            if (focusableElements.length > 0) {
                (focusableElements[0] as HTMLElement).focus();
            }
        });
    }

    trap(el: string) {
        this.delay(0).then(() => {
            const container = document.querySelector(el) as HTMLElement;
            const focusableEls = this.getFocusableElements(container);
            const KEYCODE_TAB = 9;
            let visibleFocusableEls = [];

            container.addEventListener('keydown', (e) => {
                const isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);

                if (!isTabPressed) {
                    return;
                }

                visibleFocusableEls = this.enabledAndVisible(focusableEls);
                const firstFocusableEl = visibleFocusableEls[0];
                const lastFocusableEl = visibleFocusableEls[visibleFocusableEls.length - 1];

                if (e.shiftKey) /* shift + tab */ {
                    if (document.activeElement === firstFocusableEl) {
                        lastFocusableEl.focus();
                        e.preventDefault();
                    }
                } else /* tab */ {
                    if (document.activeElement === lastFocusableEl) {
                        firstFocusableEl.focus();
                        e.preventDefault();
                    }
                }
            });
        });
    }

    getFocusableElements(container: HTMLElement) {
        return container.querySelectorAll('a[href], button, textarea, [role="tab"], [tabindex="0"], input[type="tel"], input[type="text"], input[type="search"], input[type="radio"], input[type="checkbox"], select') as any;
    }

    private enabledAndVisible(focusableEls) {
        const elements = [];
        for (const el of focusableEls) {
            const shown = window.getComputedStyle(el, null).getPropertyValue('display');
            const disabled = el.disabled;
            if (shown !== 'none' && !disabled) {
                elements.push(el); // create array of only visible elements that are enabled
            }
        }
        return elements;
    }
}
