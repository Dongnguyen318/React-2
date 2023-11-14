/** @format */

import React, { useEffect, useState } from "react";
import client from "../configs/Client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Form_listTodo({ todo, apiKey, getTodos }) {
  console.log(todo);
  const [dele, setdele] = useState(false);
  const [edit, setEdit] = useState(false);
  const [updateValue, setupdateValue] = useState(todo.todo);
  const [completed, setCompleted] = useState(todo.isCompleted);

  const handleDelete = async () => {
    const { data, response } = await client.delete(
      `/todos/${todo._id}`,
      apiKey
    );
    if (response.ok) {
      toast.success(`${data.message}`);
      setdele(true);
      getTodos(apiKey);
    } else {
      localStorage.clear();
      toast.error("Có gì đó sai sai reload lại!!!");
    }
  };
  useEffect(() => {
    setupdateValue(todo.todo);
  }, [todo.todo]);
  const handleUpdateTodo = async () => {
    const { data, response } = await client.patch(
      `/todos/${todo._id}`,
      { todo: updateValue, isCompleted: completed },
      apiKey
    );
    if (response.ok) {
      toast.success(`${data.message}`);
      getTodos(apiKey);
    } else {
      localStorage.clear();
      toast.error("Có gì đó sai sai reload lại!!!");
    }
    setEdit(!edit);
    setupdateValue(todo.todo);
  };

  const handleEdit = async () => {
    setEdit(true);
  };

  const changeValueUpdate = (e) => {
    setupdateValue(e.target.value);
  };

  return (
    <React.Fragment>
      <input
        className={`${completed ? "check-done" : ""}`}
        value={updateValue}
        readOnly={!edit}
        onChange={changeValueUpdate}
      />
      <div className="infor-todo">
        {edit && (
          <div className="complete">
            <label htmlFor="checkbox">
              {completed ? "Completed" : "Not Completed"}
            </label>
            <input
              type="checkbox"
              id="checkbox"
              defaultChecked={completed}
              onClick={() => setCompleted(!completed)}
            />
          </div>
        )}
        <div className="options">
          {edit && (
            <button
              className="option exit"
              onClick={() => {
                setEdit(!edit);
              }}
            >
              Thoát
            </button>
          )}
          {!edit && (
            <button className="option fix" onClick={handleEdit}>
              Sửa
            </button>
          )}
          {edit && (
            <button className="option update" onClick={handleUpdateTodo}>
              Update
            </button>
          )}
          <button className="option dele" onClick={handleDelete}>
            Xóa
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
