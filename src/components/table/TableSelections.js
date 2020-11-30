import {getColAndRow} from "@/components/table/table.functions";

class TableSelection {
    static active = 'selected'
    constructor() {
        this.group = []
        this.idGroup = []
    }
    select($cell) {
        this.clear()
        this.group.push($cell)
        this.current = getColAndRow($cell.getData('id'))
        //this.idGroup.push(getColAndRow($cell.getData('id')))
        $cell.addClass(TableSelection.active)
    }

    selectGroup($cell) {
        this.clearGroup()
        this.group.push($cell)

        this.idGroup.push(this.current)
        this.idGroup.push(getColAndRow($cell.getData('id')))
        this.logicSelectionOfCells()
    }

    logicSelectionOfCells() {
        const lenght = this.idGroup.length
        const lastCell = this.idGroup[lenght - 1]
        const firstCell = this.idGroup[0]
        this.selectArea(firstCell, lastCell)
    }

    //build square by two points
    selectArea(firstCell, lastCell) {
        let leftTop = firstCell
        let rightBottom = lastCell
        if ((leftTop[0] > rightBottom[0])) {
            [leftTop, rightBottom] = [rightBottom, leftTop]
        }
        let rightTop = [leftTop[0], rightBottom[1]]
        let leftBottom = [rightBottom[0], leftTop[1]]

        if ((leftTop[1] > rightBottom[1])) {
            [leftTop, rightTop] = [rightTop, leftTop];
            [leftBottom, rightBottom] = [rightBottom, leftBottom]
        }

        console.log(leftTop, 'LT')
        console.log(rightBottom, 'RB')
        console.log(rightTop, 'RT')
        console.log(leftBottom, 'LB')

        if (leftTop[1] !== 0) {
            let leftSide = []
            for (let i = leftTop[0]; i <= leftBottom[0]; i++) {
                leftSide = [...leftSide, [i, leftTop[1]].join(':')]
            }
            leftSide.forEach(cellId => {
                document.querySelector(`[data-id="${cellId}"]`)
                    .style.borderLeft = '1px solid #3c74ff'
            })
            this.leftSide = leftSide
        }
        if (leftTop[0] !== 0) {
            let topSide = []
            for (let i = leftTop[1]; i <= rightTop[1]; i++) {
                topSide = [...topSide, [leftTop[0], i].join(':')]
            }
            topSide.forEach(cellId => {
                document.querySelector(`[data-id="${cellId}"]`)
                    .style.borderTop= '1px solid #3c74ff'
            })
            this.topSide = topSide
        }

        let rightSide = []
        for (let i = rightTop[0]; i <= rightBottom[0]; i++) {
            rightSide = [...rightSide, [i, rightTop[1]].join(':')]
        }
        let bottomSide = []
        for (let i = leftBottom[1]; i <= rightBottom[1]; i++) {
            bottomSide = [...bottomSide, [leftBottom[0], i].join(':')]
        }
        // console.log(bottomSide)
        // console.log(rightSide)

        bottomSide.forEach(cellId => {
            document.querySelector(`[data-id="${cellId}"]`)
                .style.borderBottom = '1px solid #3c74ff'
        })
        rightSide.forEach(cellId => {
            document.querySelector(`[data-id="${cellId}"]`)
                .style.borderRight = '1px solid #3c74ff'
        })
        this.bottomSide = bottomSide
        this.rightSide = rightSide
    }

    clear() {
        this.group.forEach($c => $c.removeClass(TableSelection.active))
        this.group = []
        this.idGroup = []
        this.clearGroup()
    }
    clearGroup() {
        if (this.bottomSide) {
            this.bottomSide.forEach(cellId => {
                document.querySelector(`[data-id="${cellId}"]`)
                    .style.borderBottom = ''
            })
        }

        if (this.rightSide) {
            this.rightSide.forEach(cellId => {
                document.querySelector(`[data-id="${cellId}"]`)
                    .style.borderRight = ''
            })
        }

        if (this.leftSide) {
            this.leftSide.forEach(cellId => {
                document.querySelector(`[data-id="${cellId}"]`)
                    .style.borderLeft = ''
            })
        }

        if (this.topSide) {
            this.topSide.forEach(cellId => {
                document.querySelector(`[data-id="${cellId}"]`)
                    .style.borderTop = ''
            })
        }
    }
}
export default TableSelection