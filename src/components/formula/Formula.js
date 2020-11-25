import {ExcelComponent} from "@core/ExcelComponent";

export class Formula extends ExcelComponent {
    constructor($root) {
        super($root, {
            name: 'Formula',
            listeners: ['input']
        });
    }
    static className = 'excel__formula'
    toHTML() {
        return `
            <div class="info">fx</div>
            <div class="input" contenteditable="true"></div>
        `
    }
    onInput(event) {
        console.log('Formula on input', event.target.innerText.trim())
    }
}