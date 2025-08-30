import { Todo } from "../types";

type Action =
  | { type: "ADD_TODO"; payload: string }
  | { type: "TOGGLE_TODO"; payload: number }
  | { type: "DELETE_TODO"; payload: number }    // <- добавлено
  | { type: "CLEAR_COMPLETED" };

export const LS_KEY = "mindbox-todos";

export const initialTodos: Todo[] = JSON.parse(localStorage.getItem(LS_KEY) || "[]");

export function todosReducer(state: Todo[], action: Action): Todo[] {
  let newState = state;
  switch (action.type) {
    case "ADD_TODO":
      newState = [...state, { id: Date.now(), text: action.payload, completed: false }];
      break;
    case "TOGGLE_TODO":
      newState = state.map((t) =>
        t.id === action.payload ? { ...t, completed: !t.completed } : t
      );
      break;
    case "DELETE_TODO":                      // <- добавлено
      newState = state.filter((t) => t.id !== action.payload);
      break;
    case "CLEAR_COMPLETED":
      newState = state.filter((t) => !t.completed);
      break;
    default:
      return state;
  }
  localStorage.setItem(LS_KEY, JSON.stringify(newState));
  return newState;
}
