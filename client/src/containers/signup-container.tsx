import React, { FC, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'lib/router';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { getSignup, getSignupReset } from 'store/auth';
import useInputs from 'hooks/use-inputs';
import AuthForm from 'components/auth/form';
import AuthSuccessModal from 'components/auth/success-modal';
import authValidation from 'utils/validation/auth-validation';
import { IAuth } from 'types/auth';
import { MAIN_URL } from 'constants/urls';

const SignupContainer: FC = () => {
  const history = useHistory();
  const [{ id, password }, onChange] = useInputs({ id: '', password: '' });
  const [authError, setAuthError] = useState<null | string>(null);
  const [check, setCheck] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { loading, error, userId, userLoading }: IAuth = useSelector(({ auth, loading }: RootState) => ({
    loading: loading['auth/getSignup'],
    error: auth.signup.error,
    userId: auth.user.userId,
    userLoading: loading['auth/getUser'],
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch({ type: getSignupReset.type });
    };
  }, [dispatch]);

  useEffect(() => {
    setAuthError(error);
  }, [error]);

  useEffect(() => {
    if (userLoading) history.push(MAIN_URL);
    if (userId) {
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        history.push(MAIN_URL);
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
        onCheckChange={onCheckChange}
      />
      <AuthSuccessModal userId={userId} visible={modalVisible} setVisible={setModalVisible} />
    </>
  );
};

export default SignupContainer;
