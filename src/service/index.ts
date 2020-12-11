import axios from "axios";
const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  timeout: 60000
});

api.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);
api.interceptors.request.use(
  config => {
    return config;
  },
  error => Promise.reject(error)
);

export default api;
