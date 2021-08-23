import styled from 'lib/woowahan-components';
import React, { FC } from 'react';
import { IOrder } from 'types/order';
import Loader from 'components/common/loader';
import MyOrder from './my-order';

interface MyOrderListProps {
  loading: boolean;
  orders: IOrder[];
  totalCount: number;
}

const Wrapper = styled.div`
  margin: 0 -12px;
  margin-bottom: 100px;
`;

const Empty = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 80px;
  font-family: ${props => props.theme?.fontEuljiro10};
  color: ${props => props.theme?.colorLine};
  font-size: 80px;
`;

const MyOrderList: FC<MyOrderListProps> = ({ loading, orders, totalCount }) => {
  const inner = totalCount ? (
    orders.map(({ createdAt, title, thumbnail, price, count, status }) => (
      <MyOrder
        key={title}
        createdAt={createdAt}
        title={title}
        thumbnail={thumbnail}
        price={price}
        count={count}
        status={status}
      />
    ))
  ) : (
    <Empty>
      <div>텅</div>
    </Empty>
  );

  return <Wrapper>{loading ? <Loader color="brown" size="100px" /> : inner}</Wrapper>;
};

export default MyOrderList;
