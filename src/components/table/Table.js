import {ExcelComponent} from "@core/ExcelComponent";
import {creatTable} from "@/components/table/table.template";
import {tableResize} from "@/components/table/table.resize";
import {shouldResize} from "@/components/table/table.functions";

export class Table extends ExcelComponent {
    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown']
        });
    }
    static className = 'excel__table'
    toHTML() {
        return creatTable(20)
    }
    onClick() {
        console.log('click')
    }
    onMousedown(event) {
        const target = event.target
        if (shouldResize(target)) {
            tableResize(target, this.$root);
        }
    }
}