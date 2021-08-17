import React, { FC } from 'react';
import woowahan from 'lib/woowahan-components';
import { Link } from 'lib/router';
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

const Wrapper = woowahan.div`
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

const Form = woowahan.form`
  > * {
    width: 100%;
  }
`;

const Image = woowahan.img`
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

const CheckBoxLabel = woowahan.label`
  cursor: pointer;
  margin-bottom: 20px;
  display: flex;
  align-items: flex-end;
  font-family: ${props => props.theme?.fontHannaAir};
  color: ${props => props.theme?.colorSoftBlack};

  input[type='checkbox'] {
    margin-right: 10px;
  }
`;

const Error = woowahan.div`
  color: ${props => props.theme?.colorError};
  font-family: ${props => props.theme?.fontHannaAir};
  font-size: 14px;
  height: 30px;
  text-indent: 5px;
`;

const LinkWrapper = woowahan.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-family: ${props => props.theme?.fontEuljiro};
  margin-top: 10px;

  a {
    font-size: 18px;
    color: ${props => props.theme?.colorTextBeige};

    :hover {
      color: ${props => props.theme?.colorLine};
    }
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
  const goGithub = () => {
    window.location.href = `http://${window.location.hostname}:3000/api/auth/github`;
  };
  const FORM_TEXT = isSignup ? '회원가입' : '로그인';

  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        {loading && <div>로딩중~~</div>}
        <Input type="text" placeholder="아이디" value={id} name="id" onChange={onChange} />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          name="password"
          onChange={onChange}
          maxLength={14}
        />
        {isSignup && (
          <CheckBoxLabel htmlFor="signup-agree">
            <input type="checkbox" checked={check} onChange={onCheckChange} id="signup-agree" />
            배민문방구 전체 동의
          </CheckBoxLabel>
        )}

        <Error>{error}</Error>
        <Button type="submit">
          <Image src={baedal} alt="배달이" />
          {FORM_TEXT}
        </Button>
      </Form>

      {isSignup ? (
        <LinkWrapper>
          <Link to="/login">계정이 있다면? 로그인하러 가기</Link>
        </LinkWrapper>
      ) : (
        <>
          <Button type="button" color="github" onClick={goGithub}>
            <Image src={github} alt="배달이" />
            깃-헙으로 로그인
          </Button>
          <LinkWrapper>
            <Link to="/signup">계정이 없다면? 회원가입하러 가기</Link>
          </LinkWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default AuthForm;
