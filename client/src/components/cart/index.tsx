import React, { useState, useCallback, Fragment, FC } from 'react';
import { useSelector } from 'react-redux';
import styled from 'lib/woowahan-components';
import { useHistory } from 'lib/router';

import { PAYMENT_URL } from 'constants/urls';
import { cartGenerator } from 'utils/cart-generator';

import { RootState } from 'store';

import { TextButton } from 'components';
import Modal from 'components/common/modal';
import PriceCalculator from 'components/common/price-calculator';
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
    border-bottom: 1px solid #000;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-bottom: 50px;
  @media all and (max-width: 800px) {
    gap: 14px;
    justify-content: center;
  }
`;

const OrderButtonDiv = styled.div`
  display: flex;
  gap: 10px;
`;

const Cart: FC = () => {
  const [prices, setPrices] = useState([0]);
  const [totalCount, setTotalCount] = useState(0);
  const [cartItems, setCartItems] = useState(cartGenerator());
  const [checkAll, setCheckAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Set<number>());
  const [modalVisible, setModalVisible] = useState(false);
  const history = useHistory();
  const onClick = useCallback(() => history.goBack(), [history]);

  const { userId } = useSelector(({ auth }: RootState) => ({
    userId: auth.user.userId,
  }));

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
    setCheckAll(false);
    setCheckedItems(new Set<number>());
  };

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
      orderCartItem(isAll);
    } else {
      setModalVisible(true);
    }
  };

  return (
    <>
      <SectionTitle> </SectionTitle>
      <TableSection
        cartItems={cartItems}
        checkedItems={checkedItems}
        checkAll={checkAll}
        setPrices={setPrices}
        setTotalCount={setTotalCount}
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
      <Modal type="alert" header={<div>로그인이 필요합니다</div>} visible={modalVisible} setVisible={setModalVisible} />
    </>
  );
};

export default Cart;
