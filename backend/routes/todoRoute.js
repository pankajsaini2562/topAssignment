import express from "express";
const router = express.Router();
import { Todo } from "../models/Todo.js";

//create
router.post("/", async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTodo = new Todo({ title, description });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
});

//read

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(201).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//update

router.put("/:id", async (req, res) => {
  const Id = req.params.id;
  const updatedtodo = {
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
  };
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(Id, updatedtodo);
    if (!updatedTodo) {
      return res.status(400).json({ message: "Todo not found" });
    }
    res.status(201).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete

router.delete("/:id", async (req, res) => {
  const Id = req.params.id;
  try {
    const deletedTodo = await Todo.findByIdAndDelete(Id);
    if (!deletedTodo) {
      return res.status(400).json({ msg: "Todo not found" });
    }
    return res.status(201).json({ msg: "Todo delete succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
