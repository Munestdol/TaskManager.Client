import axios from 'axios';

const API_URL = 'https://localhost:5001/api/tasks';

export const getTasks = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createTask = async (task) => {
  const res = await axios.post(API_URL, task);
  return res.data;
};

export const updateTaskStatus = async (id, status) => {
  await axios.patch(`${API_URL}/${id}/status`, { status });
};
