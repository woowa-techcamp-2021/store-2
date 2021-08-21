import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { getMainItem } from 'store/item';
import { MainItemWrapper } from 'components';

const MainItemContainer: FC = () => {
  const { popularItems, newItems, recommendItems, loading } = useSelector(({ item, loading }: RootState) => ({
    popularItems: item.main.popularItems,
    newItems: item.main.newItems,
    recommendItems: item.main.recommendItems,
    loading: loading['item/getMainItem'],
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: getMainItem.type });
  }, [dispatch]);
  return (
    <MainItemWrapper
      popularItems={popularItems}
      newItems={newItems}
      recommendItems={recommendItems}
      loading={loading}
    />
  );
};

export default MainItemContainer;
