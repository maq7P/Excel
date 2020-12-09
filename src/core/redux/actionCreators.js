import {
    TABLE_RESIZE,
    CHANGE_TEXT,
    CHANGE_STYLES,
    APPLY_STYLE, CHANGE_HEADER
} from "@core/redux/types";

export const tableResizeAC = (data) => {
    return {
        type: TABLE_RESIZE,
        data
    }
}
export const changeTextAC = (data) => {
    return {
        type: CHANGE_TEXT,
        data
    }
}
export const changeStylesAC = (data) => {
    return {
        type: CHANGE_STYLES,
        data
    }
}
export const applyStyleAC = (data) => {
    return {
        type: APPLY_STYLE,
        data
    }
}
export const changeHeaderAC = (data) => {
    return {
        type: CHANGE_HEADER,
        data
    }
}
