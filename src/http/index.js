import axios from 'axios';

//export const API_URL = `http://localhost:7000/api`
export const API_URL = process.env.PORT + '/api';

const api = axios.create({
	withCredentials: true,
	baseURL: API_URL
})

export default api;