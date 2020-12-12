import {storage} from "@core/utilites";

export class LocalStorageClient {
    constructor(param) {
        this.storageName = `excel:${param}`
    }
    get() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(storage(this.storageName))
            }, 500)
        })
    }
    save(state) {
        storage(this.storageName, state)
        return Promise.resolve()
    }
}