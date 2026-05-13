export default function TaskItem({ task, onUpdate, onDelete }) {
  const toggleComplete = () => {
    onUpdate(task._id, { completed: !task.completed });
  };

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <div className="task-info">
        <div>
          <h3>{task.title}</h3>
          <p>{task.description || 'No description provided.'}</p>
        </div>
        <span className={`badge ${task.priority}`}>{task.priority}</span>
      </div>
      <div className="task-meta">
        <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}</span>
        <div className="task-actions">
          <button className="small-btn" onClick={toggleComplete}>
            {task.completed ? 'Mark Pending' : 'Mark Complete'}
          </button>
          <button className="small-btn danger" onClick={() => onDelete(task._id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
