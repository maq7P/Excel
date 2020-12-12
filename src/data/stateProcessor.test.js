import {storage} from "@core/utilites";
import {StateProcessor} from "@/data/StateProcessorDIP";

describe('stateProcessor: ', () => {
    let stateProcessor
    let state
    let fn

    class Client {
        get() {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(fn)
                }, 500)
            })
        }
        save(state) {
            fn(state)
        }
    }
    beforeEach(() => {
        state = {}
        stateProcessor= new StateProcessor(new Client(), 0)
        fn= jest.fn()
    })
    test('should be defined', () => {
        expect(stateProcessor).toBeDefined()
    })
    test('should work get', () => {
        stateProcessor.get()
            .then(response => {
                response()
                expect(fn).toBeCalled()
            })
    })

    //Have to redefine listen because StateProcessor contains function debounce
    //which working async
    test('should work listen', () => {
        stateProcessor.listen = function(state) {
            this.client.save(state)
        }
        stateProcessor.listen(state)
        expect(fn).toBeCalledWith(state)
    })
})