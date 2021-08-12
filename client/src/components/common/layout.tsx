import React, { ReactElement } from 'react';

const Layout = (): ReactElement => {
  return (
    <div>
      <h1>layout</h1>
      <div>
        <button type="button">+1</button>
        <button type="button">-1</button>
      </div>
    </div>
  );
};

export default Layout;
