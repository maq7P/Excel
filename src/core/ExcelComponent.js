import {DOMListener} from "@core/DOMListener";

export class ExcelComponent extends DOMListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || ''
        this.emitter = options.emitter
        this.unsubsctiber = []
    }
    //Возвращает шаблон компонента
    toHTML() {
        return ''
    }
    //Уведомляем слушателей про события
    $dispatch(type, ...arg) {
        return this.emitter.dispatch(type, ...arg)
    }
    //Подписываемся на событие type
    $on(type, handler) {
        const unsub = this.emitter.subscribe(type, handler)
        this.unsubsctiber.push(unsub)
        return unsub
    }
    //Настраиваем наш компонент до init
    prepare() {}
    //Инициализируем компонент
    //Добавляем DOM слушателей
    init() {
        this.prepare()
        this.initDOMListener()
    }
    //Удаляем компонент
    //Чистим слушателей
    destroy() {
        this.removeDOMListener()
        this.unsubsctiber.forEach(unsub => unsub())
    }
}