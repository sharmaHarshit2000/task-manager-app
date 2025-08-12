import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE,
});

// Attach token for protected routes
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// AUTH
export const registerUser = (data) =>
  api.post("/auth/register", data).then((res) => res.data);

export const loginUser = (data) =>
  api.post("/auth/login", data).then((res) => res.data);

// TASKS
export const getTasks = (status) =>
  api
    .get(`/tasks${status ? `?status=${status}` : ""}`, {
      headers: getAuthHeader(),
    })
    .then((res) => res.data);

export const createTask = (data) =>
  api
    .post("/tasks", data, { headers: getAuthHeader() })
    .then((res) => res.data);

export const updateTask = (id, data) =>
  api
    .put(`/tasks/${id}`, data, { headers: getAuthHeader() })
    .then((res) => res.data);

export const deleteTask = (id) =>
  api
    .delete(`/tasks/${id}`, { headers: getAuthHeader() })
    .then((res) => res.data);

export const markTaskComplete = (id) =>
  api
    .patch(`/tasks/${id}/complete`, {}, { headers: getAuthHeader() })
    .then((res) => res.data);
