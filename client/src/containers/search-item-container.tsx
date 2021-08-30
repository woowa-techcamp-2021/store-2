import React, { FC, useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'lib/router';

import { ESortType } from 'types/item';

import SearchItemWrapper from 'components/item/search-item/search-item-wrapper';

import { RootState } from 'store';
import { getListItem } from 'store/item';

const SearchItemContainer: FC = () => {
  const query = useQuery();
  const [pageId, setPageId] = useState(1);
  const [sortType, setSortType] = useState(ESortType.RECOMMEND);
  const dispatch = useDispatch();

  const { items, totalCount, pageCount, loading } = useSelector(
    ({ item, loading }: RootState) => ({
      items: item.list.items,
      totalCount: item.list.totalCount,
      pageCount: item.list.pageCount,
      loading: loading['item/getListItem'],
    }),
    shallowEqual,
  );

  useEffect(() => {
    setSortType(ESortType.RECOMMEND);
  }, [query]);

  useEffect(() => {
    setPageId(1);
  }, [query, sortType]);

  useEffect(() => {
    const { categoryId, search } = query;
    if ((categoryId || search) && pageId) {
      dispatch({ type: getListItem.type, payload: { categoryId, pageId, type: sortType, search } });
      window.scrollTo(0, 0);
    }
  }, [query, pageId, sortType, dispatch]);

  return (
    <SearchItemWrapper
      items={items}
      loading={loading}
      pageCount={pageCount}
      pageId={pageId}
      setPageId={setPageId}
      totalCount={totalCount}
      sortType={sortType}
      setSortType={setSortType}
    />
  );
};

export default SearchItemContainer;
