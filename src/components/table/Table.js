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
        return creatTable(Table.COUNT_ROWS)
    }
    prepare() {
        super.prepare();
        this.selection = new TableSelection()
    }

    init() {
        super.init()

        const $cell = this.$root.find('[data-id="0:0"]')
        this.selectCell($cell)

        this.$on('FORMULA_INPUT',
            (text) => {
                this.selection.current.text(text)
            })
        this.$on('FOCUS_CELL', () => {
            this.selection.current.focus()
        })
    }
    selectCell($cell) {
        this.selection.select($cell)
        this.$dispatch('CELL_SWITCH', $cell.text())
    }
    onMousedown(event) {
        const target = event.target
        if (shouldResize(target)) {
            tableResize(target, this.$root);
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
    onInput(e) {
        this.$dispatch('CELL_INPUT', $(e.target).text())
    }
}