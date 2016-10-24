'use strict'

class TodoComponent extends SatoriComponent {
	render(h) {
		return h('li', {class: {completed: () => this.state.todo.completed, editing: () => this.state.todo.editing}}, [
			h('div', {class: 'view'}, [
				h('input', {class: 'toggle', attr: {type: 'checkbox'},
					bind: {model: this.state.todo, key: 'completed'},
				}),
				h('label', {on: {dblclick: () => this.onLabelDblclick()}}, () => this.state.todo.title),
				h('button', {class: 'destroy', on: {click: () => this.state.model.remove(this.state.todo)}}),
			]),
			this.edit = h('input', {class: 'edit', on: {blur: () => this.saveEdit(this.state.todo, this.edit.value)},
				keydown: {
					[this.view.Key.ENTER]: () => this.edit.blur(),
					[this.view.Key.ESCAPE]: () => {this.state.todo.editing = false},
				},
			}),
		]);
	}

	onLabelDblclick() {
		this.edit.value = this.state.todo.title;
		this.state.todo.editing = true;
		this.view.focus(this.edit);
	}

	saveEdit(todo, newTitle) {
		if (!todo.editing) {
			return;
		}

		this.state.model.setTitle(todo, newTitle);
		todo.editing = false;
	}
}

if (typeof module !== 'undefined') {
	module.exports = TodoComponent;
}
