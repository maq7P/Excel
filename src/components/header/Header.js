import {createHeader} from "@/components/header/header.template";
import {ExcelStateComponent} from "@core/ExcelStateComponent";
import {changeHeaderAC} from "@core/redux/actionCreators";
import {$} from "@core/dom";
import {debounce} from "@core/utilites";

export class Header extends ExcelStateComponent {
    constructor($root, settings) {
        super($root, {
            name: 'Header',
            ...settings,
            listeners: ['input'],
        });
    }
    static className = 'excel__header'

    prepare() {
        this.onInput = debounce(this.onInput, 300, this)

        const initState = {value: this.store.getState.header} ||
                          {value: 'Новая таблица'}
        this.initialState(initState)
    }

    get template() {
        return createHeader(this.state)
    }

    toHTML() {
        return this.template
    }

    onInput(e) {
        this.$dispatch(changeHeaderAC($(e.target).text()))
    }
}