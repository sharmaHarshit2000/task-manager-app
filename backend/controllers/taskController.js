import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
  const { status, sort } = req.query;
  const filter = { user: req.user._id };
  if (status) filter.status = status;
  let query = Task.find(filter);
  if (sort) query = query.sort(sort);
  else query = query.sort("-createdAt");
  const tasks = await query.exec();
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const { title, description, dueDate } = req.body;
  const task = await Task.create({
    user: req.user._id,
    title,
    description,
    dueDate,
  });
  res.status(201).json(task);
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const task = await Task.findOneAndUpdate(
    { _id: id, user: req.user._id },
    updates,
    { new: true }
  );
  if (!task) return res.status(404).json({ message: "Not found" });
  res.json(task);
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOneAndDelete({ _id: id, user: req.user._id });
  if (!task) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
};
