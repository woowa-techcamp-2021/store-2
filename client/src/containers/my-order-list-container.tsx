import Pagination from 'components/item/pagination';
import InquiryPeriod from 'components/my/inquiry-period';
import MyBar from 'components/my/my-bar';
import MyOrderList from 'components/my/my-order-list';
import MyStatusBar from 'components/my/my-status-bar';
import { useHistory } from 'lib/router';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { getOrders } from 'store/order';
import { getLastMonth, getLastThreeMonth, getLastWeek, getToday } from 'utils/date';

const MyOrderListContainer: FC = () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, pageId]);

  useEffect(() => {
    if (!userLoading && !user) history.push('/');
  }, [userLoading, user, history]);

  const today = getToday();
  const onClickToday = () => {
    setPrevDate(today);
    setCurrentDate(today);
    setSelect(0);
  };
  const onClickThisWeek = () => {
    setPrevDate(getLastWeek());
    setCurrentDate(today);
    setSelect(1);
  };
  const onClickThisMonth = () => {
    setPrevDate(getLastMonth());
    setCurrentDate(today);
    setSelect(2);
  };
  const onClickThreeMonth = () => {
    setPrevDate(getLastThreeMonth());
    setCurrentDate(today);
    setSelect(3);
  };
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: getOrders.type, payload: { pageId: 1, prevDate, currentDate } });
  };
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
        onSubmit={onSubmit}
      />
      <MyStatusBar data={['주문일자', '상품명', '상품일금액/수량', '주문상태']} />
      <MyOrderList loading={loading} orders={orders} totalCount={totalCount} />
      <Pagination pageCount={pageCount} activePage={pageId} setActivePage={setPageId} />
    </>
  );
};

export default MyOrderListContainer;
