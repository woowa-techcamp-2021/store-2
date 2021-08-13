import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { decrement, increaseAsync } from '../store/counter';
import Counter from '../components/saga-example/counter';

const CounterContainer: FC = () => {
  const number = useSelector(({ counter }: RootState) => counter);
  const dispatch = useDispatch();

  const onIncrease = () => {
    dispatch(increaseAsync());
  };
  const onDecrease = () => {
    dispatch(decrement());
  };

  return (
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
};

export default CounterContainer;
