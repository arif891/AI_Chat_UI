export class DOMUtils {
    static findElement(root, selector) {
        return root.querySelector(selector);
    }

    static findElements(root, selector) {
        return root.querySelectorAll(selector);
    }

    static addClass(element, className) {
        element.classList.add(className);
    }

    static removeClass(element, className) {
        element.classList.remove(className);
    }

    static toggleClass(element, className) {
        element.classList.toggle(className);
    }

    static hasClass(element, className) {
        return element.classList.contains(className);
    }

    static setAttribute(element, attribute, value) {
        element.setAttribute(attribute, value);
    }

    static removeAttribute(element, attribute) {
        element.removeAttribute(attribute);
    }

    static dispatchEvent(root, eventName, detail = {}) {
        const event = new CustomEvent(eventName, {
            bubbles: true,
            cancelable: true,
            composed: false,
            detail: detail
        });
        root.dispatchEvent(event);
    }

    static insertHTML(element, position, html) {
        element.insertAdjacentHTML(position, html);
    }

    static removeElement(element) {
        element.remove();
    }

    static clearInnerHTML(element) {
        element.innerHTML = '';
    }
}

export function debounce(func, wait = 250) {
    let timeout;
    return function(...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }
  