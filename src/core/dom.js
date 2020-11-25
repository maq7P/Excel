class DOM {
    constructor(selector) {
        this.native_elem = typeof selector === 'string' ?
            document.querySelector(selector) :
            selector
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
    //work without chain
    // node = {
    //     create(tagName, classes = '') {
    //         this.native_elem = document.createElement('div')
    //         if (classes) {
    //             this.native_elem.classList.add(classes)
    //         }
    //         return this.native_elem
    //     }
    // }
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