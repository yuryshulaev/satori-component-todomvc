'use strict'

const view = new Satori();
const utils = {arrayRemove: view.arrayRemove};
const model = new TodosModel((JSON.parse(localStorage.getItem('todos-satori')) || []).map(todo => new Todo(todo)));
const save = () => {localStorage.setItem('todos-satori', JSON.stringify(model.todos))};
view.onEvent.add(view.throttle(50, save));
const app = new TodoAppComponent(view, {model}).mount(view.qs('.content'));
Router({'/:filter': filter => {app.state.filter = filter}}).init();
