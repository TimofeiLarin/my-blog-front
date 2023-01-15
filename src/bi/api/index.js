import axios from 'axios';

const instanceApi = axios.create({
  baseURL: 'http://localhost:4444',
});

instanceApi.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('tokenMyBlog');

  return config;
})

export { instanceApi };
