import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import AddTodo from "./components/AddTodo/AddTodo";
import TodoList from "./components/TodoList/TodoList";
import "./App.css";
import TodoItem from "./components/TodoItem/TodoItem";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(auth === "true");
  }, []);

  const addTodo = (text, priority, dueDate, category) => {
    const newTodo = { id: Date.now(), text, priority, dueDate, category };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <Router>
      <div className="app">
  <h1 className="todo-app-heading">Todo App</h1>
  <div className="content-container">
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/todo" /> : <Login setIsAuthenticated={setIsAuthenticated} />}
      />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/todo"
        element={isAuthenticated ? (
          <>
            <div className="todo-content">
              <AddTodo addTodo={addTodo} />
              <TodoList todos={todos} removeTodo={deleteTodo} />
              {/* <TodoList todos={todos} deleteTodo={deleteTodo} /> */}
            </div>
          </>
        ) : (
          <Navigate to="/" />
        )}
      />
    </Routes>
  </div>
</div>
</Router>
  );
};

export default App;
