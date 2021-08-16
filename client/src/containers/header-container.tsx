import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import Header from 'components/common/header';
import { logout } from 'store/auth';

type IUserId = string | null | undefined;

interface HedaerProps {
  displayMain?: boolean;
  isMobile: boolean;
}

interface IRedux {
  userId: IUserId;
}

const HeaderContainer: FC<HedaerProps> = ({ displayMain = false, isMobile }) => {
  const { userId }: IRedux = useSelector(({ auth }: RootState) => ({
    userId: auth.user.userId,
  }));
  const dispatch = useDispatch();

  const onLogout = (): void => {
    dispatch({ type: logout.type });
  };
  return <Header displayMain={displayMain} isMobile={isMobile} userId={userId} onLogout={onLogout} />;
};

export default HeaderContainer;
