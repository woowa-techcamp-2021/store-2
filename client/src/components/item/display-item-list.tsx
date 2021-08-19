import React, { FC } from 'react';
import styled from 'lib/woowahan-components';
import { IItem } from 'types/item';
import ItemList from './item-list';

interface DisplayItemListProps {
  title: string;
  items: IItem[] | null;
}

const Wrapper = styled.section`
  margin-bottom: 100px;
`;

const Title = styled.div`
  position: relative;
  margin-left: 16px;

  .text-point {
    color: ${props => props.theme?.colorTextBeige};
    opacity: 0.5;
    font-family: ${props => props.theme?.fontEuljiro10};
    font-size: 110px;
    position: absolute;
    top: -40px;
    left: -40px;
  }

  .text-title {
    position: relative;
    font-family: ${props => props.theme?.fontHanna};
    font-size: 30px;
  }
`;

const DisplayItemList: FC<DisplayItemListProps> = ({ title, items }) => {
  return (
    <Wrapper>
      <Title>
        <span className="text-point">{title.charAt(0)}</span>
        <span className="text-title">{title}</span>
      </Title>
      <ItemList items={items} />
    </Wrapper>
  );
};

export default DisplayItemList;
