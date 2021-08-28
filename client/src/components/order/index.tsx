import React, { useState, Fragment, FC, Dispatch, SetStateAction } from 'react';
import styled from 'lib/woowahan-components';

import { TextButton, CheckBox, GridForm, PriceCalculator } from 'components';
import TableSection, { OrderItem } from './table-section';
import RadioButton from './radio-button';

interface OrderProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  orderItems: OrderItem[];
  phone: string;
  setPhone: Dispatch<SetStateAction<string>>;
  userError: string;
  phoneError: string;
  receiverError: string;
  addressError: string;
  submitError: string;
  user: string;
  address: string;
  receiver: string;
  onChange: (id: 'user' | 'receiver' | 'address') => (e: React.ChangeEvent<HTMLInputElement>) => void;
  getLoading: boolean;
  submitLoading: boolean;
  addresses: { name: string; address: string }[];
  pickAddress: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addressChecked: string;
}

const SectionTitle = styled.h4`
  width: 100%;
  font-size: 18px;
  font-weight: ${({ theme }) => theme?.weightBold};
  padding-bottom: 12px;
  margin: 30px 0 10px;
`;

const Term = styled.p`
  width: 460px;
  font-size: 12px;
  line-height: 17px;
  margin-bottom: 12px;
  align-self: center;
  text-align: center;

  ${({ theme }) => theme?.mobile} {
    width: 100%;
  }
`;

const Agree = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
`;

const CheckBoxDiv = styled.div`
  margin-bottom: 20px;
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
`;

const InputErrorMessage = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme?.colorError};
`;

const SubmitErrorMessage = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme?.colorError};
  margin-top: 16px;
`;

const ButtonDiv = styled.div`
  margin-bottom: 34px;
`;

const Order: FC<OrderProps> = ({
  onSubmit,
  orderItems,
  phone,
  setPhone,
  userError,
  phoneError,
  receiverError,
  addressError,
  submitError,
  user,
  address,
  receiver,
  onChange,
  getLoading,
  submitLoading,
  addresses,
  pickAddress,
  addressChecked,
}) => {
  const [agreed, setAgreed] = useState(false);

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

  const onAgree = () => {
    setAgreed(state => !state);
  };

  return (
    <>
      <SectionTitle>주문상세내역</SectionTitle>
      <TableSection orderItems={orderItems} loading={getLoading} />
      <Form onSubmit={onSubmit}>
        <SectionTitle>주문자 정보</SectionTitle>
        <GridForm titles={['주문하시는 분*', '전화번호*']}>
          <InputWrapper>
            <input minLength={2} name="user" value={user} onChange={onChange('user')} />
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
            {addresses.map(address => {
              return (
                <RadioButton
                  key={address.name}
                  id={address.name}
                  text={address.name}
                  value={address.address}
                  onChange={pickAddress}
                  checked={addressChecked}
                />
              );
            })}
          </InputWrapper>
          <InputWrapper>
            <input name="receiver" value={receiver} onChange={onChange('receiver')} />
            <InputErrorMessage>{receiverError}</InputErrorMessage>
          </InputWrapper>
          <InputWrapper>
            <input placeholder="주소" name="address" value={address} onChange={onChange('address')} />
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
          <CheckBoxDiv>
            <CheckBox
              id="term"
              text="(필수) 구매하실 상품의 결제정보를 확인하였으며, 구매진행에 동의합니다"
              onChange={onAgree}
            />
          </CheckBoxDiv>
        </Agree>
        <ButtonDiv>
          <TextButton title="결제하기" type="submit" styleType="black" disabled={!agreed} isLoading={submitLoading} />
          <SubmitErrorMessage>{submitError}</SubmitErrorMessage>
        </ButtonDiv>
      </Form>
    </>
  );
};

export default Order;
