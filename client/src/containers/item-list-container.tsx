import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import ItemListWrapper from 'components/item/item-list-wrapper';
import { useQuery } from 'lib/router';
import { getListItem } from 'store/item';

const ItemListContainer: FC = () => {
  const { items, pageCount, loading } = useSelector(({ item, loading }: RootState) => ({
    items: item.list.items,
    pageCount: item.list.pageCount,
    loading: loading['item/getListItem'],
  }));
  const dispatch = useDispatch();
  const query = useQuery();
  useEffect(() => {
    const { categoryId, pageId, type, search } = query;
    dispatch({ type: getListItem.type, payload: { categoryId, pageId, type, search } });
  }, [query, dispatch]);
  return <ItemListWrapper items={items} pageCount={pageCount} loading={loading} />;
};

export default ItemListContainer;
