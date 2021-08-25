/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'lib/router';

import { RootState } from 'store';
import { postOrder, getOrderItems } from 'store/order';

import Order from 'components/order';

import {
  userValidation,
  addressValidation,
  receiverValidation,
  phoneValidation,
} from 'utils/validation/order-validation';

interface IOrderItems {
  id: string;
  thumbnail: string;
  title: string;
  price: number;
  count: number;
}

const parseOrderParams = (orderParms: string): { itemIDs: string; count: number[] } => {
  const arr = orderParms.split(',');
  const idArr: string[] = [];
  const countArr: number[] = [];

  arr.forEach(orderParam => {
    const [id, count] = orderParam.split('-');

    if (!id || !count) {
      throw new Error('invalid params');
    }

    idArr.push(id);
    countArr.push(Number(count));
  });

  return {
    itemIDs: idArr.join(','),
    count: countArr,
  };
};

const OrderContainer: FC = () => {
  const [phone, setPhone] = useState('');
  const [userError, setUserError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [receiverError, setReceiverError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [orderItems, setOrderItems] = useState<IOrderItems[]>([]);
  const [user, setUser] = useState('');
  const [receiver, setReceiver] = useState('');
  const [address, setAddress] = useState('');
  const [addressChecked, setaddressChecked] = useState('');
  const { userId, submitError, itemsData, getLoading, submitLoading, addresses } = useSelector(
    ({ auth, order, loading }: RootState) => ({
      userId: auth.user.userId || '',
      submitError: order.postError || '',
      itemsData: order.orderItems,
      getLoading: loading['order/getOrderItems'],
      submitLoading: loading['order/postOrder'],
      addresses: [{ name: '', address: '' }],
    }),
  );

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setUser(userId);
  }, [userId]);

  useEffect(() => {
    const orderParamsString = window.sessionStorage.getItem('order') || '';
    const { count } = parseOrderParams(orderParamsString);

    const newOrderItems = itemsData.map((itemData, i) => {
      return { count: count[i], ...itemData };
    });

    setOrderItems(newOrderItems);
  }, [itemsData]);

  useEffect(() => {
    try {
      const orderParamsString = window.sessionStorage.getItem('order') || '';
      const { itemIDs } = parseOrderParams(orderParamsString);
      dispatch({ type: getOrderItems.type, payload: itemIDs });
    } catch (err) {
      setOrderItems([]);
      window.sessionStorage.removeItem('order');
      history.goBack();
    }
  }, []);

  const onChange = (id: 'user' | 'receiver' | 'address') => (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (id) {
      case 'user':
        setUser(e.target.value);
        break;
      case 'receiver':
        setReceiver(e.target.value);
        break;
      case 'address':
        setAddress(e.target.value);
        break;
      default:
    }
  };

  const pickAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { address } = addresses.find(v => v.name === e.target.value) || { address: '' };
    setAddress(address);
    setaddressChecked(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: HTML invalid 사용 검토
    setUserError('');
    setPhoneError('');
    setReceiverError('');
    setAddressError('');

    if (userValidation(user)) {
      setUserError(userValidation(user));
      return;
    }
    if (phoneValidation(phone)) {
      setPhoneError(phoneValidation(phone));
      return;
    }
    if (addressValidation(address)) {
      setAddressError(addressValidation(address));
      return;
    }
    if (receiverValidation(receiver)) {
      setAddressError(receiverValidation(receiver));
      return;
    }

    const itemList = orderItems.map(({ id, count }) => ({
      quantity: count,
      itemId: id,
    }));

    const payload = {
      user,
      phone: phone.replace(/-/g, ''),
      address,
      receiver: receiver || user,
      itemList,
    };

    dispatch({ type: postOrder.type, payload });
  };

  return (
    <Order
      onSubmit={onSubmit}
      orderItems={orderItems}
      phone={phone}
      setPhone={setPhone}
      userError={userError}
      phoneError={phoneError}
      receiverError={receiverError}
      addressError={addressError}
      submitError={submitError}
      user={user}
      address={address}
      receiver={receiver}
      onChange={onChange}
      getLoading={getLoading}
      submitLoading={submitLoading}
      addresses={addresses}
      pickAddress={pickAddress}
      addressChecked={addressChecked}
    />
  );
};

export default OrderContainer;
