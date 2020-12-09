import './scss/index.scss'
import {Excel} from "@/components/excel/Excel"
import {Header} from "@/components/header/Header";
import {Toolbar} from "@/components/toolbar/Toolbar";
import {Formula} from "@/components/formula/Formula";
import {Table} from "@/components/table/Table";
import CreateStore from "@core/CreateStore";
import {rootReducer} from "@core/redux/rootReducer";
import {debounce, storage} from "@core/utilites";
import {initialState} from "@core/redux/initialState";

const store = new CreateStore(rootReducer, initialState)
const stateListener = debounce(state => {
    console.log('save state in storage', state)
    storage('excel-state', state)
}, 300)
store.subscribe(stateListener)

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store
})
excel.render()