import axios, { AxiosInstance } from 'axios';

const client: AxiosInstance = axios.create();

const token = localStorage.getItem('user') || '';

interface Headers {
  common: {
    Authorization: string;
  };
}

client.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/' : `http://${window.location.hostname}:3000`;
client.defaults.withCredentials = true;
(client.defaults.headers as Headers).common.Authorization = `Bearer ${token}`;

export default client;
