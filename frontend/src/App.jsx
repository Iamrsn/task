import React, { useState, useEffect } from 'react';
import { api } from './services/api';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('todo');
  const [validationError, setValidationError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch tasks from backend server');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setValidationError('Task title cannot be empty.');
      return;
    }

    setValidationError('');
    setSubmitting(true);

    try {
      const newTask = await api.createTask(title, status);
      setTasks((prev) => [newTask, ...prev]);
      setTitle('');
      setStatus('todo');
    } catch (err) {
      alert(`Error creating task: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    const previousTasks = [...tasks];
    setTasks((prev) =>
      prev.map((t) => (t._id === taskId ? { ...t, status: newStatus } : t))
    );

    try {
      await api.updateTaskStatus(taskId, newStatus);
    } catch (err) {
      setTasks(previousTasks);
      alert(`Failed to update status: ${err.message}`);
    }
  };

  const handleDeleteTask = async (taskId) => {
    const previousTasks = [...tasks];
    setTasks((prev) => prev.filter((t) => t._id !== taskId));

    try {
      await api.deleteTask(taskId);
    } catch (err) {
      setTasks(previousTasks);
      alert(`Failed to delete task: ${err.message}`);
    }
  };

  return (
    <div style={{ maxWidth: '650px', margin: '40px auto', padding: '0 20px' }}>
      <header style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: 0, color: '#1a202c' }}>Task Manager</h1>
        <p style={{ color: '#718096', marginTop: '4px', fontSize: '14px' }}>MERN Stack Application (JavaScript)</p>
      </header>

    
      <form onSubmit={handleAddTask} style={{ background: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <h3 style={{ marginTop: 0, marginBottom: '16px', fontSize: '16px' }}>Add New Task</h3>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          <input
            type="text"
            placeholder="Enter task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e0', outline: 'none' }}
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e0', background: '#fff' }}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <button
            type="submit"
            disabled={submitting}
            style={{ padding: '10px 20px', background: '#3182ce', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {submitting ? 'Adding...' : 'Add Task'}
          </button>
        </div>
        {validationError && <p style={{ color: '#e53e3e', fontSize: '13px', margin: 0 }}>{validationError}</p>}
      </form>


      <section>
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Tasks List</h2>
        
        {loading && <p style={{ color: '#718096' }}>Loading tasks...</p>}

        {error && (
          <div style={{ padding: '12px 16px', background: '#fff5f5', color: '#c53030', borderRadius: '6px', border: '1px solid #feb2b2', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{error}</span>
            <button onClick={loadTasks} style={{ background: 'none', border: 'none', color: '#c53030', textDecoration: 'underline', cursor: 'pointer' }}>Retry</button>
          </div>
        )}

        {!loading && !error && tasks.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', background: '#ffffff', borderRadius: '8px', border: '1px dashed #cbd5e0', color: '#718096' }}>
            <p style={{ margin: '0 0 4px 0', fontWeight: 'bold', fontSize: '16px' }}>No tasks found</p>
            <p style={{ margin: 0, fontSize: '14px' }}>Your database is empty. Add a new task above to get started!</p>
          </div>
        )}

        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {tasks.map((task) => (
            <li
              key={task._id}
              style={{
                display: 'flex',
                justifySpace: 'between',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 16px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                marginBottom: '10px',
                background: '#ffffff'
              }}
            >
              <span style={{ textDecoration: task.status === 'done' ? 'line-through' : 'none', color: task.status === 'done' ? '#a0aec0' : '#2d3748', fontWeight: 500 }}>
                {task.title}
              </span>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '13px' }}
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>

                <button
                  onClick={() => handleDeleteTask(task._id)}
                  style={{ background: '#e53e3e', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}