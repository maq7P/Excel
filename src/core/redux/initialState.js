import {storage} from "@core/utilites";
import {defaultStyles, defaultTitle} from "@/constants";

const defaultState = {
    header: defaultTitle,
    rowState: {},
    colState: {},
    dataState: {},
    currentText: '',
    currentStyles: defaultStyles,
    stylesState: {},
    openedDate: new Date().toJSON()
}
const normalize = state => {
    if (state) {
        return {
            ...state, currentText: '',
            currentStyles: defaultStyles
        }
    } else return null
}
export const initialState = (storageName) => {
    return normalize(storage(storageName)) || {...defaultState}
}