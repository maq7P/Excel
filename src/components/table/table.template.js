import {Table} from "@/components/table/Table";
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
const colContent = (content, i) => (
    `<div class="column" data-resizable="${i}"">
        ${content}
        <div class="column-resize"  data-resize="col"></div>
    </div>`
)

const cellContent = (row, col) => (
    `<div 
        contenteditable 
        class="cell" 
        data-cell="${col}" 
        data-id="${row}:${col}"
        data-type="cell"
    ></div>`
)

const rowContent = (index, content) => (
    `<div class="row" data-resizable>
        <div class="row-info">
            ${index ? 
                `${index} <div class="row-resize" data-resize="row"></div>` : 
                ''}
        </div>
        <div class="row-data">${content}</div>
    </div>`
)

function createCols(colsCount, start, row) {
    return new Array(colsCount)
        .fill('')
        .map((_, index) => String.fromCharCode(index + start))
        .map(colContent)
        .join('')
}

function createCells(colsCount, start, row) {
    return new Array(colsCount)
        .fill(row)
        .map(cellContent)
        .join('')
}

function fillRows(count = 15) {
    let rows = ''
    for (let row = 0; row <= count; row++) {
        if (row) {
            rows += rowContent(row, createCells(CODE.colsCount, null, row-1))
        } else {
            rows += rowContent(null, createCols(CODE.colsCount, CODE.A, row))
        }
    }
    return rows
}

export const creatTable = (count) => fillRows(count)