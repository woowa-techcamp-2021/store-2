import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import Axios from 'components/saga-example/axios';
import { getUser, StateProps } from 'store/axios';

const AxiosContainer: FC = () => {
  const { user, category, loading }: StateProps = useSelector(({ axios }: RootState) => ({
    user: axios.user,
    category: axios.category,
    loading: axios.loading,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: getUser.type });
  }, [dispatch]);

  return <Axios user={user} category={category} loading={loading} />;
};

export default AxiosContainer;
