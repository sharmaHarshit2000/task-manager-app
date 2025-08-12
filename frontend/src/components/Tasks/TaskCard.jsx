export default function TaskCard({ task, onUpdate, onDelete, onComplete }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>
      <p className="mt-2 text-sm text-gray-500">
        Status:{" "}
        <span
          className={
            task.status === "Completed" ? "text-green-600" : "text-yellow-600"
          }
        >
          {task.status}
        </span>
      </p>
      {task.dueDate && (
        <p className="text-sm text-red-500">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onUpdate(task)}
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
        {task.status !== "Completed" && (
          <button
            onClick={() => onComplete(task._id)}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            Complete
          </button>
        )}
      </div>
    </div>
  );
}
