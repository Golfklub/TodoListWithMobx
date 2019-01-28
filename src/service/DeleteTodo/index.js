import { getTodo } from "../../FirebaseStore";

export const deleteTodo = TodoID => {
  getTodo(TodoID).delete();
};
