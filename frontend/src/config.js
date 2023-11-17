// const { VITE_BACKEND_URL, VITE_BACKEND_PORT } = import.meta.env;

// console.log(VITE_BACKEND_URL, VITE_BACKEND_PORT);

// console.log(import.meta.env);
// console.log(import.meta.env.VITE_BACKEND_URL, import.meta.env.VITE_BACKEND_PORT);

// const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}` || "http://127.0.0.1:5000";
const API_BASE_URL = "http://127.0.0.1:5000";
// console.log('API_BASE_URL:', API_BASE_URL);

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
};
