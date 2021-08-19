import React, { FC, useCallback } from 'react';
import styled from 'lib/woowahan-components';
import { IItem } from 'types/item';
import ItemList from 'components/item/item-list';

interface ItemListProps {
  popularItems: IItem[] | null;
  newItems: IItem[] | null;
  recommendItems: IItem[] | null;
  loading: boolean;
}

const Div = styled.div`
  margin-top: 90px;
  ${props => props.theme?.mobile} {
    margin-top: 50px;
  }

  ${props => props.theme?.tablet} {
    margin-top: 70px;
  }
`;

const SmallTitle = styled.div`
  font-family: ${props => props.theme?.fontHanna};
  font-size: 36px;
  ${props => props.theme?.mobile} {
    font-size: 20px;
    margin-left: 50px;
  }

  ${props => props.theme?.tablet} {
    font-size: 28px;
    margin-left: 50px;
  }
`;

const MainItems: FC<ItemListProps> = ({ popularItems, newItems, recommendItems, loading }) => {
  return (
    <Div>
      {loading && <div>로딩중</div>}
      <SmallTitle>잘나가요</SmallTitle>
      <ItemList items={popularItems} isLoading={loading} />
      <SmallTitle>새로 나왔어요</SmallTitle>
      <ItemList items={newItems} isLoading={loading} />
      <SmallTitle>추천 드려요</SmallTitle>
      <ItemList items={recommendItems} isLoading={loading} />
    </Div>
  );
};

export default MainItems;
