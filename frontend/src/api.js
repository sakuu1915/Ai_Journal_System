import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-journal-system-1.onrender.com/api",
});

export default API;