import Axios from 'axios';

export const axios = Axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
  },
  baseURL: 'http://localhost:3333',
});
