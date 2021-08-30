import React, { FC, useState, useEffect, useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'lib/router';

import { RootState } from 'store';
import { getOrders } from 'store/order';

import { getLastMonth, getLastThreeMonth, getLastWeek, getNextDay, getToday } from 'utils/date';

import { Pagination, PeriodSelector } from 'components';
import MyNav from 'components/my/my-nav';
import MyOrderTable from 'components/my/my-order/my-order-table';

const MyOrderListContainer: FC = () => {
  const today = getToday();
  const [prevDate, setPrevDate] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [select, setSelect] = useState<undefined | number>(undefined);
  const history = useHistory();
  const dispatch = useDispatch();
  const [pageId, setPageId] = useState(1);

  const { loading, user, orders, pageCount, totalCount, userLoading } = useSelector(
    ({ auth, loading, order }: RootState) => ({
      loading: loading['order/getOrders'],
      user: auth.user.userId,
      orders: order.list.orders,
      pageCount: order.list.pageCount,
      totalCount: order.list.totalCount,
      userLoading: loading['auth/getUser'],
    }),
    shallowEqual,
  );

  useEffect(() => {
    if (prevDate && currentDate)
      dispatch({ type: getOrders.type, payload: { pageId, prevDate, currentDate: getNextDay(currentDate) } });
  }, [dispatch, pageId, prevDate, currentDate]);

  useEffect(() => {
    if (!userLoading && !user) history.push('/');
  }, [userLoading, user, history]);

  const onClickToday = useCallback(() => {
    setPrevDate(today);
    setCurrentDate(today);
    setSelect(0);
  }, [today]);
  const onClickThisWeek = useCallback(() => {
    setPrevDate(getLastWeek());
    setCurrentDate(today);
    setSelect(1);
  }, [today]);
  const onClickThisMonth = useCallback(() => {
    setPrevDate(getLastMonth());
    setCurrentDate(today);
    setSelect(2);
  }, [today]);
  const onClickThreeMonth = useCallback(() => {
    setPrevDate(getLastThreeMonth());
    setCurrentDate(today);
    setSelect(3);
  }, [today]);

  useEffect(() => {
    onClickToday();
  }, [onClickToday]);

  if (userLoading) return null;
  return (
    <>
      <MyNav />
      <PeriodSelector
        prevDate={prevDate}
        setPrevDate={setPrevDate}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        today={today}
        onClickToday={onClickToday}
        onClickThisWeek={onClickThisWeek}
        onClickThisMonth={onClickThisMonth}
        onClickThreeMonth={onClickThreeMonth}
        select={select}
      />
      <MyOrderTable loading={loading} orders={orders} totalCount={totalCount} />
      <Pagination pageCount={pageCount} />
    </>
  );
};

export default MyOrderListContainer;
