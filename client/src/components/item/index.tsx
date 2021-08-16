import React, { FC } from 'react';
import styled from 'styled-components';
import { formatPrice } from 'utils';

interface ItemProps {
  thumbnail: string;
  title: string;
  price: number;
}

const Container = styled.div`
  width: 230px;
  height: 380px;
  padding: 5px;
  background-color: ${props => props.theme.colorPointDarkGreen};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const Info = styled.div`
  margin-left: 2px;
  margin-bottom: 6px;
  font-family: ${props => props.theme.fontEuljiro};
  color: ${props => props.theme.colorOffWhite};

  .title {
    width: 220px;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .price {
    font-size: 30px;
  }
`;

const Item: FC<ItemProps> = ({ thumbnail, title, price }) => {
  return (
    <Container>
      <Thumbnail src={thumbnail} alt="item-thumbnail" />
      <Info>
        <div className="title">{title}</div>
        <div className="price">{formatPrice(price)}원</div>
      </Info>
    </Container>
  );
};

export default Item;
