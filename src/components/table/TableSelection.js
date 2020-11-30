import {getColAndRow} from "@/components/table/table.functions";

class TableSelection {
    static active = 'selected'
    constructor() {
        this.group = []
        this.idGroup = []
        this.current = null
    }
    select($cell) {
        this.clear()
        this.group.push($cell)
        this.current = $cell
        $cell.focus().addClass(TableSelection.active)
    }

    selectGroup($cells) {
        this.clear()
        this.group = $cells
        $cells.forEach($cell => $cell.addClass(TableSelection.active))
    }
    clear() {
        this.group.forEach($c => $c.removeClass(TableSelection.active))
        this.group = []
    }
}
export default TableSelection