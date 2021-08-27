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

  .title {
    flex: 1;
  }

  ${({ theme }) => theme?.mobile} {
    flex-direction: column;

    .title {
      align-self: flex-start;
      width: 100%;
      margin-top: 5px;
      margin-bottom: 12px;
      font-size: 14px;
    }
  }
`;

const Counter = styled.div`
  display: flex;
  align-items: center;

  .count {
    margin-right: 24px;
  }

  .price {
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
  margin-right: 24px;

  button {
    background: ${({ theme }) => theme?.colorPointBeigeLight};
    width: 24px;
    height: 20px;

    &:first-child {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }

    &:last-child {
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }

    &:hover {
      background: ${({ theme }) => theme?.colorBg};
    }
  }
`;

const ItemCounter: FC<ItenCounterProps> = ({ title, price, onChange }: ItenCounterProps) => {
  const [count, setCount] = useState(1);

  const handleCounterChange = (isIncrease: boolean) => () => {
    const newCount = isIncrease ? count + 1 : count - 1;
    if (newCount < 1) return;

    setCount(newCount);
    onChange(newCount);
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
