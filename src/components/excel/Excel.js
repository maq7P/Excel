import {$} from "@core/dom";
import {Emitter} from "@core/emmiter/Emmiter";
import {StoreSubscribe} from "@core/StoreSubscribe";
import {updateDateAC} from "@core/redux/actionCreators";

export class Excel {
    constructor(options) {
        this.components = options.components || []
        this.emitter = new Emitter()
        this.store = options.store
        this.subscriber = new StoreSubscribe(this.store)
    }
    getRoot() {
        const $root = $().create('div', 'excel')

        this.components = this.components.map(Component => {
            const $el = $().create('div', Component.className)
            const component = new Component($el, {
                emitter: this.emitter,
                store: this.store
            })
            $el.html(component.toHTML())
            $root.append($el)
            return component
        })
        return $root
    }
    init() {
        this.store.dispatch(updateDateAC())
        this.subscriber.subscribeComponents(this.components)
        this.components.forEach(component => component.init())
    }
    destroy() {
        this.subscriber.unsubscribeFromStore()
        this.components.forEach(component => component.destroy())
    }
}