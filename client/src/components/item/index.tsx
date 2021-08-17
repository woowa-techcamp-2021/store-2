import React, { FC } from 'react';
import styled from 'styled-components';
import { formatPrice } from 'utils';

interface ItemProps {
  thumbnail: string;
  title: string;
  price: number;
}

const Container = styled.div`
  cursor: pointer;
  width: 230px;
  height: 380px;
  padding: 5px;
  background-color: ${props => props.theme.colorPointDarkGreen};
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${props => props.theme.mobile} {
    width: 150px;
    height: 280px;
  }

  ${props => props.theme.tablet} {
    width: 180px;
    height: 320px;
  }

  &:hover {
    img {
      transform: scale(1.1);
      transition: 0.5s;
    }
  }
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 300px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${props => props.theme.mobile} {
    height: 220px;
  }

  ${props => props.theme.tablet} {
    height: 250px;
  }
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

  ${props => props.theme.mobile} {
    .title {
      width: 140px;
      font-size: 14px;
    }

    .price {
      font-size: 22px;
    }
  }

  ${props => props.theme.tablet} {
    .title {
      width: 170px;
      font-size: 16px;
    }

    .price {
      font-size: 26px;
    }
  }
`;

const Item: FC<ItemProps> = ({ thumbnail, title, price }) => {
  return (
    <Container>
      <Thumbnail>
        <img src={thumbnail} alt="item-thumbnail" />
      </Thumbnail>
      <Info>
        <div className="title">{title}</div>
        <div className="price">{formatPrice(price)}원</div>
      </Info>
    </Container>
  );
};

export default Item;
