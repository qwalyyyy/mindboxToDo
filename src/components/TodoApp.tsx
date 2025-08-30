import React, { useReducer, useState } from "react";
import { todosReducer, initialTodos } from "../reducer/todosReducer";
import {
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Stack,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion, AnimatePresence } from "framer-motion";
import "@fontsource/nunito-sans/400.css";
import "@fontsource/nunito-sans/600.css";

type Filter = "all" | "active" | "completed";

export const TodoApp: React.FC = () => {
  const [todos, dispatch] = useReducer(todosReducer, initialTodos);
  const [filter, setFilter] = useState<Filter>("all");
  const [text, setText] = useState("");

  const handleAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && text.trim()) {
      dispatch({ type: "ADD_TODO", payload: text });
      setText("");
    }
  };
  const handleToggle = (id: number) => dispatch({ type: "TOGGLE_TODO", payload: id });
  const handleDelete = (id: number) => dispatch({ type: "DELETE_TODO", payload: id });
  const handleClearCompleted = () => dispatch({ type: "CLEAR_COMPLETED" });

  const filteredTodos = todos.filter((todo) =>
    filter === "active" ? !todo.completed : filter === "completed" ? todo.completed : true
  );
  const remaining = todos.filter((todo) => !todo.completed).length;

  const buttonStyle = (f: Filter) => ({
    textTransform: "capitalize",
    fontFamily: "'Nunito Sans', sans-serif",
    fontWeight: 600,
    color: filter === f ? "#fff" : "#111",
    backgroundColor: filter === f ? "#111" : "#fff",
    borderColor: "#111",
    "&:hover": { backgroundColor: filter === f ? "#111" : "#f5f5f5", borderColor: "#111" },
  });

  const todoStyle = (completed: boolean) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: completed ? "#f5f5f5" : "#fff",
    border: "1px solid #111",
    cursor: "pointer",
    fontWeight: 400,
    color: completed ? "#999" : "#111",
    transition: "background 0.2s",
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        fontFamily: "'Nunito Sans', sans-serif",
        padding: 20,
      }}
    >
      <Card variant="outlined" sx={{ width: "100%", maxWidth: 450, borderRadius: 3, boxShadow: "0 4px 12px rgba(0,0,0,0.05)", borderColor: "#e0e0e0" }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600, color: "#111", mb: 3 }}>
            Мои задачи
          </Typography>

          <TextField
            fullWidth
            variant="outlined"
            placeholder="Введите новую задачу и нажмите Enter..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleAdd}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                fontFamily: "'Nunito Sans', sans-serif",
                fontWeight: 400,
                color: "#111",
                "& fieldset": { borderColor: "#111" },
                "&:hover fieldset": { borderColor: "#111" },
                "&.Mui-focused fieldset": { borderColor: "#111" },
              },
            }}
          />

          <Box component="ul" sx={{ listStyle: "none", p: 0, mb: 3 }}>
            <AnimatePresence>
              {filteredTodos.map((todo) => (
                <motion.li
                  key={todo.id}
                  layout
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => handleToggle(todo.id)}
                  style={todoStyle(todo.completed)}
                  onMouseEnter={(e) => { if (!todo.completed) e.currentTarget.style.backgroundColor = "#f0f0f0"; }}
                  onMouseLeave={(e) => { if (!todo.completed) e.currentTarget.style.backgroundColor = "#fff"; }}
                >
                  <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>{todo.text}</span>
                  <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleDelete(todo.id); }}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </motion.li>
              ))}
            </AnimatePresence>
          </Box>

          <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 2 }}>
            {(["all", "active", "completed"] as const).map((f) => (
              <Button key={f} variant={filter === f ? "contained" : "outlined"} size="small" onClick={() => setFilter(f)} sx={buttonStyle(f)}>
                {f === "all" ? "Все" : f === "active" ? "Активные" : "Выполненные"}
              </Button>
            ))}
          </Stack>

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="#555">
              Осталось задач: <b>{remaining}</b>
            </Typography>
            <Button size="small" onClick={handleClearCompleted} sx={{ textTransform: "none", fontFamily: "'Nunito Sans', sans-serif", fontWeight: 600, color: "#111", "&:hover": { backgroundColor: "#f5f5f5" } }}>
              Очистить выполненные
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
};
