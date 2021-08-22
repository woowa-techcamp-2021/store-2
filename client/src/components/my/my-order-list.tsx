import styled from 'lib/woowahan-components';
import React, { FC } from 'react';
import MyOrder from './my-order';

const dummy = [
  {
    createdAt: '2021-07-28',
    thumbnail: 'https://storage.googleapis.com/bmart-5482b.appspot.com/008/198_main_04.png',
    itemTitle: '재생지에 콩기름을 먹어요',
    price: '3500',
    count: 1,
    status: '주문완료',
  },
];

const Wrapper = styled.div`
  margin: 0 -12px;
`;

const MyOrderList: FC = () => {
  return (
    <Wrapper>
      {dummy.map(({ createdAt, itemTitle, thumbnail, price, count, status }) => (
        <MyOrder
          key={itemTitle}
          createdAt={createdAt}
          itemTitle={itemTitle}
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
