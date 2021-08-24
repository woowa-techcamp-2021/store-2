import Pagination from 'components/item/pagination';
import InquiryPeriod from 'components/my/inquiry-period';
import MyBar from 'components/my/my-bar';
import MyOrderList from 'components/my/my-order-list';
import MyStatusBar from 'components/my/my-status-bar';
import { useHistory } from 'lib/router';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { getOrders } from 'store/order';
import { getLastMonth, getLastThreeMonth, getLastWeek, getToday } from 'utils/date';

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
      loading: loading['order/getListOrder'],
      user: auth.user.userId,
      orders: order.list.orders,
      pageCount: order.list.pageCount,
      totalCount: order.list.totalCount,
      userLoading: loading['auth/getUser'],
    }),
  );

  useEffect(() => {
    if (prevDate && currentDate) dispatch({ type: getOrders.type, payload: { pageId, prevDate, currentDate } });
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
      <MyBar />
      <InquiryPeriod
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
      <MyStatusBar data={['주문일자', '상품명', '상품일금액/수량', '주문상태']} />
      <MyOrderList loading={loading} orders={orders} totalCount={totalCount} />
      <Pagination pageCount={pageCount} activePage={pageId} setActivePage={setPageId} />
    </>
  );
};

export default MyOrderListContainer;
