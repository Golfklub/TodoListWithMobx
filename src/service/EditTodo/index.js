import { getTodo } from "../../FirebaseStore";

export const editTodo = (TodoID, Data) => {
  getTodo(TodoID).update({ title: Data });
};

export const completeTodo = (TodoID, Data) => {
  getTodo(TodoID).update({ isFinished: Data });
};
