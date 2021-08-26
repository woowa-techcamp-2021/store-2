import React, { useState, useEffect, FC, Dispatch, SetStateAction } from 'react';
import { useHistory } from 'lib/router';

import styled from 'lib/woowahan-components';
import useWindowSize from 'hooks/use-window-size';

import starsTitle from 'assets/icons/stars_title.png';
import likeIcon from 'assets/icons/like.svg';
import likeFilledIcon from 'assets/icons/like_filled.svg';
import noImg from 'assets/images/no_image.png';

import { formatPrice } from 'utils';
import { CART_URL } from 'constants/urls';

import { TextButton } from 'components';
import ImageViewer from 'components/image-viewer';
import Modal from 'components/common/modal';
import ItemCounter from './item-counter';

export interface ItemInfoProps {
  thumbnail: string;
  title: string;
  price: number;
  likeShow: boolean;
  isLiked: boolean;
  setIsLiked: Dispatch<SetStateAction<boolean>>;
  isSoldOut: boolean;
  onSubmitCart: (count: number) => void;
  onBuy: () => void;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;

  .image-viewer {
    margin-right: 50px;
  }

  ${({ theme }) => theme?.tablet} {
    flex-direction: column;
  }

  ${({ theme }) => theme?.mobile} {
    flex-direction: column;
  }
`;

const Thumbnail = styled.img`
  width: 450px;
  height: 527px;
  margin-right: 50px;

  ${({ theme }) => theme?.tablet} {
    align-self: center;
    margin-bottom: 18px;
    margin-right: 0;
  }

  ${({ theme }) => theme?.mobile} {
    width: 80%;
    height: auto;
    align-self: center;
    margin-top: 10px;
    margin-right: 0;
    margin-bottom: 18px;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  height: 527px;
  width: 100%;

  .top-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    flex: 1;

    img[alt='stars-title'] {
      width: 145px;
      height: 32px;
      margin-bottom: 12px;
    }
  }

  ${({ theme }) => theme?.mobile} {
    .top-wrapper img[alt='stars-title'] {
      width: 100px;
      height: auto;
    }
  }
`;

const ItemTitle = styled.div`
  width: 100%;
  border-top: 1px solid black;
  border-bottom: 1px solid black;

  div {
    border-top: 7px double black;
    border-bottom: 7px double black;
    padding: 12px;
    text-align: center;
    font-size: 30px;
    font-family: ${({ theme }) => theme?.fontHanna};
    line-height: 32px;
  }

  ${({ theme }) => theme?.mobile} {
    div {
      padding: 8px;
      font-size: 24px;
      line-height: 28px;
    }
  }
`;

const ItemPrice = styled.div`
  text-align: center;
  font-weight: ${({ theme }) => theme?.weightMid};
  font-size: 16px;
  color: ${({ theme }) => theme?.colorSoftBlack};
  margin-bottom: 32px;

  .title {
    margin: 24px 0 14px;
    color: ${({ theme }) => theme?.colorGreyDark};
  }

  .price {
    font-size: 24px;
    font-family: ${({ theme }) => theme?.fontHanna};
  }

  .message {
    font-size: 16px;
    font-family: ${({ theme }) => theme?.fontHannaAir};
  }

  ${({ theme }) => theme?.mobile} {
    .title,
    .message {
      font-size: 14px;
    }

    .price {
      font-size: 20px;
    }
  }
`;

const PaymentWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-self: end;
  width: 100%;
  border-top: 2px solid ${({ theme }) => theme?.colorFooter};
  padding: 8px 0 0;

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      font-size: 16px;
      font-family: ${({ theme }) => theme?.fontHanna};
      color: ${({ theme }) => theme?.colorGreyDark};
    }

    .price {
      font-size: 32px;
      font-family: ${({ theme }) => theme?.fontHanna};
      color: ${({ theme }) => theme?.colorPrimary};
    }

    .sold-out {
      font-size: 32px;
      font-family: ${({ theme }) => theme?.fontEuljiro};
    }

    input {
      font-size: 32px;
      font-family: ${({ theme }) => theme?.fontHanna};
      color: ${({ theme }) => theme?.colorPrimary};
      text-align: end;

      &::after {
        content: '원';
        height: 10px;
        width: 10px;
      }
    }
  }

  .row.first {
    margin-bottom: 18px;
  }

  .row.end {
    justify-content: flex-end;

    button:first-child {
      margin-right: 8px;
    }
  }

  ${({ theme }) => theme?.mobile} {
    margin-top: -10px;

    .row.first {
      padding-left: 10px;
      padding-right: 10px;
    }

    .row.end {
      padding-left: 5px;
      padding-right: 5px;
    }

    .row .price,
    .row input {
      font-size: 26px;
    }
  }
`;

const LikeWrapper = styled.div`
  cursor: pointer;
  margin-right: 5px;

  img {
    width: 30px;
  }
`;

const ItemInfo: FC<ItemInfoProps> = ({
  thumbnail,
  title,
  price,
  likeShow,
  isLiked,
  setIsLiked,
  isSoldOut,
  onSubmitCart,
  onBuy,
  setCount,
}) => {
  const [totalPrice, setTotalPrice] = useState(price);
  const [modalVisible, setModalVisible] = useState(false);
  const history = useHistory();
  const { width } = useWindowSize();

  const movePayPage = () => {
    history.push(CART_URL);
  };

  const onClickCart = () => {
    onSubmitCart(totalPrice / price);
    setModalVisible(true);
  };

  const handleCounterChange = (v: number) => {
    setTotalPrice(price * v);
    setCount(v);
  };

  useEffect(() => {
    setTotalPrice(price);
  }, [price]);

  return (
    <Wrapper>
      {thumbnail && width >= 1200 ? (
        <ImageViewer className="image-viewer" imgSrc={thumbnail} imgWidth={450} imgHeight={527} />
      ) : (
        <Thumbnail src={thumbnail || noImg} alt={title} />
      )}
      <Info>
        <div className="top-wrapper">
          <img src={starsTitle} alt="stars-title" />
          <ItemTitle>
            <div>{title}</div>
          </ItemTitle>
          <ItemPrice>
            <div className="title">판매가격</div>
            <div className="price">{formatPrice(price)}원</div>
            <div className="title">배송정보</div>
            <div className="message">데모기념 오늘만 배송비 무료!!!</div>
          </ItemPrice>
          <ItemCounter title={title} price={price} onChange={handleCounterChange} />
        </div>
        <PaymentWrapper>
          <div className="row first">
            <div className="title">총 합계금액</div>
            <div className="price">
              <input value={formatPrice(totalPrice)} readOnly size={7} />원
            </div>
          </div>
          <div className="row end">
            {isSoldOut ? (
              <TextButton title="다 팔렸읍니다" type="button" styleType="black" disabled />
            ) : (
              <>
                {likeShow && (
                  <LikeWrapper onClick={setIsLiked}>
                    {isLiked ? (
                      <img className="like like-fill" src={likeFilledIcon} alt="like" />
                    ) : (
                      <img className="like like-empty" src={likeIcon} alt="like" />
                    )}
                  </LikeWrapper>
                )}
                <TextButton title="장바구니" type="button" styleType="white" onClick={onClickCart} />
                <TextButton title="바로구매" type="button" styleType="black" onClick={onBuy} />
              </>
            )}
          </div>
        </PaymentWrapper>
      </Info>
      <Modal
        type="confirm"
        header={<div>장바구니에 상품이 담겼습니다.</div>}
        body={<p>바로 이동하시겠습니까?</p>}
        visible={modalVisible}
        setVisible={setModalVisible}
        onConfirm={movePayPage}
      />
    </Wrapper>
  );
};

export default ItemInfo;
