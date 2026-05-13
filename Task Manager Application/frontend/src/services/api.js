import axios from 'axios';

const BASE_URL = 'http://localhost:5006/api';
const client = axios.create({ baseURL: BASE_URL });

export const authRequest = async (url, data) => {
  const response = await client.post(`/auth/${url}`, data);
  return response.data;
};

export const getCurrentUser = async (token) => {
  const response = await client.get('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchTasks = async (token, filters = {}) => {
  const response = await client.get('/tasks', {
    headers: { Authorization: `Bearer ${token}` },
    params: filters,
  });
  return response.data;
};

export const createTask = async (token, payload) => {
  const response = await client.post('/tasks', payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateTask = async (token, id, payload) => {
  const response = await client.put(`/tasks/${id}`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteTask = async (token, id) => {
  const response = await client.delete(`/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
