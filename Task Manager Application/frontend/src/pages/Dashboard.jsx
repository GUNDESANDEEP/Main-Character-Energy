import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTask, deleteTask, fetchTasks, updateTask } from '../services/api';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function Dashboard({ user, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ status: '', priority: '', search: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('task_manager_token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    setLoading(true);
    fetchTasks(token, filters)
      .then((data) => setTasks(data))
      .catch(() => setError('Unable to load tasks'))
      .finally(() => setLoading(false));
  }, [filters, navigate, token]);

  const handleCreate = async (taskData) => {
    try {
      const newTask = await createTask(token, taskData);
      setTasks((prev) => [newTask, ...prev]);
    } catch {
      setError('Could not add task');
    }
  };

  const handleUpdate = async (id, updates) => {
    try {
      const updated = await updateTask(token, id, updates);
      setTasks((prev) => prev.map((task) => (task._id === id ? updated : task)));
    } catch {
      setError('Unable to update task');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(token, id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch {
      setError('Unable to delete task');
    }
  };

  const activeCount = useMemo(() => tasks.filter((task) => !task.completed).length, [tasks]);

  const updateFilter = (field) => (event) => {
    setFilters((prev) => ({ ...prev, [field]: event.target.value }));
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <h1>Task Manager</h1>
          <p>Welcome back{user ? `, ${user.name}` : ''}.</p>
        </div>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </header>

      <section className="dashboard-panel">
        <div className="filters">
          <input
            value={filters.search}
            onChange={updateFilter('search')}
            placeholder="Search tasks..."
          />
          <select value={filters.status} onChange={updateFilter('status')}>
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <select value={filters.priority} onChange={updateFilter('priority')}>
            <option value="">All priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <TaskForm onCreate={handleCreate} />

        <div className="summary-row">
          <span>{tasks.length} tasks</span>
          <span>{activeCount} active</span>
        </div>

        {error && <p className="error-text">{error}</p>}
        {loading ? <p>Loading tasks…</p> : <TaskList tasks={tasks} onUpdate={handleUpdate} onDelete={handleDelete} />}
      </section>
    </div>
  );
}
