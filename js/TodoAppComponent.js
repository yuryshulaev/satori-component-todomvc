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

	render() {
		return this.view.section({class: 'todoapp'}, [
			this.view.header({class: 'header'}, [
				this.view.h1('todos'),
				this.view.input({class: 'new-todo', attr: {placeholder: 'What needs to be done?', autofocus: ''},
					keydown: this.view.inputKeyHandler(value => this.state.model.add(value), {reset: true}),
				}),
			]),
			this.view.section({class: 'main', show: () => this.state.model.todos.length}, [
				this.view.input({class: 'toggle-all', attr: {id: 'toggle-all', type: 'checkbox'},
					bind: {model: this.state.model, key: 'allCompleted'},
				}),
				this.view.label({attr: {for: 'toggle-all'}}, 'Mark all as complete'),
				this.view.ul({class: 'todo-list', list: {array: () => this.state.items, item: todo =>
					new TodoComponent(this.view, {model, todo}).render()
				}}),
			]),
			this.view.footer({class: 'footer', show: () => this.state.model.todos.length}, [
				this.view.span({class: 'todo-count'},
					() => [
						this.view.strong(this.state.model.remaining.length), ' ',
						this.view.pluralize('item', this.state.model.remaining.length), ' ', 'left',
					]
				),
				this.view.ul({class: 'filters'},
					() => Array.from(this.view.unproxy(this.state.filters)).map(filter =>
						this.view.li(
							this.view.a({class: {selected: () => filter[0] === this.state.filter},
								attr: {href: '#/' + filter[0]}, content: filter[1].title,
							})
						)
					)
				),
				this.view.button({class: 'clear-completed', show: () => this.state.model.completed.length,
					on: {click: () => this.state.model.clearCompleted()}, content: 'Clear completed',
				}),
			]),
		]);
	}
}

if (typeof module !== 'undefined') {
	module.exports = TodoAppComponent;
}
