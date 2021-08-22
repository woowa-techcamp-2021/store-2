import styled from 'lib/woowahan-components';
import React, { FC } from 'react';
import { formatPrice } from 'utils';

interface MyOrderProps {
  createdAt: string;
  itemTitle: string;
  thumbnail: string;
  price: string;
  count: number;
  status: string;
}

const Wrapper = styled.div`
  border-bottom: 1px solid ${props => props.theme?.colorLineLight};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 15px;
  > div {
    font-size: 12px;
    color: ${props => props.theme?.softBlack};
    font-weight: bold;
    padding: 0 2px;
  }
  > div:nth-child(1) {
    flex: 1.4;
  }
  > div:nth-child(2) {
    flex: 3;
    display: flex;
    align-items: center;
    img {
      width: 62px;
      height: 52px;
      padding-right: 5px;
    }
  }
  > div:nth-child(3) {
    flex: 1.7;
  }
  > div:nth-child(4) {
    flex: 1;
  }
`;

const MyOrder: FC<MyOrderProps> = ({ createdAt, itemTitle, thumbnail, price, count, status }) => {
  return (
    <Wrapper>
      <div>{createdAt}</div>
      <div>
        <div>
          <img src={thumbnail} alt="썸네일" />
        </div>
        <div>{itemTitle}</div>
      </div>
      <div>
        {formatPrice(price)}원 / {count}개
      </div>
      <div>{status}</div>
    </Wrapper>
  );
};

export default MyOrder;
