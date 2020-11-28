const CODE = {
    A: 'A'.charCodeAt(),
    Z: 'Z'.charCodeAt(),
    get colsCount() {
        return this.Z - this.A + 1
    }
}
const colContent = (content, i) => (
    `<div class="column" data-resizable="${i}"">
        ${content}
        <div class="column-resize"  data-resize="col"></div>
    </div>`
)

const cellContent = (_, i) => (
    `<div contenteditable class="cell" data-cell="${i}"></div>`
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

function createCols(colsCount, start) {
    return new Array(colsCount)
        .fill('')
        .map((_, index) => String.fromCharCode(index + start))
        .map(colContent)
        .join('')
}

function createCells(colsCount) {
    return new Array(colsCount)
        .fill('')
        .map(cellContent)
        .join('')
}

function fillRows(count = 15) {
    let rows = ''
    for (let i = 0; i <= count; i++) {
        if (i) {
            rows += rowContent(i, createCells(CODE.colsCount))
        } else {
            rows += rowContent(null, createCols(CODE.colsCount, CODE.A))
        }
    }
    return rows
}

export const creatTable = (count) => fillRows(count)