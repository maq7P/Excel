export class Page {
    constructor(params) {
        this.params = params
    }

    getRoot() {
        throw new Error('Method need to realize')
    }
    afterRender() {

    }
    destroy() {

    }
}