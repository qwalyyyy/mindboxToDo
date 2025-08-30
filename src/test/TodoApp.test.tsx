import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoApp } from "../components/TodoApp";

describe("TodoApp", () => {
  test("добавление новой задачи", async () => {
    render(<TodoApp />);
    const input = screen.getByPlaceholderText(/Введите новую задачу и нажмите Enter/i);

    await userEvent.type(input, "Новая задача{enter}");

    expect(screen.getByText("Новая задача")).toBeInTheDocument();
  });

  test("отметка задачи как выполненной", async () => {
    render(<TodoApp />);
    const input = screen.getByPlaceholderText(/Введите новую задачу и нажмите Enter/i);

    await userEvent.type(input, "Clickable Task{enter}");
    const todoItem = screen.getByText("Clickable Task");

    // Проверяем начальный стиль (активная задача)
    expect(todoItem).toHaveStyle({ color: "#111" });

    // Кликаем по задаче
    await userEvent.click(todoItem);

    // Проверяем стиль выполненной задачи
    expect(todoItem).toHaveStyle({ color: "#999" });
  });
});
