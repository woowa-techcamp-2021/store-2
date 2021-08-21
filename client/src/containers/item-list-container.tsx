import React, { FC, useState, useEffect } from 'react';
import { useQuery } from 'lib/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { getListItem } from 'store/item';
import { ItemListWrapper } from 'components';

const ItemListContainer: FC = () => {
  const query = useQuery();
  const [pageId, setPageId] = useState(1);
  const dispatch = useDispatch();

  const { items, pageCount, loading } = useSelector(({ item, loading }: RootState) => ({
    items: item.list.items,
    pageCount: item.list.pageCount,
    loading: loading['item/getListItem'],
  }));

  useEffect(() => {
    const { categoryId, type, search } = query;
    dispatch({ type: getListItem.type, payload: { categoryId, pageId, type, search } });
  }, [query, pageId, dispatch]);

  return (
    <ItemListWrapper items={items} loading={loading} pageCount={pageCount} pageId={pageId} setPageId={setPageId} />
  );
};

export default ItemListContainer;
