import React, { ReactElement } from 'react';
import { Link } from 'Root/lib/router';

const MainPage = (): ReactElement => {
  return (
    <div>
      This is MainPage
      <Link to="/user">유저</Link>
      <Link to="/test">테스트</Link>
      <Link to="/counter">사가 카운터</Link>
    </div>
  );
};

export default MainPage;
