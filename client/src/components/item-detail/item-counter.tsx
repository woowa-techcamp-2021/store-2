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
  margin-top: 15px;

  ${({ theme }) => theme?.mobile} {
    flex-direction: column;
    justify-content: normal;
    align-items: normal;
    .title {
      align-self: flex-start;
      width: 100%;
      margin-top: 5px;
      margin-bottom: 12px;
      font-size: 14px;
    }
  }

  .price {
    font-weight: ${props => props.theme?.weightBold};
    font-size: 18px;
    margin-left: 15px;
  }
`;

const Counter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .count {
    margin: 0 15px;
    width: max-content;
  }

  ${({ theme }) => theme?.mobile} {
    align-self: flex-end;
  }

  button {
    background: ${({ theme }) => theme?.colorPointBeigeLight};
    width: 28px;
    height: 24px;
    font-size: 20px;
    border-radius: 5px;

    &:hover {
      background: ${({ theme }) => theme?.colorBg};
    }
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${props => props.theme?.mobile} {
    justify-content: flex-end;
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
      <Flex>
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
    </Container>
  );
};

export default ItemCounter;
