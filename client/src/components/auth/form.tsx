import React, { FC, useState } from 'react';
import styled from 'lib/woowahan-components';
import { Link } from 'lib/router';
import { Input, Button, Loader, CheckBox } from 'components';
import { SIGNIN_URL, SIGNUP_URL } from 'constants/urls';
import baedal from 'assets/icons/baedalee.png';
import github from 'assets/icons/github.png';
import { GITHUB_LOGIN_LINK } from 'constants/index';

interface AuthFormProps {
  id: string;
  password: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onGuestLogin?: () => void;
  error: string | null;
  loading: boolean;
  isSignup?: boolean;
  onCheckChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;

  ${({ theme }) => theme?.mobile} {
    > * {
      width: 100%;
      max-width: 380px;
    }
  }

  ${({ theme }) => theme?.tablet} {
    margin: 15px;
    max-width: 380px;
  }

  ${({ theme }) => theme?.laptop} {
    width: 400px;
  }
`;

const Form = styled.form`
  > * {
    width: 100%;
  }
`;

const Image = styled.img`
  margin-right: 10px;

  ${({ theme }) => theme?.mobile} {
    width: 26px;
  }
  ${({ theme }) => theme?.tablet} {
    width: 30px;
  }
  ${({ theme }) => theme?.laptop} {
    width: 34px;
  }
`;

const Error = styled.div`
  color: ${props => props.theme?.colorError};
  font-family: ${props => props.theme?.fontHannaAir};
  font-size: 14px;
  height: 30px;
  text-indent: 5px;
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-family: ${props => props.theme?.fontEuljiro};
  margin-top: 10px;

  a {
    font-size: 18px;
    color: ${props => props.theme?.colorTextBeige};

    &:hover {
      color: ${props => props.theme?.colorLine};
    }
  }
`;

const GuestButton = styled.button`
  padding: 5px;
  margin-bottom: 10px;

  span {
    color: ${props => props.theme?.colorGreyMid};
    font-family: ${props => props.theme?.fontHanna};
    font-size: 16px;
    padding: 0 5px;
  }

  &:hover span {
    color: ${props => props.theme?.colorPrimary};
    border-bottom: 1px solid ${props => props.theme?.colorPrimary};
  }
`;

const AuthForm: FC<AuthFormProps> = ({
  id,
  password,
  onChange,
  onSubmit,
  onGuestLogin,
  error,
  loading,
  isSignup,
  onCheckChange,
}) => {
  const [githubLoading, setGithubLoading] = useState(false);
  const goGithub = () => {
    setGithubLoading(true);
    window.location.href = GITHUB_LOGIN_LINK;
  };
  const FORM_TEXT = isSignup ? '회원가입' : '로그인';

  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        <Input type="text" placeholder="아이디" value={id} name="id" onChange={onChange} maxLength={30} />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          name="password"
          onChange={onChange}
          maxLength={20}
        />
        {isSignup && <CheckBox id="signup-agree" text="배민문방구 전체 동의" onChange={onCheckChange} />}

        <Error>{error}</Error>
        <GuestButton type="button" onClick={onGuestLogin}>
          <span>게스트 로그인</span>
        </GuestButton>

        <Button type="submit">
          {loading ? (
            <Loader size="25px" color="brown" />
          ) : (
            <>
              <Image src={baedal} alt="form-icon" />
              {FORM_TEXT}
            </>
          )}
        </Button>
      </Form>

      {isSignup ? (
        <LinkWrapper>
          <Link to={SIGNIN_URL}>계정이 있다면? 로그인하러 가기</Link>
        </LinkWrapper>
      ) : (
        <>
          <Button type="button" color="github" onClick={goGithub}>
            {githubLoading ? (
              <Loader size="25px" color="grey" />
            ) : (
              <>
                <Image src={github} alt="github-icon" />
                깃-헙으로 로그인
              </>
            )}
          </Button>
          <LinkWrapper>
            <Link to={SIGNUP_URL}>계정이 없다면? 회원가입하러 가기</Link>
          </LinkWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default AuthForm;
