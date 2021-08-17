import React, { FC } from 'react';
import woowahan from 'lib/woowahan-components';

interface CounterProps {
  number: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const H1 = woowahan.h1`
  font-size: 50px;
  margin: 20px;
`;

const Button = woowahan.button`
  cursor: pointer;
  padding: 10px;
  margin: 5px;
`;

const Counter: FC<CounterProps> = ({ number, onIncrease, onDecrease }) => {
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
};

export default Counter;
