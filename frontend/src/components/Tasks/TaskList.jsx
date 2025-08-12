import { useState, useEffect } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  markTaskComplete, 
} from "../../services/api";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("");
  const [editTask, setEditTask] = useState(null);
  const navigate = useNavigate();

  const loadTasks = async () => {
    try {
      const res = await getTasks(filter);
      if (res?.error === "Unauthorized") {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      setTasks(res);
    } catch {
      toast.error("Failed to load tasks");
    }
  };

  useEffect(() => {
    loadTasks();
  }, [filter]);

  const handleCreate = async (taskData) => {
    try {
      if (editTask) {
        await updateTask(editTask._id, taskData);
        toast.success("Task updated");
        setEditTask(null);
      } else {
        await createTask(taskData);
        toast.success("Task created");
      }
      loadTasks();
    } catch {
      toast.error("Error saving task");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      toast.success("Task deleted");
      loadTasks();
    } catch {
      toast.error("Error deleting task");
    }
  };

  const handleComplete = async (id) => {
    try {
      await markTaskComplete(id);
      toast.success("Task marked as completed");
      loadTasks();
    } catch {
      toast.error("Error marking task complete");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {["", "Pending", "Completed"].map((status) => (
          <button
            key={status}
            className={`px-3 py-1 rounded ${
              filter === status ? "bg-blue-600 text-white" : "bg-white"
            }`}
            onClick={() => setFilter(status)}
          >
            {status || "All"}
          </button>
        ))}
      </div>

      {/* Form */}
      <TaskForm initialData={editTask} onSave={handleCreate} />

      {/* Tasks */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onUpdate={(t) => setEditTask(t)}
            onDelete={handleDelete}
            onComplete={handleComplete} 
          />
        ))}
      </div>
    </div>
  );
}
