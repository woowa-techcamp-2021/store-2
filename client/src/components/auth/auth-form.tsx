import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import baedal from 'assets/icons/baedalee.png';
import github from 'assets/icons/github.png';
import { useHistory } from 'lib/router';
import AuthButton from './auth-button';
import AuthInput from './auth-input';

const Div = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mobile} {
    width: 100%;
    box-sizing: border-box;
  }
  ${({ theme }) => theme.tablet} {
    margin: 15px;
    max-width: 380px;
  }
  ${({ theme }) => theme.laptop} {
    width: 380px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
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

interface AuthProps {
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

const AuthForm: FC<AuthProps> = ({
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
  const onClick = useCallback(() => {
    history.push('/signup');
  }, [history]);
  const TEXT = isSignup ? '회원가입' : '로그인';

  return (
    <Div>
      <Form onSubmit={onSubmit}>
        {loading && <div>로딩중~~</div>}
        <AuthInput type="text" placeholder="아이디" value={id} name="id" onChange={onChange} maxLength={10} />
        <AuthInput
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
        <AuthButton type="submit" login>
          <Image src={baedal} alt="배달이" />
          {TEXT}
        </AuthButton>
      </Form>

      {isSignup ? (
        <AuthButton type="button" back>
          <Image src={baedal} alt="배달이" />
          로그인 하러가기
        </AuthButton>
      ) : (
        <>
          <AuthButton type="button" github>
            <Image src={github} alt="배달이" />
            깃-헙으로 로그인
          </AuthButton>
          <AuthButton type="button" signup onClick={onClick}>
            <Image src={baedal} alt="배달이" />
            배민문구사로 회원가입
          </AuthButton>
        </>
      )}
    </Div>
  );
};

export default AuthForm;
