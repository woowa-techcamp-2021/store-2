import React, { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'lib/router';

import useInputs from 'hooks/use-inputs';

import { RootState } from 'store';
import { addAddress, getListAddress, removeAddress } from 'store/address';
import MyNav from 'components/my/my-nav';
import MyAddressForm from 'components/my/my-address/my-address-form';
import MyAddressTable from 'components/my/my-address/my-address-table';

const MyAddressContainer: FC = () => {
  const [nameError, setNameError] = useState('');
  const [receiverError, setReceiverError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [addressDetailError, setAddressDetailError] = useState('');
  const [addError, setAddError] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const [address, setAddress] = useState('');

  const [{ name, receiver, addressDetail }, onChange, reset] = useInputs({
    name: '',
    receiver: '',
    addressDetail: '',
  });

  const { loading, addLoading, removeLoading, user, userLoading, addressList, error } = useSelector(
    ({ auth, loading, address }: RootState) => ({
      loading: loading['address/getListAddress'],
      addLoading: loading['address/addAddress'],
      removeLoading: loading['address/removeAddAddress'],
      user: auth.user.userId,
      userLoading: loading['auth/getUser'],
      addressList: address.list,
      error: address.error,
    }),
  );

  useEffect(() => {
    dispatch({ type: getListAddress.type });
  }, [dispatch]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNameError('');
    setReceiverError('');
    setAddressError('');
    setAddError('');
    if (!name) setNameError('배송지를 입력하세요');
    if (!receiver) setReceiverError('받는분을 입력하세요');
    if (!address) setAddressError('주소를 입력하세요');
    if (!addressDetail) setAddressDetailError('상세주소를 입력하세요');
    if (addressList.length >= 3) setAddError('배송지는 최대 3개까지 입력할 수 있습니다');
    if (name && receiver && addressDetail && addressList.length < 3) {
      dispatch({ type: addAddress.type, payload: { name, receiver, address: `${address} ${addressDetail}` } });
      reset();
    }
  };
  const onRemove = (id: string) => {
    dispatch({ type: removeAddress.type, payload: { id } });
  };

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
        setAddress={setAddress}
        addressDetail={addressDetail}
        onChange={onChange}
        onSubmit={onSubmit}
        nameError={nameError}
        receiverError={receiverError}
        addressError={addressError}
        addressDetailError={addressDetailError}
        addError={addError}
        loading={addLoading}
      />
      <MyAddressTable loading={loading} addressList={addressList} onRemove={onRemove} removeLoading={removeLoading} />
    </>
  );
};

export default MyAddressContainer;
