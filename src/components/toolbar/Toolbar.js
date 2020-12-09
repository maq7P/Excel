import {createToolbar} from "@/components/toolbar/toolbar.temlete";
import {$} from "@core/dom";
import {ExcelStateComponent} from "@core/ExcelStateComponent";
import {defaultStyles} from "@/constants";

export class Toolbar extends ExcelStateComponent {
    constructor($root, settings) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            subscribe: ['currentStyles'],
            ...settings
        });
    }
    static className = 'excel__toolbar'

    prepare() {
        this.initialState(defaultStyles)
    }

    get template() {
        return createToolbar(this.state)
    }

    toHTML() {
        return this.template
    }
    storeChanged(changes) {
        this.setState(changes.currentStyles)
    }

    onClick(e) {
        const $target = $(e.target)

        if ($target.isClosest('[data-value]')) {
            const $btn = $target.closest('[data-value]')
            const value = JSON.parse($btn.getData().value)
            this.$emitter('toolbar:applyStyle', value)
            // this.setState(value)
        }
    }
}