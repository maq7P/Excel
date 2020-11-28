import {$} from "@core/dom";

export const tableResize = (target, $root) => {
    const $resizer = $(target)
    const $parentResizer = $(target).closest('[data-resizable]')
    const coords = $parentResizer.getCoordinates()

    const type = target.dataset.resize
    const sideProp = type === 'col' ? 'bottom' : 'right'
    let value;

    document.onmousemove = e => {
        $resizer.css({
            opacity: '1',
            [sideProp]: '-5000px'
        })
        if (type === 'col') {
            const delta = e.x - coords.right
            value = coords.width + delta
            $resizer.css({right: -delta + 'px'})
        } else if (type === 'row') {
            const delta = e.y - coords.bottom
            value = coords.height + delta
            $resizer.css({top: delta + coords.height + 'px'})
        }
    }

    document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null

        $resizer.css({
            opacity: '',
            [sideProp]: '',
        })

        if (type === 'col') {
            $parentResizer.css({width: value + 'px'})
            $resizer.css({right: ''})
            const parentId = $parentResizer.getData('resizable')
            $root
                .findAll(`[data-cell="${parentId}"]`)
                .forEach(cell => {
                    cell.style.width = value + 'px'
                })
        } else if (type === 'row') {
            $parentResizer.css({
                height: value + 'px'
            })
            $resizer.css({top: ''})
        }
    }
}