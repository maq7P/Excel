import {defaultStyles} from "@/constants";

export const capitalize = (string) => {
    if (typeof string !== 'string') {
        return ''
    }
    return string.charAt(0).toUpperCase() + string.slice(1)
}
export const range = (start, end) => {
    if ( end < start) {
        [start, end] = [end, start]
    }
    return new Array(end - start + 1)
        .fill('')
        .map((_, i) => start + i)
}
export const storage = (key, data) => {
    if (!data) {
        return JSON.parse(localStorage.getItem(key))
    }
    return localStorage.setItem(key, JSON.stringify(data))
}
export const isEqual = (a, b) => {
    if (typeof a === 'object' && typeof b === 'object') {
        //В нашем объекте не может быть методов и узлов DOM
        return JSON.stringify(a) === JSON.stringify(b)
    }
    return a === b
}
export const camelToDashCase = (str) => {
    return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}
export const toInlineStyles = (styles = {}) => {
    return Object.keys(styles)
        .map(key => `${camelToDashCase(key)}: ${styles[key]}`)
        .join(';')
}
export function debounce(callback, wait, context) {
    let timeout
    return (...args) => {
        clearInterval(timeout)
        timeout = setTimeout(() => {
            if (context) callback.apply(context, args)
            else callback(...args)
            clearInterval(timeout)
        }, wait)
    }
}