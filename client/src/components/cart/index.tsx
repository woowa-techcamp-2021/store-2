import React, { useState, useCallback, Fragment, FC } from 'react';
import styled from 'lib/woowahan-components';
import { useHistory } from 'lib/router';

import { PAYMENT_URL } from 'constants/urls';

import TextButton from 'components/common/text-button';
import PriceCalculator from 'components/common/price-calculator';
import { TableSection, CartItem } from './table-section';

const Empty = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 80px;
  font-family: ${props => props.theme?.fontEuljiro10};
  color: ${props => props.theme?.colorLine};
  font-size: 80px;
`;

const Title = styled.h2`
  width: 100%;
  font-size: 28px;
  font-weight: ${({ theme }) => theme?.weightBold};
  padding-bottom: 30px;
  border-bottom: 1px solid ${({ theme }) => theme?.colorLineLight};
  margin-bottom: 24px;
`;

const ContinueLink = styled.div`
  cursor: pointer;
  padding-top: 20px;
  font-size: 12px;
  color: ${({ theme }) => theme?.colorSoftBlack};
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 50px;
`;

const OrderButtonDiv = styled.div``;

const cartValidator = (): boolean => {
  const data = localStorage.getItem('cart') as string;
  if (data !== null) {
    const cartData = data.split(',');
    try {
      if (cartData.length !== 0 && cartData.length % 5 === 0) {
        cartData.forEach((value, idx) => {
          const valueSplit = value.split('.');

          switch (idx % 5) {
            case 0:
              if (Number.isNaN(Number(value))) {
                throw new Error('올바르지 않은 아이템 아이디');
              }
              break;
            case 1:
              if (
                !(
                  value.indexOf('https://storage.googleapis.com/bmart-5482b.appspot.com/') >= 0 &&
                  (valueSplit[valueSplit.length - 1] === 'jpg' || valueSplit[valueSplit.length - 1] === 'png')
                )
              ) {
                throw new Error('올바르지 않은 썸네일 주소');
              }
              break;
            case 2:
              break;
            case 3:
              if (Number.isNaN(Number(value))) {
                throw new Error('올바르지 않은 갯수');
              }
              break;
            case 4:
              if (Number.isNaN(Number(value))) {
                throw new Error('올바르지 않은 가격');
              }
              break;
            default:
              break;
          }
        });
      } else {
        throw new Error('카트 데이터 오류');
      }

      return true;
    } catch (error) {
      localStorage.removeItem('cart');
      return false;
    }
  } else {
    return false;
  }
};

const cartGenerator = (): CartItem[] => {
  if (cartValidator()) {
    const cartItems: CartItem[] = [];
    const data = localStorage.getItem('cart') as string;
    const cartData = data.split(',');
    cartData.forEach((value, idx) => {
      const num = Math.floor(idx / 5);
      switch (idx % 5) {
        case 0:
          cartItems.push({ id: value, thumbnail: '', title: '', count: 0, price: 0 });
          break;
        case 1:
          cartItems[num].thumbnail = value;
          break;
        case 2:
          cartItems[num].title = value;
          break;
        case 3:
          cartItems[num].count = Number(value);
          break;
        case 4:
          cartItems[num].price = Number(value);
          break;
        default:
          break;
      }
    });
    return cartItems;
  }
  return [];
};

const Cart: FC = () => {
  const [prices, setPrices] = useState([0]);
  const [totalCount, setTotalCount] = useState(0);
  const [cartItems, setCartItems] = useState(cartGenerator());
  const [checkedItems, setCheckedItems] = useState(new Set<number>());
  const history = useHistory();
  const onClick = useCallback(() => history.goBack(), [history]);

  const deleteSelectCartItem = () => {
    const data = localStorage.getItem('select') as string;
    const select = data.split(',');
    let cartItems = cartGenerator();
    cartItems = cartItems.filter((item, index) => select.indexOf(index.toString()) < 0);
    let cartItemsString = '';
    cartItems.forEach(item => {
      cartItemsString += `${item.id},${item.thumbnail},${item.title},${item.count},${item.price},`;
    });
    cartItemsString = cartItemsString.slice(0, cartItemsString.length - 1);
    localStorage.setItem('cart', cartItemsString);
    localStorage.removeItem('select');
    setCartItems(cartGenerator());
    setPrices([0]);
    setTotalCount(0);
    setCheckedItems(new Set<number>());
  };

  const orderCartItem = (isAll: boolean) => () => {
    let selectCartItems: CartItem[] = [];
    if (isAll) {
      selectCartItems = cartItems;
    } else {
      Array.from(checkedItems).forEach(index => selectCartItems.push(cartItems[index]));
    }
    let selectCartItemsString = '';
    selectCartItems.forEach(item => {
      selectCartItemsString += `${item.id}-${item.count},`;
    });
    selectCartItemsString = selectCartItemsString.slice(0, selectCartItemsString.length - 1);

    if (selectCartItemsString !== '') {
      sessionStorage.setItem('order', selectCartItemsString);
      history.push(PAYMENT_URL);
    }
  };

  return (
    <>
      <Title>장바구니</Title>
      {cartValidator() ? (
        <>
          <TableSection
            cartItems={cartItems}
            checkedItems={checkedItems}
            setPrices={setPrices}
            setTotalCount={setTotalCount}
            setCheckedItems={setCheckedItems}
          />
          <ContinueLink onClick={onClick}>{'<'} 쇼핑 계속하기</ContinueLink>
          <PriceCalculator prices={prices} totalCount={totalCount} />
          <ButtonDiv>
            <TextButton title="선택 상품 삭제" type="submit" styleType="white" onClick={deleteSelectCartItem} />
            <OrderButtonDiv>
              <TextButton title="선택 상품 주문" type="submit" styleType="white" onClick={orderCartItem(false)} />
              <TextButton title="전체 상품 주문" type="submit" styleType="black" onClick={orderCartItem(true)} />
            </OrderButtonDiv>
          </ButtonDiv>
        </>
      ) : (
        <Empty>
          <div>텅</div>
        </Empty>
      )}
    </>
  );
};

export default Cart;
