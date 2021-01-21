import {Table} from "@/components/table/Table";
import {defaultStyles} from "@/constants";
import {camelToDashCase, toInlineStyles} from "@core/utilites";
import {parse} from "@core/parse";
export const CODE = {
    A: 'A'.charCodeAt(),
    Z: 'Z'.charCodeAt(),
    get colsCount() {
        return this.Z - this.A + 1
    },
    get rowsCount() {
        return Table.COUNT_ROWS
    }
}
const DEFAULT_WIDTH = 'width: 120px;user-select: none;'
const DEFAULT_HEIGHT = 'height: 24px;user-select: none;'

const defineWidth = (state, col) => (
   state[col] ? `width: ${state[col]}px;` : DEFAULT_WIDTH
)
const defineHeight = (state, row) => (
    state[row] ? `height: ${state[row]}px;` : DEFAULT_HEIGHT
)

const colContent = (content, col, width = DEFAULT_WIDTH) => (
    `<div 
        class="column" 
        data-col="${col}"
        data-resizable
        style="${width}"
        >
            ${content}
        <div class="column-resize"  data-resize="col"></div>
    </div>`
)

const cellContent = (row, col, width = DEFAULT_WIDTH, state) => {
    const id = `${row}:${col}`
    const styles = toInlineStyles({...defaultStyles, ...state.stylesState[id]})
    const data = state.dataState[id]
    return `
        <div 
            contenteditable 
            class="cell" 
            data-cell="${col}" 
            data-id="${id}"
            data-type="cell"
            data-value="${data || ''}"
            style="${width}${styles};"
        >${data ? parse(data) : ''}</div>
    `
}

const rowContent = (index, content, height= DEFAULT_HEIGHT) => (
    `<div 
        class="row" 
        data-row="${index-1}"
        data-resizable
        style="${height}"
        >
        <div class="row-info">
            ${index ? 
                `${index} <div class="row-resize" data-resize="row"></div>` : 
                ''}
        </div>
        <div class="row-data">${content}</div>
    </div>`
)

function createCols(colsCount, start, row, state) {
    return new Array(colsCount)
        .fill('')
        .map((_, index) => String.fromCharCode(index + start))
        .map((item, col) =>
            colContent(item, col, defineWidth(state, col)))
        .join('')
}
function createCells(colsCount, start, row, state) {
    return new Array(colsCount)
        .fill(row)
        .map((row, col) =>
            cellContent(
                row, col,
                defineWidth(state.colState, col),
                state
            )
        )
        .join('')
}

function fillRows(count = 15, state) {
    let rows = ''
    for (let row = 0; row <= count; row++) {
        if (row) {
            rows +=
                rowContent(
                    row,
                    createCells(CODE.colsCount, null, row-1, state),
                    defineHeight(state.rowState, row-1)
                )
        } else {
            rows +=
                rowContent(
                    null,
                    createCols(CODE.colsCount, CODE.A, row, state.colState)
                )
        }
    }
    return rows
}

export const creatTable = (count, state) => fillRows(count, state)