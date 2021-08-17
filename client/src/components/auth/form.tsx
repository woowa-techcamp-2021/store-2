import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import { useHistory } from 'lib/router';
import { Input, Button } from 'components';
import baedal from 'assets/icons/baedalee.png';
import github from 'assets/icons/github.png';

interface AuthFormProps {
  id: string;
  password: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  error: string | null;
  loading: boolean;
  isSignup?: boolean;
  check?: boolean;
  onCheckChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Div = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mobile} {
    > * {
      width: 100%;
      max-width: 380px;
    }
  }
  ${({ theme }) => theme.tablet} {
    margin: 15px;
    max-width: 380px;
  }
  ${({ theme }) => theme.laptop} {
    width: 480px;
  }
`;

const Form = styled.form`
  > * {
    width: 100%;
  }
`;

const Image = styled.img`
  ${({ theme }) => theme.mobile} {
    width: 40px;
  }
  ${({ theme }) => theme.tablet} {
    width: 44px;
  }
  ${({ theme }) => theme.laptop} {
    width: 48px;
  }
  margin-right: 10px;
`;

const Error = styled.div`
  color: ${props => props.theme.colorError};
  margin-top: 20px;
  margin-bottom: 10px;
  display: flex;
  text-indent: 5px;
`;

const CheckDiv = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  font-weight: 600;
  div {
    margin-left: 10px;
  }
`;

const AuthForm: FC<AuthFormProps> = ({
  id,
  password,
  onChange,
  onSubmit,
  error,
  loading,
  isSignup,
  check,
  onCheckChange,
}) => {
  const history = useHistory();
  const goSignup = useCallback(() => {
    history.push('/signup');
  }, [history]);
  const goLogin = useCallback(() => {
    history.push('/login');
  }, [history]);
  const goGithub = () => {
    window.location.href = `http://${window.location.hostname}:3000/api/auth/github`;
  };
  const TEXT = isSignup ? '회원가입' : '로그인';

  return (
    <Div>
      <Form onSubmit={onSubmit}>
        {loading && <div>로딩중~~</div>}
        <Input type="text" placeholder="아이디" value={id} name="id" onChange={onChange} maxLength={10} />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          name="password"
          onChange={onChange}
          maxLength={14}
        />
        {isSignup && (
          <CheckDiv>
            <input type="checkbox" checked={check} onChange={onCheckChange} />
            <div>배민문방구 전체 동의</div>
          </CheckDiv>
        )}

        <Error>{error}</Error>
        <Button type="submit" login>
          <Image src={baedal} alt="배달이" />
          {TEXT}
        </Button>
      </Form>

      {isSignup ? (
        <Button type="button" back onClick={goLogin}>
          <Image src={baedal} alt="배달이" />
          로그인 하러가기
        </Button>
      ) : (
        <>
          <Button type="button" github onClick={goGithub}>
            <Image src={github} alt="배달이" />
            깃-헙으로 로그인
          </Button>
          <Button type="button" signup onClick={goSignup}>
            <Image src={baedal} alt="배달이" />
            배민문구사로 회원가입
          </Button>
        </>
      )}
    </Div>
  );
};

export default AuthForm;
