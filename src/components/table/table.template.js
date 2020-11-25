const CODE = {
    A: 'A'.charCodeAt(),
    Z: 'Z'.charCodeAt(),
    get colsCount() {
        return this.Z - this.A + 1
    }
}
const colContent = (content) => (
    `<div class="column">${content}</div>`
)

const cellContent = () => (
    `<div class="cell" contenteditable></div>`
)

const rowContent = (index, content) => (
    `<div class="row">
        <div class="row-info">${index}</div>
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
            rows += rowContent('', createCols(CODE.colsCount, CODE.A))
        }
    }
    return rows
}

export const creatTable = (count) => fillRows(count)