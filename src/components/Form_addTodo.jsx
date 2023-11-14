import React, { useState } from "react";
import client from "../configs/Client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Form_addTodo({ apiKey, getTodos }) {
  const [todo, setTodo] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!todo || todo.trim().length < 2) {
      toast.warn("Todo cần có ít nhất 2 kí tự!");
    } else {
      const { data } = await client.post("/todos", { todo: todo }, apiKey);
      if (data.code === 201) {
        toast.success(data.message);
        getTodos(apiKey);
      } else {
        localStorage.clear();
        toast.error("có lỗi xảy ra vui lòng reload lại!!!");
        setTimeout(() => {
          window.location.reload();
        }, 2800);
      }
    }
    setTodo("");
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  return (
    <div>
      <form className="todo-form" onSubmit={handleSubmit}>
        <div className="input-todo">
          <input
            className="input-add"
            type="text"
            name="todo"
            placeholder="Thêm một việc làm mới"
            onChange={handleChange}
            value={todo}
          />
          <button type="submit" className="btn btn-add">
            Thêm mới
          </button>
          <ToastContainer autoClose={2000} />
        </div>
        <hr />
      </form>
    </div>
  );
}

export default Form_addTodo;
