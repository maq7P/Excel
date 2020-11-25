import {capitalize} from "@core/utilites";

export class DOMListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error('no $root provide for DOMListener')
        }
        this.$root = $root
        this.listeners = listeners
    }
    initDOMListener() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            if (!this[method]) {
                throw new Error(`method ${method}
                is not existed in ${this.name}`)
            }
            this[method] = this[method].bind(this)
            this.$root.on(listener, this[method])
        })
    }
    removeDOMListener() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            if (!this[method]) {
                throw new Error(`method ${method}
                is not existed in ${this.name}`)
            }
            this.$root.off(listener, this[method])
        })
    }
}
function getMethodName(listener) {
    return 'on' + capitalize(listener)
}