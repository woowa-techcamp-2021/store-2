import React, { FC } from 'react';
import styled from 'lib/woowahan-components';
import { useHistory } from 'lib/router';
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

  ${props => props.theme?.mobile} {
    grid-template-columns: repeat(auto-fit, 150px);
  }

  ${props => props.theme?.tablet} {
    grid-template-columns: repeat(auto-fit, 180px);
  }
`;

const ItemList: FC<ItemListProps> = ({ items }) => {
  const history = useHistory();

  const goDetailPage = (id: number) => {
    history.push(`/item/${id}`);
  };

  return (
    <Wrapper>
      {items.map(item => {
        return (
          <Item
            key={item.id}
            thumbnail={item.thumbnail}
            title={item.title}
            price={item.price}
            isBest={item.isBest}
            isGreen={item.isGreen}
            isNew={item.isNew}
            isSale={item.isSale}
            salePercent={item.salePercent}
            originalPrice={item.originalPrice}
            onClick={() => goDetailPage(item.id)}
          />
        );
      })}
    </Wrapper>
  );
};

export default ItemList;
