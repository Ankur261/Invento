
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/users'; 

export const getAllUsers = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const addUser = async (userData) => {
  const res = await axios.post(`${BASE_URL}/register`, userData);
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};

export const getUserById = (userId) => {
  return axios.get(`${BASE_URL}/${userId}`);
};

export const updateUserById = (userId, userData) => {
  return axios.put(`${BASE_URL}/${userId}`, userData);
};
