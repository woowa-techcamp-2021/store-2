import React, { FC, Dispatch, SetStateAction } from 'react';
import styled from 'lib/woowahan-components';
import { Modal } from 'components';

interface LogoutModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  onConfirm: () => void;
}

const Title = styled.h2`
  span {
    color: ${props => props.theme?.colorPrimary};
  }
`;

const LogoutModal: FC<LogoutModalProps> = ({ visible, setVisible, onConfirm }) => {
  return (
    <Modal
      type="confirm"
      header={
        <Title>
          정말 <span>로그아웃</span> 하시겠습니까?
        </Title>
      }
      body={<p>나중에 꼭 다시 로그인하러 오세요~</p>}
      visible={visible}
      setVisible={setVisible}
      onConfirm={onConfirm}
    />
  );
};

export default LogoutModal;
