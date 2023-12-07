import axios from 'axios';
import envConfig from 'config/env.config';

const backend = axios.create({
  baseURL: envConfig.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default backend;
