/** @format */

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import client from "./configs/Client.js";
import "./assets/Css/main.css";
import Form_addTodo from "./components/Form_addTodo.jsx";
import Form_listTodo from "./components/Form_listTodo.jsx";

export default function App() {
  const [apiKey, setApiKey] = useState(localStorage.getItem("apiKey"));
  const [todos, setTodos] = useState([]);

  const getTodos = async (apiKey) => {
    const { data } = await client.get("/todos", null, apiKey);
    if (data.code === 200) {
      setTodos(data.data.listTodo);
    }
  };

  const getApiKey = async (userAcout) => {
    const url = `/api-key?email=${userAcout}`;
    const { data } = await client.get(url);
    if (data.code === 200) {
      toast.success(`chào mừng bạn: ${userAcout}`);
      setApiKey(data.data.apiKey);
      getTodos(data.data.apiKey);
      localStorage.setItem("apiKey", JSON.stringify(data.data.apiKey));
    } else {
      toast.warning(`${data.message}`);
      setTimeout(() => {
        window.location.reload();
      }, 2800);
    }
  };

  useEffect(() => {
    if (!apiKey) {
      var email = prompt("Điền email đi bạn ei:", "example@example.com");
      if (email) {
        getApiKey(email);
      }
    }
  }, []);

  return (
    <div>
      <div className="wapper">
        <h1 className="title-todo">Welcome to Todo App!</h1>
        <Form_addTodo apiKey={apiKey} getTodos={getTodos} />
        <ul className="list-todo">
          {todos.length > 0 ? (
            todos.map((todo, index) => (
              <li key={index}>
                <Form_listTodo
                  todo={todo}
                  apiKey={apiKey}
                  getTodos={getTodos}
                />
              </li>
            ))
          ) : (
            <li>Không có todo</li>
          )}
        </ul>
      </div>
    </div>
  );
}
