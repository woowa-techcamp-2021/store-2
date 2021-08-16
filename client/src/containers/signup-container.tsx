import React, { FC, useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import AuthForm from 'components/auth/auth-form';
import useInputs from 'hooks/use-inputs';
import { getSignup } from 'store/auth';
import { useHistory } from 'lib/router';
import AuthSuccessModal from 'components/auth/auth-success-modal';
import authValidation from 'utils/validation/auth-validation';

interface IRedux {
  loading: boolean;
  error: null | string;
  userId: string | null | undefined;
}

const SignupContainer: FC = () => {
  const history = useHistory();
  const [{ id, password }, onChange] = useInputs({ id: '', password: '' });
  const [authError, setAuthError] = useState<null | string>(null);
  const [check, setCheck] = useState(false);
  const [modal, setModal] = useState(false);
  const { loading, error, userId }: IRedux = useSelector(({ auth }: RootState) => ({
    loading: auth.signup.loading,
    error: auth.signup.error,
    userId: auth.user.userId,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    setAuthError(error);
  }, [error]);

  useEffect(() => {
    if (userId) {
      console.log('회원가입 성공하고 모달 띄우기');
      setModal(true);

      // setTimeout(() => {
      //   history.push('/');
      // }, 1000);
    }
  }, [userId, history]);

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
      {modal && <AuthSuccessModal />}
    </>
  );
};

export default SignupContainer;
