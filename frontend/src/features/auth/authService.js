import axios from 'axios';
import { setLocalStorage } from '../../utils/localStorage';

const API_URL = '/api/users';

// Register user
const register = async userData => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    setLocalStorage('user', response.data);
  }
  return response.data;
};

const authService = {
  register,
};

export default authService;
