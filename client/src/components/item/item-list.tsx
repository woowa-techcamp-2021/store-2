import React, { FC } from 'react';
import styled from 'lib/woowahan-components';

import { IItem } from 'types/item';

import { ContentLoader } from 'components';
import ItemContainer from 'containers/item-container';

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
          return <ItemContainer key={item.id} item={item} />;
        })
      )}
    </Wrapper>
  );
};

export default ItemList;
