import axios from 'axios';
import { setLocalStorage, deleteLocalStorage } from '../../utils/localStorage';

const API_URL = '/api/users';

// Register user
const register = async userData => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    setLocalStorage('user', response.data);
  }
  return response.data;
};

// Login user
const login = async userData => {
  const response = await axios.post(`${API_URL}/login`, userData);

  if (response.data) {
    setLocalStorage('user', response.data);
  }
  return response.data;
};

// Logout User
const logout = () => deleteLocalStorage('user');

const authService = {
  register,
  login,
  logout,
};

export default authService;
