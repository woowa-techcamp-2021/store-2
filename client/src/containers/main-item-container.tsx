import React, { FC, useEffect } from 'react';
import ItemList from 'components/item/item-list';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { getMainItems } from 'store/items';

const MainItemContainer: FC = () => {
  const { popularItems, newItems, recommendItems, loading } = useSelector(({ items, loading }: RootState) => ({
    popularItems: items.mainItems.popularItems,
    newItems: items.mainItems.newItems,
    recommendItems: items.mainItems.recommendItems,
    loading: loading['auth/getMainItemSuccess'],
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: getMainItems.type });
  }, [dispatch]);
  return (
    <>
      <div>잘나가요</div>
      <ItemList items={popularItems} isLoading={loading} />
      <div>새로 나왔어요</div>
      <ItemList items={newItems} isLoading={loading} />
      <div>추천 드려요</div>
      <ItemList items={recommendItems} isLoading={loading} />
    </>
  );
  // 로딩을 위에서나 전체 레이아웃같은데다가 줘도 될듯
  // return <ItemList items={ITEM_DUMMY} isLoading={false} />;
};

export default MainItemContainer;
