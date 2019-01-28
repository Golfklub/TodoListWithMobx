import { TodosList } from "../../FirebaseStore";

export const createTodo = data => {
  return TodosList.add(data);
};
