import {ExcelComponent} from "@core/ExcelComponent";
import {$} from "@core/dom";
import {parse} from "@core/parse";

export class Formula extends ExcelComponent {
    constructor($root, settings) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            subscribe: ['currentText'],
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
        this.$on('cell:switch', $cell => {
            this.$formula.text($cell.getData('value'))
        })
    }
    storeChanged({currentText}) {
        this.$formula.text(currentText)
    }

    onInput(event) {
        this.$emitter('formula:input', $(event.target).text())
    }
    onKeydown(e) {
        const keys = ['Enter', 'Tab']
        if (keys.includes(e.code)) {
            e.preventDefault()
            this.$emitter('cell:focus')
        }
    }
}