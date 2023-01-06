import axios from "axios";

const instanceApi = axios.create({
  baseURL: 'http://localhost:4444'
});

export { instanceApi };