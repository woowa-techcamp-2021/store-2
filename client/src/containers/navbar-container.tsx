import React, { FC, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Navbar } from 'components';
import AuthLogoutModal from 'components/auth/logout-modal';

import { RootState } from 'store';
import { logout } from 'store/auth';

interface NavbarProps {
  displayMain?: boolean;
  isMobile: boolean;
}
const NavbarContainer: FC<NavbarProps> = ({ displayMain = false, isMobile }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { userId } = useSelector(({ auth }: RootState) => ({
    userId: auth.user.userId,
  }));
  const dispatch = useDispatch();

  const onLogout = useCallback((): void => setModalVisible(true), []);

  const handleLogout = (): void => {
    dispatch({ type: logout.type });
  };

  return (
    <>
      <Navbar displayMain={displayMain} isMobile={isMobile} userId={userId} onLogout={onLogout} />
      {modalVisible && <AuthLogoutModal visible={modalVisible} setVisible={setModalVisible} onConfirm={handleLogout} />}
    </>
  );
};

export default NavbarContainer;
