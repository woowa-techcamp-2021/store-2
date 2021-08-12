import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface CounterProps {
  number: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const H1 = styled.h1`
  font-size: 50px;
  margin: 20px;
`;

const Button = styled.button`
  cursor: pointer;
  padding: 10px;
  margin: 5px;
`;

function Counter(props: CounterProps): ReactElement {
  const { number, onIncrease, onDecrease } = props;

  return (
    <div>
      <H1>{number}</H1>
      <Button type="button" onClick={onIncrease}>
        +1
      </Button>
      <Button type="button" onClick={onDecrease}>
        -1
      </Button>
    </div>
  );
}

export default Counter;
