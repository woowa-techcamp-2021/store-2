import React, { FC, useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import AuthForm from 'components/auth/auth-form';
import useInputs from 'hooks/use-inputs';
import { getLogin } from 'store/auth';
import { useHistory } from 'lib/router';

interface IRedux {
  loading: boolean;
  error: null | string;
  userId: string | null | undefined;
}

const ID_ERROR = '아이디를 입력하세요';
const PWD_ERROR = '비밀번호를 입력하세요';
const CHECK_ERROR = '약관을 동의해주세요';

const SignupContainer: FC = () => {
  const history = useHistory();
  const [{ id, password }, onChange] = useInputs({ id: '', password: '' });
  const [authError, setAuthError] = useState<null | string>(null);
  const [check, setCheck] = useState(false);
  // const { loading, error, userId }: IRedux = useSelector(({ auth }: RootState) => ({
  //   loading: auth.login.loading,
  //   error: auth.login.error,
  //   userId: auth.user.userId,
  // }));
  const dispatch = useDispatch();

  // useEffect(() => {
  //   setAuthError(error);
  // }, [error]);

  // useEffect(() => {
  //   if (userId) {
  //     history.push('/');
  //   }
  // }, [userId, history]);

  const onCheckChange = useCallback(() => {
    setCheck(!check);
  }, [check]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) setAuthError(ID_ERROR);
    else if (!password) setAuthError(PWD_ERROR);
    else if (!check) setAuthError(CHECK_ERROR);
    else {
      // dispatch({ type: getLogin.type, payload: { id, password } });
    }
  };

  // temp
  const loading = false;
  return (
    <AuthForm
      id={id}
      password={password}
      onChange={onChange}
      onSubmit={onSubmit}
      error={authError}
      loading={loading}
      isSignup
      check={check}
      onCheckChange={onCheckChange}
    />
  );
};

export default SignupContainer;
