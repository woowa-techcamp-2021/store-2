import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import ItemListWrapper from 'components/item/item-list-wrapper';
import { useQuery } from 'lib/router';
import { getItems } from 'store/items';

const ItemListContainer: FC = () => {
  const { items, pageCount, loading } = useSelector(({ items, loading }: RootState) => ({
    items: items.items.items,
    pageCount: items.items.pageCount,
    loading: loading['items/getItems'],
  }));
  const dispatch = useDispatch();
  const query = useQuery();
  useEffect(() => {
    const { categoryId, pageId, type, search } = query;
    dispatch({ type: getItems.type, payload: { categoryId, pageId, type, search } });
  }, [query, dispatch]);
  return <ItemListWrapper items={items} pageCount={pageCount} loading={loading} />;
};

export default ItemListContainer;
