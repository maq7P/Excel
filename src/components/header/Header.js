import {ExcelComponent} from "@core/ExcelComponent";

export class Header extends ExcelComponent {
    constructor($root, settings) {
        super($root, {
            name: 'Header',
            ...settings
        });
    }
    static className = 'excel__header'

    toHTML() {
        return `
            <input type="text" class="input" value="Новая таблицa">
            <div>
                <div class="button">
                    <i class="material-icons">exit_to_app</i>
                </div>

                <div class="button">
                    <i class="material-icons">delete</i>
                </div>
            </div>
        `
    }
}