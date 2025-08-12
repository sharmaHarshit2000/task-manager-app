import { useState, useEffect } from "react";

export default function TaskForm({ initialData, onSave }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || "");
            setDescription(initialData.description || "");
            setDueDate(initialData.dueDate ? initialData.dueDate.split("T")[0] : "");
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ title, description, dueDate });
        setTitle("");
        setDescription("");
        setDueDate("");
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md mb-4">
            <h3 className="text-lg font-semibold mb-3">
                {initialData ? "Edit Task" : "Add Task"}
            </h3>
            <input
                type="text"
                placeholder="Title"
                className="border p-2 w-full rounded mb-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                className="border p-2 w-full rounded mb-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="date"
                className="border p-2 w-full rounded mb-2"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                {initialData ? "Update" : "Create"}
            </button>
        </form>
    );
}
