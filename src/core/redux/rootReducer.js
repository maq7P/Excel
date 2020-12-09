import {
    APPLY_STYLE, CHANGE_HEADER,
    CHANGE_STYLES,
    CHANGE_TEXT,
    TABLE_RESIZE, UPDATE_DATE
} from "@core/redux/types";
import {toInlineStyles} from "@core/utilites";

export const rootReducer = (state, action) => {
    let field
    let prevState
    switch (action.type) {
        case TABLE_RESIZE:
            field = action.data.type === 'row' ? 'rowState' : 'colState'
            return {
                ...state,
                [field]: val(state, action, field)
            }
        case CHANGE_TEXT:
            field = 'dataState'
            return {
                ...state,
                dataState: val(state, action, field),
                currentText: action.data.value
            }
        case CHANGE_STYLES:
            return {
                ...state,
                currentStyles: action.data
            }
        case APPLY_STYLE:
            field = 'stylesState'
            prevState = {...state[field]} || {}
            action.data.ids.forEach(id => {
                prevState[id] = {...prevState[id], ...action.data.value}
            })
            return {
                ...state,
                [field]: prevState,
                currentStyles: {...state.currentStyles, ...action.data.value}
            }
        case CHANGE_HEADER:
            return {
                ...state,
                header: action.data
            }
        case UPDATE_DATE:
            return {
                ...state,
                openedDate: new Date().toJSON()
            }
        default: return state
    }
}
function val(state, action, field) {
    const prevState = state[field] || {}
    prevState[action.data.id] = action.data.value
    return prevState
}
