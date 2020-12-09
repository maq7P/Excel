import {storage} from "@core/utilites";

const toHTML = (key) => {
    const model = storage(key)
    key = key.replace(":", "/")
    return `
        <li class="dashboard__record">
            <a href="#${key}">${model.header}</a>
            <strong>
                ${new Date(model.openedDate).toLocaleDateString()}
                ${new Date(model.openedDate).toLocaleTimeString()}
            </strong>
        </li>
    `
}
const getAllKey = () => {
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
        if (!localStorage.key(i).includes('excel')) {
            continue
        }
        keys.push(localStorage.key(i))
    }
    return keys
}
export const createRecordsTable = () => {
    return `
         <div class="dashboard__list-header">
            <span>Название</span>
            <span>Дата открытия</span>
        </div>
        <ul class="dashboard__list">
            ${getAllKey().map(toHTML).join('')}
        </ul>
    `
}