import React, { ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { decrement, increaseAsync } from '../store/counter';
import Counter from '../components/example/counter';

const CounterContainer = (): ReactElement => {
  const number = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();

  const onIncrease = () => {
    dispatch(increaseAsync());
  };
  const onDecrease = () => {
    dispatch(decrement());
  };

  return <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />;
};

export default CounterContainer;
