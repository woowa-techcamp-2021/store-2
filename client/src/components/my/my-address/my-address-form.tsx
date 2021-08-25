import React, { FC } from 'react';
import styled from 'lib/woowahan-components';

import GridForm from 'components/common/grid-form';
import TextButton from 'components/common/button/text-button';

interface MyAddressFormProps {
  name: string;
  receiver: string;
  address: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  nameError: string;
  receiverError: string;
  addressError: string;
  addError: string;
  loading: boolean;
}

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

const ButtonWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  > div {
    font-size: 12px;
    color: ${({ theme }) => theme?.colorError};
    margin-left: 10px;
  }
`;

const MyAddressForm: FC<MyAddressFormProps> = ({
  name,
  receiver,
  address,
  onChange,
  onSubmit,
  nameError,
  receiverError,
  addressError,
  addError,
  loading,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <GridForm titles={['배송지이름*', '받는분*', '주소*']}>
        <InputWrapper>
          <input name="name" value={name} onChange={onChange} maxLength={10} />
          <InputErrorMessage>{nameError}</InputErrorMessage>
        </InputWrapper>
        <InputWrapper>
          <input name="receiver" value={receiver} onChange={onChange} maxLength={20} />
          <InputErrorMessage>{receiverError}</InputErrorMessage>
        </InputWrapper>
        <InputWrapper>
          <input name="address" value={address} onChange={onChange} maxLength={50} />
          <InputErrorMessage>{addressError}</InputErrorMessage>
        </InputWrapper>
      </GridForm>
      <ButtonWrapper>
        <TextButton type="submit" styleType="black" title="배송지 추가" size="small" isLoading={loading} />
        <div>{addError}</div>
      </ButtonWrapper>
    </form>
  );
};

export default MyAddressForm;
