import React, { FC, useCallback } from 'react';
import styled from 'lib/woowahan-components';
import { useHistory } from 'lib/router';

import { IItem } from 'types/item';

import { ITEM_URL } from 'constants/urls';

import { ContentLoader } from 'components';
import Item from './item';

interface IItemListProps {
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

  .item-loader {
    width: 230px;
    height: 380px;
  }

  ${props => props.theme?.mobile} {
    grid-template-columns: repeat(auto-fit, 150px);

    .item-loader {
      width: 150px;
      height: 280px;
    }
  }

  ${props => props.theme?.tablet} {
    grid-template-columns: repeat(auto-fit, 180px);

    .item-loader {
      width: 180px;
      height: 320px;
    }
  }
`;

const ItemList: FC<IItemListProps> = ({ items, isLoading }) => {
  const history = useHistory();

  const goDetailPage = useCallback((id: number) => () => history.push(`${ITEM_URL}/${id}`), [history]);
  return (
    <Wrapper>
      {isLoading ? (
        <>
          <ContentLoader className="item-loader" />
          <ContentLoader className="item-loader" />
          <ContentLoader className="item-loader" />
          <ContentLoader className="item-loader" />
        </>
      ) : (
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
        })
      )}
    </Wrapper>
  );
};

export default ItemList;
