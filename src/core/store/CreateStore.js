export default class CreateStore {
    constructor(rootReducer, initialState = {}) {
        this.rootReducer = rootReducer
        this._state = this.rootReducer(initialState, {type: '__INIT__'})
        this._listeners = []
    }
    get getState() {
        return this._state
    }
    subscribe(cb) {
        this._listeners.push(cb)
        return () =>
            this._listeners = this._listeners.filter(l => l !== cb)
    }
    dispatch(action) {
        this._state = this.rootReducer(this._state, action)
        this._listeners.forEach(callback => callback(this._state))
    }
}