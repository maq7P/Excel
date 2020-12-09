export default class CreateStore {
    constructor(rootReducer, initialState = {}) {
        this.rootReducer = rootReducer
        this._state = this.rootReducer(initialState, {type: '__INIT__'})
        this._listeners = []
    }
    get getState() {
        return this._state
    }
    subscribe(callback) {
        this._listeners.push(callback)
        return {
            unsubscribe: () => {
                this._listeners.filter(listener => listener !== callback)
            }
        }
    }
    dispatch(action) {
        this._state = this.rootReducer(this._state, action)
        this._listeners.forEach(callback => callback(this._state))
    }
}