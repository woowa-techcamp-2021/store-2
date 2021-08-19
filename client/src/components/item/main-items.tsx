import React, { FC } from 'react';
import styled from 'lib/woowahan-components';
import { IItem } from 'types/item';
import DisplayItemList from './display-item-list';

interface ItemListProps {
  popularItems: IItem[] | null;
  newItems: IItem[] | null;
  recommendItems: IItem[] | null;
  loading: boolean;
}

const Wrapper = styled.div`
  margin-top: 60px;
  ${props => props.theme?.mobile} {
    margin-top: 50px;
  }

  ${props => props.theme?.tablet} {
    margin-top: 70px;
  }
`;

const MainItems: FC<ItemListProps> = ({ popularItems, newItems, recommendItems, loading }) => {
  return (
    <Wrapper>
      {loading && <div>로딩중</div>}
      <DisplayItemList title="잘나가요" items={popularItems} />
      <DisplayItemList title="새로 나왔어요" items={newItems} />
      <DisplayItemList title="추천드려요" items={recommendItems} />
    </Wrapper>
  );
};

export default MainItems;
