import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Div = styled.div`
  color: var(--body);
  background: blue;
`;

const App: React.FC = () => {
  return <Div>안녕</Div>;
};

export default App;
