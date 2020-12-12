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
import {LocalStorageClient} from "@/data/LocalStorageClient";
import {StateProcessor} from "@/data/StateProcessorDIP";

export class ExcelPage extends Page {
    constructor(param) {
        super(param);
        this.processor = new StateProcessor(
            new LocalStorageClient(this.params)
        )
    }
    async getRoot() {
        const state = await this.processor.get()
        const store = new CreateStore(rootReducer, initialState(state))
        this.storeUnSub = store.subscribe(this.processor.listen)

        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store
        })
        return this.excel.getRoot()
    }
    afterRender() {
        this.excel.init()
    }
    destroy() {
        this.excel.destroy()
        this.storeUnSub()
    }
}