import axios, { AxiosInstance } from 'axios';

const client: AxiosInstance = axios.create();

client.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/' : `http://${window.location.hostname}:3000`;
client.defaults.withCredentials = true;
// client.defaults.headers.common['Authorization'] = 'Bearer a1b2c3d4';

export default client;
