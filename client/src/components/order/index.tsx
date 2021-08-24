import React, { useState, Fragment, FC } from 'react';
import styled from 'lib/woowahan-components';

import useInputs from 'hooks/use-inputs';

import {
  userValidation,
  addressValidation,
  receiverValidation,
  phoneValidation,
} from 'utils/validation/order-validation';

import { TextButton, CheckBox, GridForm, PriceCalculator } from 'components';
import TableSection from './table-section';

const Title = styled.h2`
  width: 100%;
  font-size: 28px;
  font-weight: ${({ theme }) => theme?.weightBold};
  padding-bottom: 30px;
  border-bottom: 1px solid ${({ theme }) => theme?.colorLineLight};
  margin-bottom: 24px;
`;

const SectionTitle = styled.h4`
  width: 100%;
  font-size: 18px;
  font-weight: ${({ theme }) => theme?.weightBold};
  padding-bottom: 12px;
  margin: 50px 0 10px;
`;

const Term = styled.p`
  width: 460px;
  font-size: 12px;
  line-height: 17px;
  margin-bottom: 12px;
  align-self: center;

  ${({ theme }) => theme?.mobile} {
    width: 100%;
  }
`;

const Agree = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;

const InputErrorMessage = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme?.colorError};
`;

const mockData = {
  orderItems: [
    {
      id: '1',
      thumbnail: 'https://storage.googleapis.com/bmart-5482b.appspot.com/008/341_main_063.jpg',
      title: '재생지에 콩기름으로 인쇄한 일기장',
      count: 2,
      price: 3500,
    },
    {
      id: '2',
      thumbnail: 'https://storage.googleapis.com/bmart-5482b.appspot.com/008/156525120083s0.jpg',
      title: '일기장. 쓰고 자자',
      count: 2,
      price: 3000,
    },
  ],
  userId: 'gd',
};

const Order: FC = () => {
  const { orderItems, userId } = mockData;
  const [agreed, setAgreed] = useState(false);
  const [userError, setUserError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [receiverError, setReceiverError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [phone, setPhone] = useState('');
  const [{ user, receiver, address }, onChange] = useInputs({
    user: userId,
    receiver: '',
    address: '',
  });

  const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const currentValue = value.replace(/[^\d]/g, '');

    if (currentValue.length < 4) {
      setPhone(value);
    } else if (currentValue.length < 8 && currentValue.length >= 4) {
      setPhone(`${currentValue.slice(0, 3)}-${currentValue.slice(3)}`);
    } else if (currentValue.length >= 8) {
      setPhone(`${currentValue.slice(0, 3)}-${currentValue.slice(3, 7)}-${currentValue.slice(7)}`);
    }
  };

  const prices = orderItems.map(item => item.price * item.count);

  const totalCount = orderItems.reduce((acc, cur) => {
    return acc + cur.count;
  }, 0);

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

    console.log(user, phone, receiver, address);
  };

  const onAgree = () => {
    setAgreed(state => !state);
  };

  return (
    <>
      <Title>주문서 작성 / 결제</Title>
      <SectionTitle>주문상세내역</SectionTitle>
      <TableSection orderItems={orderItems} />
      <Form onSubmit={onSubmit}>
        <SectionTitle>주문자 정보</SectionTitle>
        <GridForm titles={['주문하시는 분*', '전화번호*']}>
          <InputWrapper>
            <input minLength={2} name="user" value={user} onChange={onChange} />
            <InputErrorMessage>{userError}</InputErrorMessage>
          </InputWrapper>
          <InputWrapper>
            <input name="phone" value={phone} onChange={onChangePhone} maxLength={13} />
            <InputErrorMessage>{phoneError}</InputErrorMessage>
          </InputWrapper>
        </GridForm>
        <SectionTitle>배송정보</SectionTitle>
        <GridForm titles={['배송지 확인', '받는분', '받으실 곳 *']}>
          <InputWrapper>
            <input name="" />
          </InputWrapper>
          <InputWrapper>
            <input name="receiver" value={receiver} onChange={onChange} />
            <InputErrorMessage>{receiverError}</InputErrorMessage>
          </InputWrapper>
          <InputWrapper>
            <input placeholder="주소" name="address" value={address} onChange={onChange} />
            <InputErrorMessage>{addressError}</InputErrorMessage>
          </InputWrapper>
        </GridForm>
        <SectionTitle>결제수단 선택 / 결제</SectionTitle>
        <GridForm titles={['결제수단']}>배민페이</GridForm>
        <PriceCalculator prices={prices} totalCount={totalCount} />
        <Term>
          전자상거래 등에서의 소비자보호에 관한 법률에 의거하여 미성년자가 물품을 구매하는 경우, 법정대리인이 동의하지
          않으면 미성년자 본인 또는 법정대리인이 구매를 취소할 수 있습니다.
        </Term>
        <Agree>
          <CheckBox
            id="term"
            text="(필수) 구매하실 상품의 결제정보를 확인하였으며, 구매진행에 동의합니다"
            onChange={onAgree}
          />
        </Agree>
        <TextButton title="결제하기" type="submit" styleType="black" disabled={!agreed} />
      </Form>
    </>
  );
};

export default Order;
