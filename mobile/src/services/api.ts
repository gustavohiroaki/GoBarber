import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.27.80.1:3333/',
});

export default api;
