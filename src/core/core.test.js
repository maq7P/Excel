import {DOMListener} from "@core/DOMListener";
import {$} from "@core/dom";
import {ExcelComponent} from "@core/ExcelComponent";
import {StoreSubscribe} from "@core/StoreSubscribe";
import CreateStore from "@core/store/CreateStore";
import {capitalize} from "@core/utilites";

const initialState = {
    count: 0
}
const reducer = (state = initialState, action) => {
    if (action.type === 'ADD') {
        return {...state, count: state.count + 1}
    }
    return state
}

function getMethodName(listener) {
    return 'on' + capitalize(listener)
}

describe('CORE:', () => {
    let store
    let $root
    let fnLevelComponentLow
    let fnComponentMiddle
    let fnComponentHight
    let helperComponent
    let fnstoreChanged
    let fnPrepare

    class DOMList {
        constructor($root, listeners = []) {
            if (!$root) {
                throw new Error('no $root provide for DOMListener')
            }
            this.$root = $root
            this.listeners = listeners
        }

        initDOMListener() {
            fnComponentHight()
        }
    }
    class ExcelComp extends DOMList {
        constructor($root, options = {}) {
            super($root, options.listeners);
            this.subscriber = options.subscriber || []
            this.store = options.store
            this.subscribe = options.subscribe || []
            this.prepare()
        }
        prepare() {
        }
        static storeChanged() {
            fnstoreChanged()
        }
        init() {
            //this.prepare()
            this.initDOMListener()
            fnComponentMiddle()
            this.subscriber.subscribeComponents([Comp])
        }
        $dispatch(action) {
            this.store.dispatch(action)
        }
        isWatching(key) {
            return this.subscribe.includes(key)
        }
    }
    class Comp extends ExcelComp {
        constructor($root, settings) {
            super($root, {
                name: 'Table',
                listeners: ['click'],
                subscribe: ['count'],
                subscriber: new StoreSubscribe(store),
                store
            });
        }
        prepare() {
            fnPrepare()
        }
        init() {
            super.init()
            fnLevelComponentLow()
        }
        onClick() {
            fnLevelComponentLow()
        }
        storeChanged() {
            fnLevelComponentLow()
        }
        static isWatching() {
            return true
        }
    }

    beforeEach(() => {
        store = new CreateStore(reducer, initialState)
        $root = $('h1').create()
        fnLevelComponentLow = jest.fn()
        fnComponentMiddle = jest.fn()
        fnComponentHight = jest.fn()
        fnstoreChanged = jest.fn()
        fnPrepare = jest.fn()
    })
    test('should be defined DOMListener', () => {
        expect(new DOMListener($root)).toBeDefined()
    })
    test('should be defined ExcelComponent', () => {
        expect(new ExcelComponent($root)).toBeDefined()
    })
    test('should be defined StoreSubscribe', () => {
        expect(new StoreSubscribe(store)).toBeDefined()
    })
    test('should be call listener in component helper', () => {
        helperComponent = new Comp($root)
        helperComponent.onClick()
        expect(fnComponentHight).toHaveBeenCalled()
        expect(fnLevelComponentLow).toHaveBeenCalled()
    })
    test('should be call listener in DOMListeners and init in ExcelComponent',
        () => {
            helperComponent = new Comp($root)
            helperComponent.init()
            expect(fnComponentHight).toHaveBeenCalled()
            expect(fnComponentMiddle).toHaveBeenCalled()
    })
    test(
        `should work storeChanged which 
        reports about changes in store to component 
        that was subscribe on changes in store`,

        () => {
        store.subscribe(() => {})
        helperComponent = new Comp($root)
        helperComponent.init()
        helperComponent.$dispatch({type: 'ADD'})
        expect(fnstoreChanged).toHaveBeenCalled()
    })
    test('should be call hook of prepare before init', () => {
        helperComponent = new Comp($root)
        expect(fnPrepare).toHaveBeenCalled()
        helperComponent.init()
    })
    test('should return right method on from function getMethodName', () => {
        expect(getMethodName('click')).toBe('onClick')
    })
})