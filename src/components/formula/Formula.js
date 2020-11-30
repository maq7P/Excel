import {ExcelComponent} from "@core/ExcelComponent";
import {$} from "@core/dom";

export class Formula extends ExcelComponent {
    constructor($root, settings) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...settings
        });
    }
    static className = 'excel__formula'
    toHTML() {
        return `
            <div class="info">fx</div>
            <div class="input" contenteditable="true" id="formula"></div>
        `
    }
    init() {
        super.init()
        this.$formula = this.$root.find('#formula')
        this.$on('CELL_SWITCH', (text) => {
            this.$formula.text(text)
        })
        this.$on('CELL_INPUT', (text) => {
            this.$formula.text(text)
        })
    }
    onInput(event) {
        this.$dispatch('FORMULA_INPUT', $(event.target).text())
    }
    onKeydown(e) {
        const keys = ['Enter', 'Tab']
        if (keys.includes(e.code)) {
            e.preventDefault()
            this.$dispatch('FOCUS_CELL')
        }
    }
}