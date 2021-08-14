import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Method, RequestData, ResponseData } from './types';

const ACCESS_TOKEN_KEY = '_at';

const client: AxiosInstance = axios.create();

client.defaults.baseURL = `http://${window.location.hostname}:3000`;
client.defaults.withCredentials = true;

async function request(method: Method, url: string, body?: RequestData): Promise<ResponseData | Error | null> {
  try {
    const accessToken = window.localStorage.getItem(ACCESS_TOKEN_KEY) || '';

    const res = (await client({
      method,
      url,
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
      ...(body && { data: body }),
    })) as AxiosResponse<ResponseData>;

    if (res.data.requestAgain) {
      const { newAccessToken } = res.data;
      if (newAccessToken) {
        window.localStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken);
      }

      const newResult = await request(method, url, body);
      return newResult;
    }

    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response && err.response.status === 401) {
        window.localStorage.removeItem(ACCESS_TOKEN_KEY);
      }
      return err;
    }
    return null;
  }
}

export default request;
