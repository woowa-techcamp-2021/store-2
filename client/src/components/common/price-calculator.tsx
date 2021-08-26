import React, { FC } from 'react';
import styled from 'lib/woowahan-components';

import { formatPrice } from 'utils';

import plusIcon from 'assets/icons/plus.png';
import sumIcon from 'assets/icons/enter.png';

interface PriceCalculatorProps {
  prices: number[];
  totalCount: number;
}

const Box = styled.div`
  width: 100%;
  padding: 25px 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  border: 2px solid ${({ theme }) => theme?.colorLineLight};
  margin: 50px 0 30px;
  gap: 24px;

  .column {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  ${({ theme }) => theme?.mobile} {
    gap: 12px;

    .column {
      gap: 12px;
    }
  }
`;

const BoxItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;

  .title {
    font-size: 16px;
    color: ${({ theme }) => theme?.colorSoftBlack};
  }

  .money {
    font-size: 18px;
    font-weight: ${({ theme }) => theme?.weightBold};
    color: ${({ theme }) => theme?.colorSoftBlack};
  }

  span {
    color: ${({ theme }) => theme?.colorPrimary};
  }
`;

const PriceCalculator: FC<PriceCalculatorProps> = ({ prices, totalCount }) => {
  const totalPrice = prices.reduce((acc, cur) => acc + cur, 0);

  return (
    <Box>
      <div className="column">
        <BoxItem>
          <div className="title">총 {totalCount}개의 상품금액</div>
          <div className="money">{formatPrice(totalPrice)}원</div>
        </BoxItem>
        <img src={plusIcon} alt="더하기" />
        <BoxItem>
          <div className="title">배송비</div>
          <div className="money">0원</div>
        </BoxItem>
      </div>
      <img src={sumIcon} alt="합계" />
      <BoxItem>
        <div className="title">합계</div>
        <div className="money">
          <span>{formatPrice(totalPrice)}</span>원
        </div>
      </BoxItem>
    </Box>
  );
};

export default PriceCalculator;
