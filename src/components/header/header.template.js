export const createHeader = (state) => {
    return `
        <input type="text" class="input" value="${state.value}">
        <div>
            <div class="button" data-icon='home'>
                <i class="material-icons">exit_to_app</i>
            </div>

            <div class="button" data-icon='del'>
                <i class="material-icons">delete</i>
            </div>
        </div>
    `
}