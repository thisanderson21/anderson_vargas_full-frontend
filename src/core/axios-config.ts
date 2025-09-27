import axios from 'axios';
const axiosIntance = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  headers: {
    Accept: 'application/json',
    'Accept-Language': 'es-CO',
    'Content-Language': 'es',
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

axiosIntance.interceptors.request.use(config => {
  config.headers = config.headers;

  return config;
});

export default axiosIntance;
