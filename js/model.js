'use strict'

class Todo {
	constructor(data) {
		Object.assign(this, data);
	}

	toJSON() {
		return {title: this.title, completed: this.completed};
	}
}

class TodosModel {
	constructor(todos) {
		this.todos = todos || [];
	}

	add(title) {
		this.todos.push(new Todo({title: title.trim(), completed: false}));
	}

	setTitle(todo, title) {
		(todo.title = title.trim()) || this.remove(todo);
	}

	remove(todo) {
		utils.arrayRemove(this.todos, todo);
	}

	get remaining() {
		return this.todos.filter(todo => !todo.completed);
	}

	get completed() {
		return this.todos.filter(todo => todo.completed);
	}

	clearCompleted() {
		this.todos = this.remaining;
	}

	get allCompleted() {
		return !this.remaining.length;
	}

	set allCompleted(value) {
		this.todos.forEach(todo => {todo.completed = value});
	}
}

if (typeof module !== 'undefined') {
	module.exports = {Todo, TodosModel};
}
