import React, { FC, useState } from 'react';

import { getLastMonth, getLastThreeMonth, getLastWeek, getToday } from 'utils/date';

import { PeriodSelector } from 'components';
import MyBar from 'components/my/my-nav';
import MyOrderList from 'components/my/table/my-order-list';
import MyStatusBar from 'components/my/table/my-status-bar';

const MyOrderListContainer: FC = () => {
  const [prevDate, setPrevDate] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [select, setSelect] = useState<undefined | number>(undefined);
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
    // TODO: dispatch prevDate, currentDate
  };
  return (
    <>
      <MyBar />
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
        onSubmit={onSubmit}
      />
      <MyStatusBar data={['주문일자', '상품명', '상품일금액/수량', '주문상태']} />
      <MyOrderList />
    </>
  );
};

export default MyOrderListContainer;
