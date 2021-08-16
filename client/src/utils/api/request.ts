import axios, { AxiosResponse } from 'axios';
import client from './client';
import { Method, RequestData, ResponseData } from './types';

// https://velog.io/@yiyb0603/React%EC%97%90%EC%84%9C-axios-%EC%BB%A4%EC%8A%A4%ED%85%80%ED%95%98%EA%B8%B0

const ACCESS_TOKEN_KEY = '_at';

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
