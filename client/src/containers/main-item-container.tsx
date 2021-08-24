import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MainItemWrapper from 'components/item/main-item/main-item-wrapper';

import { RootState } from 'store';
import { getMainItem } from 'store/item';

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
    <>
      <MainItemWrapper title="잘나가요" items={popularItems} loading={loading} />
      <MainItemWrapper title="새로 나왔어요" items={newItems} loading={loading} />
      <MainItemWrapper title="추천드려요" items={recommendItems} loading={loading} />
    </>
  );
};

export default MainItemContainer;
