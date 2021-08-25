import React, { FC, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'lib/router';

import useInputs from 'hooks/use-inputs';

import { RootState } from 'store';
import { getOrders } from 'store/order';
import { getListAddress } from 'store/address';
import MyNav from 'components/my/my-nav';
import MyAddressForm from 'components/my/my-address/my-address-form';
import MyAddressTable from 'components/my/my-address/my-address-table';

const MyAddressContainer: FC = () => {
  const [nameError, setNameError] = useState('');
  const [receiverError, setReceiverError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [addError, setAddError] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const [{ name, receiver, address }, onChange] = useInputs({
    name: '',
    receiver: '',
    address: '',
  });

  useEffect(() => {
    dispatch({ type: getListAddress.type });
  }, [dispatch]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) setNameError('배송지를 입력하세요');
    if (!receiver) setReceiverError('받는분을 입력하세요');
    if (!address) setAddressError('주소를 입려갛세요');
    if (name && receiver && address) {
      // dispatch
    }
  };
  const onRemove = (e: React.MouseEvent) => {
    // dispatch
  };

  const { loading, user, userLoading, addressList, error } = useSelector(({ auth, loading, address }: RootState) => ({
    loading: loading['address/getListAddress'],
    user: auth.user.userId,
    userLoading: loading['auth/getUser'],
    addressList: address.list,
    error: address.error,
  }));

  useEffect(() => {
    if (error) setAddError(error);
  }, [error]);

  useEffect(() => {
    if (!userLoading && !user) history.push('/');
  }, [userLoading, user, history]);

  if (userLoading) return null;
  return (
    <>
      <MyNav />
      <MyAddressForm
        name={name}
        receiver={receiver}
        address={address}
        onChange={onChange}
        onSubmit={onSubmit}
        nameError={nameError}
        receiverError={receiverError}
        addressError={addressError}
        addError={addError}
        loading={loading}
      />
      <MyAddressTable loading={loading} addressList={addressList} />
    </>
  );
};

export default MyAddressContainer;
