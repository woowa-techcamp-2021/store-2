import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { getMainItems } from 'store/items';
import MainItems from 'components/item/main-items';

const MainItemContainer: FC = () => {
  const { popularItems, newItems, recommendItems, loading } = useSelector(({ items, loading }: RootState) => ({
    popularItems: items.mainItems.popularItems,
    newItems: items.mainItems.newItems,
    recommendItems: items.mainItems.recommendItems,
    loading: loading['auth/getMainItem'],
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: getMainItems.type });
  }, [dispatch]);
  return (
    <MainItems popularItems={popularItems} newItems={newItems} recommendItems={recommendItems} loading={loading} />
  );
};

export default MainItemContainer;
