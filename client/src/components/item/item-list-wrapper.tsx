import React, { FC } from 'react';
import styled from 'lib/woowahan-components';
import { IItem } from 'types/item';
import ItemList from 'components/item/item-list';
import Pagination from './pagination';

interface ItemListProps {
  items: IItem[];
  pageCount: number;
  loading: boolean;
}

const Wrapper = styled.div`
  margin-top: 90px;
  margin-bottom: 50px;

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

const ItemListWrapper: FC<ItemListProps> = ({ items, loading, pageCount }) => {
  return (
    <Wrapper>
      {loading && <div>로딩중</div>}
      <SmallTitle>총 개수, 추천 등등...</SmallTitle>
      <ItemList items={items} />
      <Pagination totalCnt={pageCount} />
    </Wrapper>
  );
};

export default ItemListWrapper;
