import React, { FC } from 'react';
import styled from 'lib/woowahan-components';
import { IItem } from 'types/item';
import ItemList from '../item-list';

interface DisplayItemListProps {
  title: string;
  items: IItem[];
  loading: boolean;
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

  ${props => props.theme?.mobile} {
    .text-point {
      font-size: 80px;
      top: -24px;
      left: -20px;
    }

    .text-title {
      font-size: 26px;
    }
  }

  ${props => props.theme?.tablet} {
    .text-point {
      font-size: 95px;
      top: -32px;
      left: -30px;
    }

    .text-title {
      font-size: 28px;
    }
  }
`;

const DisplayItemList: FC<DisplayItemListProps> = ({ title, items, loading }) => {
  return (
    <Wrapper>
      <Title>
        <span className="text-point">{title.charAt(0)}</span>
        <span className="text-title">{title}</span>
      </Title>
      <ItemList items={items} isLoading={loading} />
    </Wrapper>
  );
};

export default DisplayItemList;
