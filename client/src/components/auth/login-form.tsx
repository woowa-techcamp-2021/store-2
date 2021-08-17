import React, { FC, useCallback } from 'react';
import woowahan from 'lib/woowahan-components';
import baedal from 'assets/icons/baedalee.png';
import github from 'assets/icons/github.png';
import { useHistory } from 'lib/router';
import LoginButton from './login-button';
import LoginInput from './login-input';

const Div = woowahan.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme?.mobile} {
    width: 100%;
    box-sizing: border-box;
  }
  ${({ theme }) => theme?.tablet} {
    margin: 15px;
    max-width: 380px;
  }
  ${({ theme }) => theme?.laptop} {
    width: 380px;
  }
`;

const Form = woowahan.form`
  display: flex;
  flex-direction: column;
`;

const Image = woowahan.img`
  ${({ theme }) => theme?.mobile} {
    width: 40px;
  }
  ${({ theme }) => theme?.tablet} {
    width: 44px;
  }
  ${({ theme }) => theme?.laptop} {
    width: 48px;
  }
  margin-right: 10px;
`;

const Error = woowahan.div`
  color: ${props => props.theme?.colorError};
  margin-top: 20px;
  display: flex;
  text-indent: 5px;
`;

interface LoginProps {
  id: string;
  password: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  error: string | null;
  loading: boolean;
}

const LoginForm: FC<LoginProps> = ({ id, password, onChange, onSubmit, error, loading }) => {
  const history = useHistory();
  const onClick = useCallback(() => {
    history.push('/signup');
  }, [history]);

  return (
    <Div>
      <Form onSubmit={onSubmit}>
        {loading && <div>로딩중~~</div>}
        <LoginInput type="text" placeholder="아이디" value={id} name="id" onChange={onChange} maxLength={10} />
        <LoginInput
          type="password"
          placeholder="비밀번호"
          value={password}
          name="password"
          onChange={onChange}
          maxLength={14}
        />
        <Error>{error}</Error>
        <LoginButton type="submit" login>
          <Image src={baedal} alt="배달이" />
          로그인
        </LoginButton>
      </Form>
      <LoginButton type="button" github>
        <Image src={github} alt="배달이" />
        깃-헙으로 로그인
      </LoginButton>
      <LoginButton type="button" signup onClick={onClick}>
        <Image src={baedal} alt="배달이" />
        배민문구사로 회원가입
      </LoginButton>
    </Div>
  );
};

export default LoginForm;
