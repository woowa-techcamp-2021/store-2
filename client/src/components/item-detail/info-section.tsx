import React, { useState, useEffect, FC } from 'react';
import { Link, useHistory } from 'lib/router';
import styled from 'lib/woowahan-components';

import useWindowSize from 'hooks/use-window-size';

import starsTitle from 'assets/icons/stars_title.png';

import { formatPrice } from 'utils';
import { CART_URL, PAYMENT_URL } from 'constants/urls';

import TextButton from 'components/common/text-button';
import ImageViewer from 'components/image-viewer';
import Modal from 'components/common/modal';
import ItemCounter from './item-counter';

export interface InfoSectionProps {
  thumbnail: string;
  title: string;
  price: number;
  isLike: boolean;
  isSoldOut: boolean;
  onSubmitCart: (count: number) => void;
  onBuy: () => void;
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
    width: 100%;
    height: auto;
    margin-top: 10px;
    margin-right: 0;
    margin-bottom: 18px;
  }
`;

const ItemInfo = styled.div`
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
`;

const ItemTitle = styled.div`
  border-top: 6px double black;
  border-bottom: 6px double black;
  width: 100%;
  padding: 12px;
  text-align: center;
  font-size: 30px;
  font-family: ${({ theme }) => theme?.fontHanna};
  line-height: 31px;
`;

const ItemPrice = styled.div`
  text-align: center;
  font-weight: ${({ theme }) => theme?.weightMid};
  font-size: 16px;
  color: ${({ theme }) => theme?.colorSoftBlack};
  margin-bottom: 32px;

  .title {
    margin: 24px 0 12px;
    color: ${({ theme }) => theme?.colorGreyDark};
  }

  .price {
    font-size: 24px;
    font-family: ${({ theme }) => theme?.fontHanna};
  }
`;

const PaymentWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-self: end;
  width: 100%;
  border-top: 2px solid ${({ theme }) => theme?.colorFooter};
  padding: 8px 0 0;
  gap: 18px;

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

  .end {
    justify-content: flex-end;
    gap: 8px;
  }
`;

const InfoSection: FC<InfoSectionProps> = ({ thumbnail, title, price, isSoldOut, onSubmitCart, onBuy }) => {
  const [totalPrice, setTotalPrice] = useState(price);
  const [modalVisible, setModalVisible] = useState(false);
  const history = useHistory();
  const { width } = useWindowSize();

  const movePayPage = () => {
    history.push(PAYMENT_URL);
  };

  const onClickCart = () => {
    setModalVisible(true);
    onSubmitCart(totalPrice / price);
  };

  const handleCounterChange = (v: number) => {
    setTotalPrice(v);
  };

  useEffect(() => {
    setTotalPrice(price);
  }, [price]);

  return (
    <Wrapper>
      {width >= 1200 ? (
        <ImageViewer className="image-viewer" imgSrc={thumbnail} imgWidth={450} imgHeight={527} />
      ) : (
        <Thumbnail src={thumbnail} alt={title} />
      )}
      <ItemInfo>
        <div className="top-wrapper">
          <img src={starsTitle} alt="stars-title" />
          <ItemTitle>{title}</ItemTitle>
          <ItemPrice>
            <div className="title">판매가격</div>
            <div className="price">{formatPrice(price)}원</div>
            <div className="title">배송정보</div>
            <div>데모기념 오늘만 배송비 무료!!!</div>
          </ItemPrice>
          <ItemCounter title={title} price={price} onChange={handleCounterChange} />
        </div>
        <PaymentWrapper>
          <div className="row">
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
                <TextButton title="장바구니" type="button" styleType="white" onClick={onClickCart} />
                <TextButton title="바로구매" type="button" styleType="black" onClick={onBuy} />
              </>
            )}
          </div>
        </PaymentWrapper>
      </ItemInfo>
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

export default InfoSection;
