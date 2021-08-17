import React, { FC } from 'react';
import styled from 'styled-components';
import { IItem } from 'types/item';
import Item from 'components/item';

interface ItemListProps {
  items: IItem[];
  isLoading: boolean;
}

const Wrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fit, 230px);
  grid-gap: 10px 16px;
  justify-content: center;
`;

const ItemList: FC<ItemListProps> = ({ items }) => {
  return (
    <Wrapper>
      {items.map(item => {
        return <Item key={item.id} thumbnail={item.thumbnail} title={item.title} price={item.price} />;
      })}
    </Wrapper>
  );
};

export default ItemList;
