import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import AuthForm from 'components/auth/auth-form';
import useInputs from 'hooks/use-inputs';
import { getLogin } from 'store/auth';
import { useHistory } from 'lib/router';
import authValidation from 'utils/validation/auth-validation';

interface IRedux {
  loading: boolean;
  error: null | string;
  userId: string | null | undefined;
  userLoading: boolean;
}

const LoginContainer: FC = () => {
  const history = useHistory();
  const [{ id, password }, onChange] = useInputs({ id: '', password: '' });
  const [authError, setAuthError] = useState<null | string>(null);

  const { loading, error, userId, userLoading }: IRedux = useSelector(({ auth }: RootState) => ({
    loading: auth.login.loading,
    error: auth.login.error,
    userId: auth.user.userId,
    userLoading: auth.user.loading,
  }));
  const dispatch = useDispatch();

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
