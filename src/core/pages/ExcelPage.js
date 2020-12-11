import {Page} from "@core/Page";
import CreateStore from "@core/store/CreateStore";
import {rootReducer} from "@core/redux/rootReducer";
import {initialState} from "@core/redux/initialState";
import {debounce, isDevelopment, storage} from "@core/utilites";
import {Excel} from "@/components/excel/Excel";
import {Header} from "@/components/header/Header";
import {Toolbar} from "@/components/toolbar/Toolbar";
import {Formula} from "@/components/formula/Formula";
import {Table} from "@/components/table/Table";

export class ExcelPage extends Page {
    getRoot() {
        const storageName = this.params?
            `excel:${this.params}` :
            `excel:${Date.now().toString()}`
        const store = new CreateStore(rootReducer, initialState(storageName))
        const stateListener = debounce(state => {
            if (isDevelopment()) {
                console.log('save state in storage', state)
            }
            storage(storageName, state)
        }, 300)
        store.subscribe(stateListener)

        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store
        })
        return this.excel.getRoot()
    }
    afterRender() {
        this.excel.init()
    }
}