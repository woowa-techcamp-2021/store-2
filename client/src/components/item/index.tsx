import React, { FC, useState, MouseEvent } from 'react';
import styled from 'lib/woowahan-components';
import { formatPrice } from 'utils';
import likeIcon from 'assets/icons/like.png';
import likeFilledIcon from 'assets/icons/like-filled.png';
import badgeBestIcon from 'assets/icons/badge_best.png';
import badgeGreenIcon from 'assets/icons/badge_green.png';
import badgeNewIcon from 'assets/icons/badge_new.png';
import badgeSaleIcon from 'assets/icons/badge_sale.png';

interface ItemProps {
  thumbnail: string;
  title: string;
  price: string;
  isBest?: boolean;
  isGreen: boolean;
  isNew?: boolean;
  salePercent?: number;
  originalPrice?: number;
  onClick: () => void;
}

const Container = styled.div`
  cursor: pointer;
  width: 230px;
  height: 380px;
  padding: 5px;
  background-color: ${props => {
    if (props.bgColor === 'red') return props.theme?.colorPointRed;
    if (props.bgColor === 'beige') return props.theme?.colorPointBeige;
    return props.theme?.colorPointDarkGreen;
  }};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  ${props => props.theme?.mobile} {
    width: 150px;
    height: 280px;
  }

  ${props => props.theme?.tablet} {
    width: 180px;
    height: 320px;
  }

  img.like-empty {
    display: none;
  }

  &:hover {
    img.thumbnail-img {
      transform: scale(1.1);
      transition: 0.5s;
    }

    img.like-empty {
      display: inline;
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

  ${props => props.theme?.mobile} {
    height: 220px;
  }

  ${props => props.theme?.tablet} {
    height: 250px;
  }
`;

const Info = styled.div`
  margin-left: 2px;
  margin-bottom: 6px;
  font-family: ${props => props.theme?.fontEuljiro};
  color: ${props => props.theme?.colorOffWhite};

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

    span {
      font-size: 22px;
      color: ${props => props.theme?.colorGreyMid};
      text-decoration: line-through;
    }
  }

  ${props => props.theme?.mobile} {
    .title {
      width: 140px;
      font-size: 14px;
    }

    .price {
      font-size: 22px;

      span {
        font-size: 14px;
      }
    }
  }

  ${props => props.theme?.tablet} {
    .title {
      width: 170px;
      font-size: 16px;
    }

    .price {
      font-size: 26px;

      span {
        font-size: 18px;
      }
    }
  }
`;

const SaleWrapper = styled.div`
  position: absolute;
  top: 297px;
  right: 10px;

  span {
    font-size: 24px;
    font-family: ${props => props.theme?.fontEuljiro};
    color: ${props => props.theme?.colorWhite};
  }

  ${props => props.theme?.mobile} {
    top: 217px;

    span {
      font-size: 20px;
    }
  }

  ${props => props.theme?.tablet} {
    top: 247px;

    span {
      font-size: 22px;
    }
  }
`;

const BadgeWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;

  img {
    height: 20px;
    margin-right: 5px;
  }
`;

const LikeWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;

  img {
    width: 30px;
  }
`;

const Item: FC<ItemProps> = ({
  thumbnail,
  title,
  price,
  isBest,
  isGreen,
  isNew,
  salePercent,
  originalPrice,
  onClick,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => setIsLiked(!isLiked);

  const onItemClick = (e: MouseEvent) => {
    if ((e.target as HTMLDivElement).classList.contains('like')) return;
    onClick();
  };
  return (
    <Container bgColor={salePercent ? 'red' : 'green'} onClick={onItemClick}>
      <Thumbnail>
        <img className="thumbnail-img" src={thumbnail} alt="item-thumbnail" />
      </Thumbnail>
      <Info>
        <div className="title">{title}</div>
        <div className="price">
          {formatPrice(price)}원 {salePercent && originalPrice && <span>{formatPrice(originalPrice)}원</span>}
        </div>
      </Info>
      <SaleWrapper>{salePercent !== 0 && <span>{salePercent}%</span>}</SaleWrapper>
      <BadgeWrapper>
        {isBest && <img src={badgeBestIcon} alt="badge" />}
        {isGreen && <img src={badgeGreenIcon} alt="badge" />}
        {isNew && <img src={badgeNewIcon} alt="badge" />}
        {salePercent !== 0 && <img src={badgeSaleIcon} alt="badge" />}
      </BadgeWrapper>
      <LikeWrapper onClick={toggleLike}>
        {isLiked ? (
          <img className="like like-fill" src={likeFilledIcon} alt="like" />
        ) : (
          <img className="like like-empty" src={likeIcon} alt="like" />
        )}
      </LikeWrapper>
    </Container>
  );
};

export default Item;
