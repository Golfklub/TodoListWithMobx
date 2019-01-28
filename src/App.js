import React, { Component } from "react";
import TodoList from "./TodoList";
import { observableTodoStore } from "./TodoStore";
import { Input, DatePicker, Layout } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";
import { observer, Provider } from "mobx-react";
import { TodosList } from "./FirebaseStore";

// const TodoStore = new observableTodoStore();

const App = observer(
  class App extends Component {
    render() {
      const CustomContent = styled.div`
        background: #ffffff;
        width: 30%;
        padding: 30px;
        margin: auto;
      `;

      return (
        <div
          style={{
            textAlign: "center",
            backgroundColor: "#f2f2f2",
            height: "100vh",
            paddingTop: 30
          }}
        >
          <CustomContent>
            <Provider TodoStore={observableTodoStore}>
              <TodoList />
            </Provider>
          </CustomContent>
        </div>
      );
    }
  }
);
export default App;
