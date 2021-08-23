import React, { useState, FC } from 'react';
import styled from 'lib/woowahan-components';

import { formatPrice } from 'utils';

interface ItenCounterProps {
  title: string;
  price: number;
  onChange: (v: number) => void;
}

const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme?.colorFooter};
  border-radius: 17px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;

  ${({ theme }) => theme?.mobile} {
    flex-direction: column;
    row-gap: 12px;

    .title {
      align-self: flex-start;
    }
  }
`;

const Counter = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  .price {
    width: 70px;
    text-overflow: clip;
    text-align: end;
  }

  ${({ theme }) => theme?.mobile} {
    align-self: flex-end;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    background: ${({ theme }) => theme?.colorTextBrownLight};
    width: 24px;
  }
`;

const ItemCounter: FC<ItenCounterProps> = ({ title, price, onChange }: ItenCounterProps) => {
  const [count, setCount] = useState(1);

  const handleCounterChange = (isIncrease: boolean) => () => {
    const newCount = isIncrease ? count + 1 : count - 1;
    if (newCount < 1) return;

    setCount(newCount);
    onChange(price * newCount);
  };

  return (
    <Container>
      <div className="title">{title}</div>
      <Counter>
        <div className="count">{count}</div>
        <ButtonBox>
          <button type="button" onClick={handleCounterChange(true)}>
            +
          </button>
          <button type="button" onClick={handleCounterChange(false)}>
            -
          </button>
        </ButtonBox>
        <div className="text price">{formatPrice(count * price)}원</div>
      </Counter>
    </Container>
  );
};

export default ItemCounter;
