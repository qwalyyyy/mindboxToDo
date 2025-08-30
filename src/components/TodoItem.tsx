import React from "react";
import { Todo } from "../types";

interface Props {
  todo: Todo;
  onToggle: (id: number) => void;
  onDestroy: (id: number) => void;
}

export const TodoItem: React.FC<Props> = ({ todo, onToggle, onDestroy }) => {
  const checkboxId = `todo-${todo.id}`;
  return (
    <li style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
      <input
        id={checkboxId}
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        style={{ marginRight: 8 }}
      />
      <label htmlFor={checkboxId} style={{ flexGrow: 1 }}>
        {todo.text}
      </label>
      <button onClick={() => onDestroy(todo.id)} style={{ marginLeft: 8 }}>
        ×
      </button>
    </li>
  );
};
