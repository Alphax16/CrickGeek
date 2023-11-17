import axios from 'axios';
import { API_CONFIG } from './config';

const baseUrl = API_CONFIG.BASE_URL;
const apiRoute = "api/v1";

const instance = axios.create({
  baseURL: `${baseUrl}/${apiRoute}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
