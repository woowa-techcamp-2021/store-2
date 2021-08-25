import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Method, RequestData, ResponseData } from './types';

const client: AxiosInstance = axios.create();

client.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/' : `http://${window.location.hostname}:3000`;
client.defaults.withCredentials = true;

async function request(method: Method, url: string, body?: RequestData): Promise<AxiosResponse> {
  try {
    const accessToken = window.localStorage.getItem('user') || '';

    const res = (await client({
      method,
      url,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      ...(body && { data: body }),
    })) as AxiosResponse<ResponseData>;

    if (res.data.requestAgain) {
      const { newAccessToken } = res.data;
      if (newAccessToken) {
        window.localStorage.setItem('user', newAccessToken);
      }

      const newResult = await request(method, url, body);
      return newResult;
    }

    return res;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response && err.response.status === 401) {
        window.localStorage.removeItem('user');
      }
    }
    throw err;
  }
}

export default request;
