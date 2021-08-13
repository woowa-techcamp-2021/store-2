import React, { ReactElement } from 'react';

import styled from 'styled-components';

const Div = styled.div`
  padding: 12px;
  background-color: #a1e0ff;
  color: ${props => props.theme.bodyColor};
`;

const MainPage = (): ReactElement => {
  return <Div>This is MainPage</Div>;
};

export default MainPage;
