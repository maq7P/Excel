import {DOMListener} from "@core/DOMListener";

export class ExcelComponent extends DOMListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || ''
        this.subscribe = options.subscribe || []
        this.emitter = options.emitter
        this.store = options.store
        this.unsubsctiber = []
        this.reduxsub = null

        this.prepare()
    }

    //Возвращает шаблон компонента
    toHTML() {
        return ''
    }

    //Уведомляем слушателей про события
    $emitter(type, ...arg) {
        return this.emitter.dispatch(type, ...arg)
    }

    //Подписываемся на событие type
    $on(type, handler) {
        const unsub = this.emitter.subscribe(type, handler)
        this.unsubsctiber.push(unsub)
        return unsub
    }

    $dispatch(action) {
        this.store.dispatch(action)
    }

    //there is only such points which we subscribed
    storeChanged() {

    }

    isWatching(key) {
        return this.subscribe.includes(key)
    }

    //Настраиваем наш компонент до init
    prepare() {}

    //Инициализируем компонент
    //Добавляем DOM слушателей
    init() {
       //this.prepare()
        this.initDOMListener()
    }

    //Удаляем компонент
    //Чистим слушателей
    destroy() {
        this.removeDOMListener()
        this.unsubsctiber.forEach(unsub => unsub())
        this.reduxsub.unsubscribe()
    }
}