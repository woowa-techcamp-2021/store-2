import React, { FC, useEffect, useState } from 'react';
import styled from 'lib/woowahan-components';

import GridForm from 'components/common/grid-form';
import TextButton from 'components/common/button/text-button';
import AddressModal from 'components/common/address-modal';

interface MyAddressFormProps {
  name: string;
  receiver: string;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  addressDetail: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  nameError: string;
  receiverError: string;
  addressError: string;
  addressDetailError: string;
  addError: string;
  loading: boolean;
}

interface IAddressData {
  roadAddress: string;
}

const Form = styled.form`
  margin-top: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const InputErrorMessage = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme?.colorError};
  margin: 0 0 0 10px;
  ${({ theme }) => theme?.tablet} {
    @media all and (max-width: 741px) {
      margin: 5px 40px 0 0;
    }
  }
  ${({ theme }) => theme?.mobile} {
    margin: 5px 0 0 0;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  > div {
    font-size: 12px;
    color: ${({ theme }) => theme?.colorError};
    margin-right: 10px;
  }
`;

const MyAddressForm: FC<MyAddressFormProps> = ({
  name,
  receiver,
  address,
  setAddress,
  addressDetail,
  onChange,
  onSubmit,
  nameError,
  receiverError,
  addressError,
  addressDetailError,
  addError,
  loading,
}) => {
  const [modal, setModal] = useState(false);
  const handleComplete = (data: IAddressData) => {
    setAddress(data.roadAddress);
  };
  useEffect(() => {
    if (address) setModal(false);
  }, [address]);
  return (
    <>
      <Form onSubmit={onSubmit}>
        <GridForm titles={['배송지이름*', '받는분*', '주소*', '상세주소*']}>
          <InputWrapper>
            <input name="name" value={name} onChange={onChange} maxLength={10} placeholder="우형집" />
            <InputErrorMessage>{nameError}</InputErrorMessage>
          </InputWrapper>
          <InputWrapper>
            <input name="receiver" value={receiver} onChange={onChange} maxLength={20} placeholder="홍길동" />
            <InputErrorMessage>{receiverError}</InputErrorMessage>
          </InputWrapper>
          <InputWrapper>
            <input
              value={address}
              onChange={onChange}
              readOnly
              onClick={() => setModal(true)}
              placeholder="서울 강남구 가로수길"
            />
            <InputErrorMessage>{addressError}</InputErrorMessage>
          </InputWrapper>
          <InputWrapper>
            <input
              name="addressDetail"
              value={addressDetail}
              onChange={onChange}
              readOnly={!address.length}
              placeholder="102호"
            />
            <InputErrorMessage>{addressDetailError}</InputErrorMessage>
          </InputWrapper>
        </GridForm>
        <ButtonWrapper>
          <div>{addError}</div>
          <TextButton type="submit" styleType="black" title="배송지 추가" size="tiny" isLoading={loading} />
        </ButtonWrapper>
      </Form>
      {modal && <AddressModal handleComplete={handleComplete} setModal={setModal} />}
    </>
  );
};

export default MyAddressForm;
