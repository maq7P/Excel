import {Emitter} from "@core/emmiter/Emmiter";

describe('Emmiter:', () => {
    let emitter
    let handler
    let unsub

    beforeEach(() => {
        emitter = new Emitter()
        handler = jest.fn()
        unsub = emitter.subscribe('test', handler)
    })
    test('should notify subscribers', () => {
        emitter.dispatch('test')
        expect(handler).toBeCalled()
    })
    test('should NOT notify if there is not a subscribe', () => {
        emitter.dispatch('no subscribe')
        expect(handler).not.toBeCalled()
    })
    test('should unsubscribe if there was call function-unsub', () => {
        emitter.dispatch('test')
        emitter.dispatch('test')
        unsub()
        emitter.dispatch('test')
        expect(handler).toHaveBeenCalledTimes(2)
    })
    test('should work with async code', () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                emitter.dispatch('test')
            }, 150)
            setTimeout(() => {
                expect(handler).toBeCalled()
                resolve()
            }, 200)
        })
    })
})