import React, { FC, useCallback } from 'react';
import styled from 'lib/woowahan-components';
import { useHistory } from 'lib/router';
import { IItem } from 'types/item';
import Item from 'components/item';
import { ITEM_URL } from 'constants/urls';

interface ItemListProps {
  items: IItem[] | null;
  isLoading?: boolean;
}

const Wrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fit, 230px);
  grid-gap: 10px 16px;
  justify-content: center;

  ${props => props.theme?.mobile} {
    grid-template-columns: repeat(auto-fit, 150px);
  }

  ${props => props.theme?.tablet} {
    grid-template-columns: repeat(auto-fit, 180px);
  }
`;

const ItemList: FC<ItemListProps> = ({ items }) => {
  const history = useHistory();

  const goDetailPage = useCallback((id: number) => () => history.push(`${ITEM_URL}/${id}`), [history]);

  return (
    <Wrapper>
      {items &&
        items.map(item => {
          return (
            <Item
              key={item.id}
              thumbnail={item.thumbnail}
              title={item.title}
              price={item.price}
              isBest={item.isBest}
              isGreen={item.isGreen}
              isNew={item.isNew}
              salePercent={item.salePercent}
              originalPrice={item.originalPrice}
              onClick={goDetailPage(item.id)}
            />
          );
        })}
    </Wrapper>
  );
};

export default ItemList;
