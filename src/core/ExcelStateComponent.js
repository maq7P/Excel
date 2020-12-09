import {ExcelComponent} from "@core/ExcelComponent";

export class ExcelStateComponent extends ExcelComponent {
    get template() {
        // Just show and gotta refactoring
        return JSON.stringify(this.state)
    }

    initialState(initState) {
        this.state = {...initState}
    }

    setState(newState) {
        this.state = {...this.state, ...newState}
        this.$root.html(this.template)
    }
}