import React, { FC, useState, useEffect } from 'react';
import { useQuery } from 'lib/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { getListItem } from 'store/item';
import { ItemListWrapper } from 'components';
import { ESortType } from 'types/item';

const ItemListContainer: FC = () => {
  const query = useQuery();
  const [pageId, setPageId] = useState(1);
  const [sortType, setSortType] = useState(ESortType.RECOMMEND);
  const dispatch = useDispatch();

  const { items, pageCount, loading } = useSelector(({ item, loading }: RootState) => ({
    items: item.list.items,
    pageCount: item.list.pageCount,
    loading: loading['item/getListItem'],
  }));

  useEffect(() => {
    setSortType(ESortType.RECOMMEND);
  }, [query]);

  useEffect(() => {
    setPageId(1);
  }, [query, sortType]);

  useEffect(() => {
    const { categoryId, search } = query;
    dispatch({ type: getListItem.type, payload: { categoryId, pageId, type: sortType, search } });
    window.scrollTo(0, 0);
  }, [query, pageId, sortType, dispatch]);

  return (
    <ItemListWrapper
      items={items}
      loading={loading}
      pageCount={pageCount}
      pageId={pageId}
      setPageId={setPageId}
      sortType={sortType}
      setSortType={setSortType}
    />
  );
};

export default ItemListContainer;
