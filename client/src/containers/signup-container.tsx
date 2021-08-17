import React, { FC, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'lib/router';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { getSignup, getSignupRest } from 'store/auth';
import useInputs from 'hooks/use-inputs';
import AuthForm from 'components/auth/form';
import AuthSuccessModal from 'components/auth/success-modal';
import authValidation from 'utils/validation/auth-validation';
import { IAuth } from 'types/auth';

const SignupContainer: FC = () => {
  const history = useHistory();
  const [{ id, password }, onChange] = useInputs({ id: '', password: '' });
  const [authError, setAuthError] = useState<null | string>(null);
  const [check, setCheck] = useState(false);
  const [modal, setModal] = useState(false);
  const { loading, error, userId, userLoading }: IAuth = useSelector(({ auth }: RootState) => ({
    loading: auth.signup.loading,
    error: auth.signup.error,
    userId: auth.user.userId,
    userLoading: auth.user.loading,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch({ type: getSignupRest });
    };
  }, [dispatch]);

  useEffect(() => {
    setAuthError(error);
  }, [error]);

  useEffect(() => {
    if (userLoading) history.push('/');
    if (userId) {
      setModal(true);
      setTimeout(() => {
        setModal(false);
        history.push('/');
      }, 1000);
    }
  }, [userId, history, userLoading]);

  const onCheckChange = useCallback(() => {
    setCheck(!check);
  }, [check]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation: string | boolean = authValidation({ id, password, check });
    if (validation !== true) setAuthError(validation as string);
    else dispatch({ type: getSignup.type, payload: { id, password } });
  };

  return (
    <>
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
      {modal && <AuthSuccessModal userId={userId} />}
    </>
  );
};

export default SignupContainer;
