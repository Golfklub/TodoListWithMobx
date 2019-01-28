import { observable, computed, decorate } from "mobx";
import { TodoList, TodosList } from "./FirebaseStore";

class TodoStore {
  todos = TodosList.docs;
  pendingRequests = 0;

  get completedTodosCount() {
    return this.todos.filter(todo => todo.data.isFinished === true).length;
  }

  get report() {
    if (this.todos.length === 0) return;
    return (
      `Progress: ${this.completedTodosCount}/${this.todos.length}` +
      "______" +
      `Complete: ${this.namechecked}`
    );
  }

  get namechecked() {
    return this.todos
      .filter(todo => todo.data.isFinished === true)
      .map(todo => todo.data.title)
      .join(",");
  }

  // addTodo(task) {
  //   this.todos.push({
  //     task: task,
  //     completed: false,
  //     assignee: null
  //   });
  // }
}

const decorateTodoStore = decorate(TodoStore, {
  todos: observable,
  todosCheck: observable,
  todoName: observable,
  pendingRequests: observable,
  completedTodosCount: computed,
  report: computed,
  namechecked: computed
});

export const observableTodoStore = new decorateTodoStore();
