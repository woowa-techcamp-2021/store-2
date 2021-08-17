import React, { FC } from 'react';
import styled from 'styled-components';
import { IItem } from 'types';
import Item from 'components/item';

interface ItemListProps {
  items: IItem[];
  isLoading: boolean;
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  margin-bottom: 50px;
`;

const ItemWrapper = styled.div`
  margin: 8px 5px;
`;

const ItemList: FC<ItemListProps> = ({ items }) => {
  return (
    <Wrapper>
      {items.map(item => {
        return (
          <ItemWrapper key={item.id}>
            <Item thumbnail={item.thumbnail} title={item.title} price={item.price} />
          </ItemWrapper>
        );
      })}
    </Wrapper>
  );
};

export default ItemList;
