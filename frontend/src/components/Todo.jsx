import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api/todo";
export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get(API_URL);
    setTodos(response.data);
  };
  const handleAddTodo = async () => {
    if (editId) {
      await axios.put(`${API_URL}/${editId}`, { title, description });
      setEditId(null);
    } else {
      await axios.post(API_URL, { title, description });
    }
    setTitle("");
    setDescription("");
    fetchTodos();
  };
  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTodos();
  };

  const handleEdit = (todo) => {
    setEditId(todo._id);
    setTitle(todo.title);
    setDescription(todo.description);
  };

  return (
    <div className="">
      <h2 className="text-2xl my-10 text-center font-bold">Todo List</h2>
      <div className="flex flex-col gap-5 w-[50%] mx-auto">
        <input
          className="border pl-5  p-2 rounded-full"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="border pl-5 p-2 rounded-full"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          className="p-2 bg-green-400 rounded-full text-white text-xl font-bold"
          onClick={handleAddTodo}
        >
          {editId ? "Update" : "Add"} Todo
        </button>
      </div>

      <ul className="flex flex-col gap-5  items-center mx-auto    mt-10">
        {todos.map((todo) => (
          <li
            className="flex 
            border p-1
            items-center gap-10 justify-evenly "
            key={todo._id}
          >
            <h3 className="flex p-4 text-xl font-semibold">{todo.title}</h3>
            <p className="flex p-4 text-xl font-semibold">{todo.description}</p>
            <button
              className="border bg-green-500 p-4 items-center   
              text-white
              rounded-md "
              onClick={() => handleEdit(todo)}
            >
              Edit
            </button>
            <button
              className="border p-4 rounded-md
              text-white
              bg-red-500"
              onClick={() => handleDelete(todo._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
