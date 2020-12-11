import {Router} from "./Router";
import {Page} from "../Page";

class DashboardPage extends Page {
    getRoot() {
        const root = document.createElement('div')
        root.innerHTML = 'Dashboard'
        return root
    }
}
class ExcelPage extends Page {}

describe('Router:', () => {
    let router
    let $root
    beforeEach(() => {
        $root = document.createElement('div')
        router = new Router($root, {
            dashboard: DashboardPage,
            excel: ExcelPage
        })
    })
    test('should be defined', () => {
        expect(router).toBeDefined()
    })
    test('should contains root', () => {
        expect($root.innerHTML).toBe('<div>Dashboard</div>')
    })
})