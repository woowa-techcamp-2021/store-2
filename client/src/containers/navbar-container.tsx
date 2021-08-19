import React, { FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { logout } from 'store/auth';
import { IUser } from 'types/auth';
import { Navbar } from 'components';
import AuthLogoutModal from 'components/auth/logout-modal';

interface HeaderProps {
  displayMain?: boolean;
  isMobile: boolean;
}

const HeaderContainer: FC<HeaderProps> = ({ displayMain = false, isMobile }) => {
  const [modal, setModal] = useState(false);
  const { userId }: IUser = useSelector(({ auth }: RootState) => ({
    userId: auth.user.userId,
  }));
  const dispatch = useDispatch();

  const onLogout = (): void => {
    setModal(true);
  };
  const onCancel = (): void => {
    setModal(false);
  };
  const onConfirm = (): void => {
    setModal(false);
    dispatch({ type: logout.type });
  };

  return (
    <>
      <Navbar displayMain={displayMain} isMobile={isMobile} userId={userId} onLogout={onLogout} />
      {modal && <AuthLogoutModal onCancel={onCancel} onConfirm={onConfirm} />}
    </>
  );
};

export default HeaderContainer;
