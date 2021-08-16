import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { decrement, increaseAsync } from 'store/counter';
import Counter from 'components/saga-example/counter';
import Header from 'components/common/header';

interface HedaerProps {
  displayMain?: boolean;
  isMobile: boolean;
}

const HeaderContainer: FC<HedaerProps> = ({ displayMain = false, isMobile }) => {
  return <Header displayMain={displayMain} isMobile={isMobile} />;
};

export default HeaderContainer;
