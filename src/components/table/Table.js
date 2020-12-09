import {ExcelComponent} from "@core/ExcelComponent";
import {creatTable} from "@/components/table/table.template";
import {tableResize} from "@/components/table/table.resize";
import {
    shouldResize,
    isCell,
    isGroup, matrix, nextSelector
} from "@/components/table/table.functions";
import TableSelection from "@/components/table/TableSelection";
import {$} from "@core/dom";
import {
    applyStyleAC,
    changeStylesAC,
    changeTextAC,
    tableResizeAC
} from "@core/redux/actionCreators";
import {defaultStyles} from "@/constants";
import {parse} from "@core/parse";

export class Table extends ExcelComponent {
    constructor($root, settings) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...settings
        });
    }
    static className = 'excel__table'
    static COUNT_ROWS = 20

    toHTML() {
        return creatTable(Table.COUNT_ROWS, this.store.getState)
    }
    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()
        const $cell = this.$root.find('[data-id="0:0"]')
        this.selectCell($cell)

        this.$on('formula:input',
        (value) => {
            this.selection.current
                .attr('data-value', value)
                .text(parse(value))
            this.updateTextInStore(value)
        })

        this.$on('cell:focus', () => {
            this.selection.current.focus()
        })

       this.$on('toolbar:applyStyle', value => {
           this.$dispatch(applyStyleAC({
               value,
               ids: this.selection.selectedIds
           }))
           this.selection.applyStyle(value)
       })
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emitter('cell:switch', $cell)

        const styles = $cell.getStyle(Object.keys(defaultStyles))
        this.$dispatch(changeStylesAC(styles))
    }

    async resizeTable(target) {
        try {
            const data = await tableResize(target, this.$root)
            this.$dispatch(tableResizeAC(data))
        } catch (e) {
            console.warn('Resize error', e.message)
        }
    }

    onMousedown(event) {
        const target = event.target
        if (shouldResize(target)) {
            this.resizeTable(target)
        }
        if (isCell(target) && !isGroup(event)) {
            this.selectCell($(target))
        }
        if (isCell(target) && isGroup(event)) {
            const $cells = matrix($(target), this.selection.current)
                .map(id => this.$root.find(`[data-id="${id}"]`))
            this.selection.selectGroup($cells)
        }
    }

    onKeydown(e) {
        const keys = [
            'Tab',
            'Enter',
            'ArrowUp',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight',
        ]
        const {key} = e
        if (keys.includes(key) && !e.shiftKey) {
            e.preventDefault()
            const id = this.selection.current.id(true)
            const $cell = this.$root.find(nextSelector(key, id))
            this.selectCell($cell)
        }
    }

    updateTextInStore(value) {
        this.$dispatch(changeTextAC({
            id: this.selection.current.id(),
            value
        }))
    }

    onInput(e) {
        const value = $(e.target).text()
        this.selection.current.attr('data-value', value)
        //this.selection.current.attr('data-value', value)
        this.updateTextInStore(value)
    }
}