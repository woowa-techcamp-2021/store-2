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
  flex-direction: column;
  padding: 15px 30px;

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

  .price {
    margin-top: 20px;
    font-weight: ${props => props.theme?.weightBold};
    font-size: 18px;
  }
`;

const Counter = styled.div`
  display: flex;
  align-items: center;
  .count {
    margin: 0 15px;
  }

  ${({ theme }) => theme?.mobile} {
    align-self: flex-end;
  }

  button {
    background: ${({ theme }) => theme?.colorPointBeigeLight};
    width: 34px;
    height: 30px;
    font-size: 20px;

    &:first-child {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }

    &:last-child {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }

    &:hover {
      background: ${({ theme }) => theme?.colorBg};
    }
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
      <Flex>
        <div className="title">{title}</div>
        <Counter>
          <button type="button" onClick={handleCounterChange(true)}>
            +
          </button>
          <div className="count">{count}</div>
          <button type="button" onClick={handleCounterChange(false)}>
            -
          </button>
        </Counter>
      </Flex>
      <div className="text price">{formatPrice(count * price)}원</div>
    </Container>
  );
};

export default ItemCounter;
