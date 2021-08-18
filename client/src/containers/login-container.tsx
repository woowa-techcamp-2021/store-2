import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'lib/router';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { getLogin, getLoginReset } from 'store/auth';
import useInputs from 'hooks/use-inputs';
import AuthForm from 'components/auth/form';
import authValidation from 'utils/validation/auth-validation';
import { IAuth } from 'types/auth';

const LoginContainer: FC = () => {
  const history = useHistory();
  const [{ id, password }, onChange] = useInputs({ id: '', password: '' });
  const [authError, setAuthError] = useState<null | string>(null);

  const { loading, error, userId, userLoading }: IAuth = useSelector(({ auth, loading }: RootState) => ({
    loading: loading['auth/getLogin'],
    error: auth.login.error,
    userId: auth.user.userId,
    userLoading: loading['auth/getUser'],
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch({ type: getLoginReset });
    };
  }, [dispatch]);

  useEffect(() => {
    setAuthError(error);
  }, [error]);

  useEffect(() => {
    if (userId || userLoading) {
      history.push('/');
    }
  }, [userId, history, userLoading]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation: string | boolean = authValidation({ id, password });
    if (validation !== true) setAuthError(validation as string);
    else dispatch({ type: getLogin.type, payload: { id, password } });
  };

  return (
    <AuthForm id={id} password={password} onChange={onChange} onSubmit={onSubmit} error={authError} loading={loading} />
  );
};

export default LoginContainer;
