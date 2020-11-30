import {range} from "@core/utilites";
import {$} from "@core/dom";
import {CODE} from "@/components/table/table.template";

export const shouldResize = (target) => {
    return target.dataset.resize
}
export const isCell = (target) => {
    return target.dataset.type === 'cell'
}
export const isGroup = (event) => {
    return event.shiftKey
}
export const getColAndRow = (str) => {
    const col = Number(str.slice(str.indexOf(':') + 1))
    const row = Number(str.slice(0, str.indexOf(':')))
    return [row, col]
}
export const matrix = (target, current) => {
    const targetCell = target.id(true)
    const activeCell = current.id(true)

    const cols = range(activeCell.col, targetCell.col)
    const rows = range(activeCell.row, targetCell.row)
    return rows.reduce((acc, row) => {
        cols.forEach(col => acc.push(`${row}:${col}`))
        return acc
    }, [])
}
export const nextSelector = (key, {row, col}) => {
    const MIN_VALUE = 0
    const MAX_COL = CODE.colsCount - 1
    const MAX_ROW = CODE.rowsCount - 1
    switch (key) {
        case 'Tab':
        case 'ArrowRight':
            col = col + 1 > MAX_COL ? MAX_COL : ++col
            break
        case 'Enter':
        case 'ArrowDown':
            row = row + 1 > MAX_ROW ? MAX_ROW : ++row
            break
        case 'ArrowUp':
            row = row - 1 < MIN_VALUE ? MIN_VALUE : --row
            break
        case 'ArrowLeft':
            col = col - 1 < MIN_VALUE ? MIN_VALUE : --col
            break
    }
    return `[data-id="${row}:${col}"]`

    // if ((key === 'Enter' || key === 'ArrowRight') &&
    //     col !== CODE.colsCount - 1) {
    //     col++
    // }
    // if ((key === 'Enter' || key === 'ArrowDown') &&
    //     row !== CODE.rowsCount - 1) {
    //     row++
    // }
    // if (key === 'ArrowUp' && row !== 0) {
    //     row--
    // }
    // if (key === 'ArrowLeft' && col !== 0) {
    //     col--
    // }
    // return `[data-id="${row}:${col}"]`
}