# 배민 문구사 🧸

<h6 align="center">

  <img alt="banner" src="https://user-images.githubusercontent.com/35324795/129211840-c90d2f8e-3c28-4d22-8edf-e6de6e4339f3.png">

![License](https://img.shields.io/badge/License-MIT-red)
![Version](https://img.shields.io/badge/Version-0.1.0-green)

</h6>

<h2 align="center">
  <a href="http://52.78.235.192">🎁 배민 문구사 웹 어플리케이션</a>
</h2>
  
<p align="center">우아한 테크캠프 <b>마지막</b> 프로젝트 - 배민 문구사</p>

## Contributors

| Contributor                              | Introduce        |
| ---------------------------------------- | ---------------- |
| [박기덕](https://github.com/edegiil)     | 개......발       |
| [서그림](https://github.com/Seogeurim)   | 개발하다가 죽자! |
| [손원우](https://github.com/negu63)      | 메멘토 모리      |
| [윤민상](https://github.com/yoonminsang) | 올해 취직!!      |

## Tech Stacks

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

## Project Structure

<h4 align="center">

![structure](https://user-images.githubusercontent.com/35324795/129206538-29c3a985-7a0e-4427-a6c9-8391b3c53fc6.png)

</h3>

```
🔥 client🔥
├─public
│ ├─index.html (기본 HTML)
│ └─favicon.ico (파비콘)
├─src
│ ├─assets (이미지 등)
│ ├─components (컴포넌트 like view)
│ ├─containers (like vm)
│ ├─pages (페이지)
│ ├─constants (상수 - 라우트 경로, url)
│ ├─styles (글로벌 스타일, reset)
│ ├─lib (리액트 라우터, styled-components)
│ ├─store (redux 모듈 🦆)
│ ├─types (ts 공통 타입, 인터페이스)
│ ├─hooks (커스텀 훅 래프트 훅 잽)
│ ├─utils (공통, axios)
│ │ └─api (api 요청보내고 데이터 받아오기)
│ ├─index.tsx
│ └─App.tsx
├─config
│ ├─webpack.common.js
│ ├─webpack.dev.js
│ └─webpack.prod.js
├─package.json
├─tsconfig.json
├─jest.config.js
├─babel.config.js
├─.env
├─.eslintrc
└─.prettierrc

🔥 server🔥
├── src
│ ├─config (db설정, dotenv 등)
│ ├─loaders (설정 불러오기)
│ ├─middlewares (미들웨어)
│ ├─routes (라우트)
│ ├─controllers (컨트롤러 / controller)
│ ├─services (데이터 가공 / service)
│ ├─repositories (쿼리문 / dao)
│ ├─models (모델 / dto)
│ ├─validation (req.body query parameter 값 검증)
│ ├─types (ts 공통 타입, 인터페이스)
│ ├─utils (공통되는 작은 함수)
│ │ └─error (에러 처리 파일)
│ └─app.ts
├─package.json
└─tsconfig.json
```

## Getting Started

### 웹 어플리케이션

```bash
# Development
$ cd client && yarn start

# Production
$ cd client && yarn run build
```

### API 서버

```bash
# Development
$ cd server && yarn start

# Production
$ cd server && yarn deploy
```

## See also

### [팀 그라운드 룰](https://github.com/woowa-techcamp-2021/store-2/wiki/RULE.-Team)

### [Why 애자일?](https://github.com/woowa-techcamp-2021/store-2/wiki/WHY.-Agile)

### [WiKi](https://github.com/woowa-techcamp-2021/store-2/wiki)

### [ERD](https://github.com/woowa-techcamp-2021/store-2/wiki/DOCS.-ERD)

## LICENSE

[MIT License](https://github.com/woowa-techcamp-2021/store-2/blob/main/LICENSE) © edegiil negu63 Seogeurim yoonminsang
