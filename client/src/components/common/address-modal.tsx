import styled from 'lib/woowahan-components';
import React, { FC } from 'react';
import DaumPostcode from 'react-daum-postcode';

interface IAddressData {
  roadAddress: string;
}

interface AddressModalProps {
  handleComplete: (data: IAddressData) => void;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const Modal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalInner = styled.div`
  width: 80%;
  max-width: 600px;
  #__daum__layer_1 {
    border-radius: 10px;
  }
`;

const AddressModal: FC<AddressModalProps> = ({ handleComplete, setModal }) => {
  const modalClickHandler = (e: Event) => {
    if (e.target === e.currentTarget) setModal(false);
  };
  return (
    <Modal onClick={modalClickHandler}>
      <ModalInner>
        <DaumPostcode onComplete={handleComplete} animation />
      </ModalInner>
    </Modal>
  );
};

export default AddressModal;
