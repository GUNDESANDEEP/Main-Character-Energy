import { useState } from 'react';

const initial = { title: '', description: '', priority: 'medium', dueDate: '' };

export default function TaskForm({ onCreate }) {
  const [form, setForm] = useState(initial);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.title.trim()) return;
    onCreate({ ...form, dueDate: form.dueDate || null });
    setForm(initial);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Add a new task</h2>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Task title" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Notes or details" />
      <div className="task-form-row">
        <select name="priority" value={form.priority} onChange={handleChange}>
          <option value="medium">Medium priority</option>
          <option value="low">Low priority</option>
          <option value="high">High priority</option>
        </select>
        <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
      </div>
      <button type="submit">Create Task</button>
    </form>
  );
}
