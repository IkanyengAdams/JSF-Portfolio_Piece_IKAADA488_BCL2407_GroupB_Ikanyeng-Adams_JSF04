import axios from 'axios';

const axiosAuth = axios.create({
  baseURL: 'https://fakestoreapi.com/',
  headers: {
    'Content-type': 'application/json',
  },
});

export default axiosAuth;
