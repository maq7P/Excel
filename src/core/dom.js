class DOM {
    constructor(selector) {
        this.native_elem = typeof selector === 'string' ?
            document.querySelector(selector) :
            selector
    }

    find(selectors) {
        return $(this.native_elem.querySelector(selectors))
    }
    findAll(selectors) {
        return this.native_elem.querySelectorAll(selectors)
    }
    create(tagName, classes = '') {
        this.native_elem = document.createElement('div')
        if (classes) {
            this.native_elem.classList.add(classes)
        }
        return this
    }
    html(html) {
        if (typeof html === 'string') {
            this.native_elem.innerHTML = html
            return this
        }
        return this.native_elem.innerHTML
    }
    text(text) {
        if (typeof text !== 'undefined') {
            this.native_elem.textContent = text
            return this
        }
        if (this.native_elem.tagName === 'INPUT') {
            return this.native_elem.value.trim()
        }
        return this.native_elem.textContent.trim()
    }
    clear() {
        this.html('')
        return this
    }
    append(node) {
        if (node instanceof DOM) node = node.native_elem

        if (Element.prototype.append) {
            this.native_elem.append(node)
        } else {
            this.native_elem.appendChild(node)
        }
        return this
    }
    on(action, cb) {
        this.native_elem.addEventListener(action, cb)
    }
    off(action, cb) {
        this.native_elem.removeEventListener(action, cb)
    }
    closest(attribute) {
        return $(this.native_elem.closest(attribute))
    }
    isClosest(attribute) {
        return !!this.native_elem.closest(attribute)
    }
    getCoordinates() {
        return this.native_elem.getBoundingClientRect()
    }
    getData(name) {
        if (name) {
            return this.native_elem.dataset[name]
        }
        return this.native_elem.dataset
    }
    id(parse) {
        if (parse) {
            return {
                row: +this.id().split(':')[0],
                col: +this.id().split(':')[1]
            }
        }
        return this.getData('id')
    }
    focus() {
        this.native_elem.focus()
        return this
    }

    css(styles = {}) {
       /*Можно так*/
       //  for (const style in styles) {
       //      if (Object.prototype.hasOwnProperty.call(styles, style)) {
       //          this.native_elem.style[style] = styles[style]
       //      }
       // }
        Object.keys(styles).forEach(style => {
            this.native_elem.style[style] = styles[style]
        })
        return this
    }
    getStyle(styles) {
        return styles.reduce((result, style) => {
            result[style] = this.native_elem.style[style]
            return result
        }, {})
    }
    addClass(className) {
        this.native_elem.classList.add(className)
        return this
    }
    removeClass(className) {
        this.native_elem.classList.remove(className)
        return this
    }
    getClass() {
        return this.native_elem.className
    }
    isClass(className) {
        return this.native_elem.classList.contains(className)
    }
    attr(name, value) {
        if (value !== 'undefined') {
            this.native_elem.setAttribute(name, value)
            return this
        }
        return this.native_elem.getAttribute(name)
    }
}
export const $ = (selector = null) => {
    return new DOM(selector)
}
// $.create = (tagName, classes = '') => {
//     const el = document.createElement(tagName)
//     if (classes) {
//         el.classList.add(classes)
//     }
//     return $(el)
// }