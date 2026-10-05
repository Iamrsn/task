const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

async function fetcher(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const resData = await response.json();

  if (!response.ok || !resData.success) {
    throw new Error(resData.error || 'API Request failed');
  }

  return resData.data;
}

export const api = {
  getTasks: () => fetcher('/tasks'),
  createTask: (title, status) =>
    fetcher('/tasks', {
      method: 'POST',
      body: JSON.stringify({ title, status }),
    }),
  updateTaskStatus: (id, status) =>
    fetcher(`/tasks/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
  deleteTask: (id) =>
    fetcher(`/tasks/${id}`, {
      method: 'DELETE',
    }),
};