import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import CategoryItems from 'components/item/category-items';
import { getCategoryItems } from 'store/items';

const CategoryItemContainer: FC = () => {
  const { items, loading } = useSelector(({ items, loading }: RootState) => ({
    items: items.items,
    loading: loading['items/getCategoryItems'],
  }));
  const dispatch = useDispatch();
  const [categoryId, pageId, type] = ['080000', 1, 'recent'];
  useEffect(() => {
    dispatch({ type: getCategoryItems.type, payload: { categoryId, pageId, type } });
  }, [dispatch, categoryId, pageId, type]);
  return <CategoryItems items={items} loading={loading} />;
};

export default CategoryItemContainer;
