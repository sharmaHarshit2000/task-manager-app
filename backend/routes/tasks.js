import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  markComplete
} from "../controllers/taskController.js";

const router = Router();

router.get("/", auth, getTasks);

router.post("/", auth, createTask);

router.put("/:id", auth, updateTask);

router.delete("/:id", auth, deleteTask);

router.patch("/:id/complete", auth, markComplete);


export default router;
