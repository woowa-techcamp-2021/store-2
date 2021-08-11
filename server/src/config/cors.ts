const corsOptions = {
  origin: process.env.CLIENT_ORIGIN, // 접근 권한을 부여하는 도메인 (Web Server)
  credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
  optionsSuccessStatus: 200, // 응답 상태 200으로 설정
};

export default corsOptions;
