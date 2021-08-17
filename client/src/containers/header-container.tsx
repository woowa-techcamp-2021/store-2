import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { logout } from 'store/auth';
import { Header } from 'components';
import { IUser } from 'types/auth';

interface HeaderProps {
  displayMain?: boolean;
  isMobile: boolean;
}

const HeaderContainer: FC<HeaderProps> = ({ displayMain = false, isMobile }) => {
  const { userId }: IUser = useSelector(({ auth }: RootState) => ({
    userId: auth.user.userId,
  }));
  const dispatch = useDispatch();

  const onLogout = (): void => {
    dispatch({ type: logout.type });
  };
  return <Header displayMain={displayMain} isMobile={isMobile} userId={userId} onLogout={onLogout} />;
};

export default HeaderContainer;
