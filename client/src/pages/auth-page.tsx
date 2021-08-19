import { useHistory } from 'lib/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { getGithubLogin } from 'store/auth';
import { IUser } from 'types/auth';
import { MAIN_URL } from 'constants/urls';

const AuthPage = (): null => {
  const { userId }: IUser = useSelector(({ auth }: RootState) => ({
    userId: auth.user.userId,
  }));
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch({ type: getGithubLogin.type, payload: { code: window.location.search.slice(22) } });
  }, [dispatch]);
  useEffect(() => {
    if (userId) history.push(MAIN_URL);
  }, [userId, history]);
  return null;
};

export default AuthPage;
