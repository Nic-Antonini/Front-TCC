import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL, // Use a variável de ambiente
});

export default axiosInstance;
