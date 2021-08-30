import React, { useState, useCallback, Fragment, FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'lib/woowahan-components';
import { useHistory } from 'lib/router';

import { PAYMENT_URL } from 'constants/urls';
import { cartGenerator } from 'utils/cart-generator';

import { RootState } from 'store';

import { TextButton, PriceCalculator } from 'components';
import { setCart } from 'store/cart';
import LoginModal from 'components/auth/login-modal';
import { TableSection, CartItem } from './table-section';

const SectionTitle = styled.h4`
  width: 100%;
  font-size: 18px;
  font-weight: ${({ theme }) => theme?.weightBold};
  padding-bottom: 12px;
  margin-top: 5px;
`;

const ContinueLink = styled.div`
  cursor: pointer;
  width: 80px;
  padding-top: 20px;
  font-size: 12px;
  color: ${({ theme }) => theme?.colorSoftBlack};

  &:hover {
    color: ${({ theme }) => theme?.colorGreyMid};
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-bottom: 50px;

  @media all and (max-width: 800px) {
    justify-content: center;

    > button:first-child {
      margin: 14px;
      margin-top: 0;
    }
  }
`;

const OrderButtonDiv = styled.div`
  display: flex;

  button:first-child {
    margin-right: 10px;
  }
`;
const Cart: FC = () => {
  const { userId, cart } = useSelector(({ auth, cart }: RootState) => ({
    userId: auth.user.userId,
    cart: cart.cart,
  }));
  const getCartItemIndexes = () => {
    const cartItems = cartGenerator(cart);
    const indexes: number[] = [];
    cartItems.forEach((item, index) => indexes.push(index));
    return indexes;
  };
  const [prices, setPrices] = useState([0]);
  const [totalCount, setTotalCount] = useState(0);
  const [cartItems, setCartItems] = useState(cartGenerator(cart));
  const [checkAll, setCheckAll] = useState(true);
  const [checkedItems, setCheckedItems] = useState(new Set<number>(getCartItemIndexes()));
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setCartItems(cartGenerator(cart));
  }, [cart]);

  const onClick = useCallback(() => history.goBack(), [history]);

  const deleteSelectCartItem = useCallback(() => {
    const data = localStorage.getItem('select') as string;
    const select = data.split(',');
    let cartItems = cartGenerator(cart);
    cartItems = cartItems.filter((item, index) => select.indexOf(index.toString()) < 0);
    let cartItemsString = '';
    cartItems.forEach(item => {
      cartItemsString += `${item.id},${item.thumbnail},${item.title},${item.count},${item.price},`;
    });
    cartItemsString = cartItemsString.slice(0, cartItemsString.length - 1);
    dispatch({ type: setCart, payload: cartItemsString });
    localStorage.removeItem('select');
    setPrices([0]);
    setTotalCount(0);
    setCheckAll(false);
    setCheckedItems(new Set<number>());
  }, [cart, dispatch]);

  const orderCartItem = (isAll: boolean) => {
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

  const onClickOrder = (isAll: boolean) => () => {
    if (userId) {
      localStorage.removeItem('select');
      orderCartItem(isAll);
    } else {
      setModalVisible(true);
    }
  };

  const updatePrice = useCallback(
    (set: Set<number>) => {
      const cartItems = cartGenerator(cart);
      const prices = [] as number[];
      let totalCount = 0;
      Array.from(set).forEach(index => {
        const item = cartItems[Number(index)];
        prices.push(item.price * item.count);
        totalCount += item.count;
      });
      if (prices.length === 0) {
        prices.push(0);
      }
      setPrices(prices);
      setTotalCount(totalCount);
    },
    [setPrices, setTotalCount, cart],
  );

  useEffect(() => {
    updatePrice(checkedItems);
    localStorage.setItem('select', Array.from(checkedItems).join(','));
  }, [updatePrice, checkedItems]);

  return (
    <>
      <SectionTitle> </SectionTitle>
      <TableSection
        cartItems={cartItems}
        checkedItems={checkedItems}
        checkAll={checkAll}
        updatePrice={updatePrice}
        setCheckAll={setCheckAll}
        setCheckedItems={setCheckedItems}
      />
      <ContinueLink onClick={onClick}>{'<'} 쇼핑 계속하기</ContinueLink>
      <PriceCalculator prices={prices} totalCount={totalCount} />
      <ButtonDiv>
        <TextButton title="선택 상품 삭제" type="submit" styleType="white" onClick={deleteSelectCartItem} />
        <OrderButtonDiv>
          <TextButton title="선택 상품 주문" type="submit" styleType="white" onClick={onClickOrder(false)} />
          <TextButton title="전체 상품 주문" type="submit" styleType="black" onClick={onClickOrder(true)} />
        </OrderButtonDiv>
      </ButtonDiv>
      <LoginModal visible={modalVisible} setVisible={setModalVisible} />
    </>
  );
};

export default Cart;
