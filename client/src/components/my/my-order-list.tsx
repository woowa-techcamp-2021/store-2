import styled from 'lib/woowahan-components';
import React, { FC } from 'react';
import { IOrder } from 'types/order';
import MyOrder from './my-order';

interface MyOrderListProps {
  loading: boolean;
  orders: IOrder[];
  pageCount: number;
  totalCount: number;
}

const Wrapper = styled.div`
  margin: 0 -12px;
  margin-bottom: 100px;
`;

const MyOrderList: FC<MyOrderListProps> = ({ loading, orders, pageCount, totalCount }) => {
  // TODO: 로딩, 페이지 카운트, 토탈카운트
  return (
    <Wrapper>
      {orders.map(({ createdAt, title, thumbnail, price, count, status }) => (
        <MyOrder
          key={title}
          createdAt={createdAt}
          title={title}
          thumbnail={thumbnail}
          price={price}
          count={count}
          status={status}
        />
      ))}
    </Wrapper>
  );
};

export default MyOrderList;
