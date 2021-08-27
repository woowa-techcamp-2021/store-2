import React, { FC, Dispatch, SetStateAction } from 'react';
import { useHistory } from 'lib/router';

import { SIGNIN_URL } from 'constants/urls';

import { Modal } from 'components';

interface LoginModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const LoginModal: FC<LoginModalProps> = ({ visible, setVisible }) => {
  const history = useHistory();

  const moveSignin = () => {
    history.push(SIGNIN_URL);
  };

  return (
    <Modal
      type="confirm"
      header={<div>로그인이 필요합니다</div>}
      body={<div>로그인 페이지로 이동하시겠습니까?</div>}
      visible={visible}
      setVisible={setVisible}
      onConfirm={moveSignin}
    />
  );
};

export default LoginModal;
