import React from "react";
import { observer, inject } from "mobx-react";
import { Icon, Checkbox } from "antd";
import Search from "antd/lib/input/Search";
import { createTodo } from "./service/CreateTodo";
import { deleteTodo } from "./service/DeleteTodo";
import { editTodo, completeTodo } from "./service/EditTodo";

const TodoList = inject("TodoStore")(
  observer(
    class TodoList extends React.Component {
      render() {
        const store = this.props.TodoStore;
        return (
          <div>
            {store.report}
            <div>
              <Search
                enterButton={<Icon type="plus" />}
                onSearch={value => this.onNewTodo(value)}
              />
            </div>
            <div style={{ marginTop: 10, marginBottom: 5, fontSize: 20 }}>
              {store.todos
                // .sort((a, b) => a.data.TodoTimeStamp - b.data.TodoTimeStamp)
                .map((todo, idx) => (
                  <TodoView todo={todo} key={idx} />
                ))}
            </div>
          </div>
        );
      }

      testcreateProject = e => {
        let payload = {};
        payload["title"] = e;
        payload["isFinished"] = false;
        payload["TodoTimeStamp"] = new Date();
        createTodo(payload);
      };

      onNewTodo = e => {
        this.testcreateProject(e);
      };
    }
  )
);

const TodoView = inject("TodoStore")(
  observer(
    class TodoView extends React.Component {
      state = { name: "" };
      render() {
        const todo = this.props.todo;
        return (
          <div>
            <Checkbox
              type="checkbox"
              checked={todo.data.isFinished}
              onChange={this.onToggleCompleted}
              style={{ marginRight: 10 }}
            />
            {todo.data.title}
            <Icon
              type="edit"
              theme="twoTone"
              style={{ cursor: "pointer", marginLeft: 10 }}
              onClick={this.onRename}
            />
            <Icon
              type="close-circle"
              theme="twoTone"
              onClick={() => this.ondeleteTodo(todo.task)}
              style={{ cursor: "pointer", marginLeft: 10 }}
            />
            {todo.assignee ? <small>{todo.assignee.name}</small> : null}
          </div>
        );
      }

      onToggleCompleted = () => {
        const todo = this.props.todo;
        todo.data.isFinished = !todo.data.isFinished;
        completeTodo(todo.id, todo.data.isFinished);
      };

      ondeleteTodo = () => {
        const todo = this.props.todo;
        deleteTodo(todo.id);
      };

      onRename = async () => {
        this.props.todo.data.title =
          prompt("Task name", this.props.todo.data.title) ||
          this.props.todo.data.title;
        await editTodo(this.props.todo.id, this.props.todo.data.title);
      };
    }
  )
);

export default TodoList;
