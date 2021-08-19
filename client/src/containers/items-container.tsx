import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import Items from 'components/item/items';
import { useQuery } from 'lib/router';
import { getItems } from 'store/items';

const ItemsContainer: FC = () => {
  const { items, loading } = useSelector(({ items, loading }: RootState) => ({
    items: items.items,
    loading: loading['items/getItems'],
  }));
  const dispatch = useDispatch();
  const query = useQuery();
  useEffect(() => {
    const { categoryId, pageId, type, search } = query;
    dispatch({ type: getItems.type, payload: { categoryId, pageId, type, search } });
  }, [query, dispatch]);
  return <Items items={items} loading={loading} />;
};

export default ItemsContainer;
