'use strict'

class TodoAppComponent extends SatoriComponent {
	initialize() {
		this.view.observer('items', () => {
			const filterFunc = this.view.unproxy(this.state.filters).get(this.state.filter).func;
			this.state.items = this.state.model.todos.filter(filterFunc);
		});
	}

	getDefaultState() {
		return {
			filters: new Map([
				['all', {title: 'All', func: () => true}],
				['active', {title: 'Active', func: todo => !todo.completed}],
				['completed', {title: 'Completed', func: todo => todo.completed}],
			]),

			filter: 'all',
		};
	}

	render(h) {
		return h('section', {class: 'todoapp'}, [
			h('header', {class: 'header'}, [
				h('h1', null, 'todos'),
				h('input', {class: 'new-todo', attr: {placeholder: 'What needs to be done?', autofocus: ''},
					keydown: this.view.inputKeyHandler(value => this.state.model.add(value), {reset: true}),
				}),
			]),
			h('section', {class: 'main', show: () => this.state.model.todos.length}, [
				h('input', {class: 'toggle-all', attr: {id: 'toggle-all', type: 'checkbox'},
					bind: {model: this.state.model, key: 'allCompleted'},
				}),
				h('label', {attr: {for: 'toggle-all'}}, 'Mark all as complete'),
				h('ul', {class: 'todo-list', list: {array: () => this.state.items, item: todo =>
					new TodoComponent(this.view, {model, todo})
				}}),
			]),
			h('footer', {class: 'footer', show: () => this.state.model.todos.length}, [
				h('span', {class: 'todo-count'},
					() => [
						h('strong', null, this.state.model.remaining.length), ' ',
						this.view.pluralize('item', this.state.model.remaining.length), ' ', 'left',
					]
				),
				h('ul', {class: 'filters'},
					() => Array.from(this.view.unproxy(this.state.filters)).map(filter =>
						h('li', null,
							h('a', {class: {selected: () => filter[0] === this.state.filter},
								attr: {href: '#/' + filter[0]}, content: filter[1].title,
							})
						)
					)
				),
				h('button', {class: 'clear-completed', show: () => this.state.model.completed.length,
					on: {click: () => this.state.model.clearCompleted()}, content: 'Clear completed',
				}),
			]),
		]);
	}
}

if (typeof module !== 'undefined') {
	module.exports = TodoAppComponent;
}
