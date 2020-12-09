export class Emitter {
    constructor() {
        this.listeners = {}
    }
    test() {
        console.log('excited')
    }
    //Уведомляем слушателей, если они есть
    dispatch(type, ...args) {
        if (!Array.isArray(this.listeners[type])) {
            return false
        }
        this.listeners[type].forEach(listener => {
            listener(...args)
        })
        return true
    }

    //Подписываемся на уведомления
    //Добавляем нового слушателя
    //example :   formula.subscribe({name: 'click_down', handler: () => {}})
    subscribe(type, handler) {
        this.listeners[type] = this.listeners[type] || []
        this.listeners[type].push(handler)

        return () => {
            this.listeners[type] =
                this.listeners[type]
                    .filter(listener => listener !== handler)
        }
    }
}
/* EXAMPLE*/
// const emitter = new Emitter()
// const unsub = emitter.subscribe('Max', data => console.log('Sub', data))
// emitter.dispatch('Max', 23)
// emitter.dispatch('Max', 24)