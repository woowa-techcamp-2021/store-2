import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import LoginForm from 'components/auth/login-form';
import useInputs from 'hooks/use-inputs';
import { getLogin, StateProps } from 'store/auth';

const LoginContainer: FC = () => {
  const [{ id, password }, onChange] = useInputs({ id: '', password: '' });
  const [authError, setAuthError] = useState<null | string>(null);

  const { login }: StateProps = useSelector(({ auth }: RootState) => ({
    login: auth.login,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    setAuthError(login.error);
  }, [login.error]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) setAuthError('아이디를 입력하세요');
    else if (!password) setAuthError('비밀번호를 입력하세요');
    else {
      dispatch({ type: getLogin.type, payload: { id, password } });
    }
  };

  return (
    <LoginForm
      id={id}
      password={password}
      onChange={onChange}
      onSubmit={onSubmit}
      error={authError}
      loading={login.loading}
    />
  );
};

export default LoginContainer;
