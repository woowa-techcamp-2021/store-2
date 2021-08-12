import axios from 'axios';

const client = axios.create();

client.defaults.baseURL = `http://${location.hostname}:3000`;
client.defaults.withCredentials = true;

async function request(method: string, url: string, body?: any): Promise<any> {
  try {
    const accessToken = window.localStorage.getItem('_at') || '';

    const res = await client({
      method,
      url,
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
      ...(body && { data: body }),
    });

    if (res.data.requestAgain) {
      const { newAccessToken } = res.data;
      if (newAccessToken) {
        window.localStorage.setItem('_at', newAccessToken);
      }

      const newResult = await request(method, url, body);
      return newResult;
    }

    return res.data;
  } catch (err) {
    console.log(err);
    if (err.response.status === 401) {
      window.localStorage.removeItem('_at');
    }
    const { errorMessage } = err.response.data;
    return errorMessage;
  }
}

/*
  글로벌 설정 예시:
  // API 주소를 다른 곳으로 사용함
  client.defaults.baseURL='https://external-api-server.com/'
  
  // 헤더 설정
  client.defaults.headers.common['Authorization']='Bearer a1b2c3d4';
  
  // 인터셉터 설정
  axios.intercepter.response.use(\
    response=>{
      // 요청 성공 시 특정 작업 수행
      return response;
    },
    error=>{
      // 요청 실패 시 특정 작업 수행
      return Promise.reject(error);
    }
  )
*/
