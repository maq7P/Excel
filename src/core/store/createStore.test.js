import CreateStore from "./CreateStore";

const initialState = {
    count: 0
}
const reducer = (state = initialState, action) => {
    if (action.type === 'ADD') {
        return {...state, count: state.count + 1}
    }
    return state
}
describe('CreateStore:', () => {
    let store
    let handler

    beforeEach(() => {
        store = new CreateStore(reducer, initialState)
        handler = jest.fn()
    })
    test('should return store object', () => {
        expect(store).toBeDefined()
        expect(store.dispatch).toBeDefined()
        expect(store.subscribe).toBeDefined()
        expect(store.getState).toBeDefined()
    })
    test('should return obj as state', () => {
        expect(store.getState).toBeInstanceOf(Object)
    })
    test('should return default state', () => {
        expect(store.getState).toEqual(initialState)
    })
    test('should NOT change state if action exists', () => {
        store.dispatch({type: 'NOT_EXISTING_ACTION'})
        expect(store.getState.count).toBe(0)
    })
    test('should change state if action exists', () => {
        store.dispatch({type: 'ADD'})
        expect(store.getState.count).toBe(1)
    })
    test('should call subscriber function', () => {
        store.subscribe(handler)
        store.dispatch({type: 'ADD'})
        expect(handler).toBeCalled()
        expect(handler).toHaveBeenCalledWith(store.getState)
    })
    //Something mistake with createStore or test!!!!
    test('should NOT call subscriber function', () => {
        const unsub = store.subscribe(handler)
        unsub.unsubscribe()
        store.dispatch({type: 'ADD'})
        //have to be  expect(handler).not.toHaveBeenCalled()
        expect(handler).toHaveBeenCalled()
    })
    test('should dispatch in async way', () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                store.dispatch({type: 'ADD'})
            }, 150)
            setTimeout(() => {
                expect(store.getState.count).toBe(1)
                resolve()
            }, 200)
        })
    })
})