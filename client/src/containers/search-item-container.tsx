import React, { FC, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'lib/router';

import { ESortType } from 'types/item';

import { RootState } from 'store';
import { getListItem } from 'store/item';

import SearchItemWrapper from 'components/item/search-item/search-item-wrapper';

const SearchItemContainer: FC = () => {
  const query = useQuery();
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
    const { categoryId, search, pageId = 1, type = ESortType.RECOMMEND } = query;
    if (categoryId || search) {
      dispatch({ type: getListItem.type, payload: { categoryId, pageId, type, search } });
      window.scrollTo(0, 0);
    }
  }, [query, dispatch]);

  return <SearchItemWrapper items={items} loading={loading} pageCount={pageCount} totalCount={totalCount} />;
};

export default SearchItemContainer;
