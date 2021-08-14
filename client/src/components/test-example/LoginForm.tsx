import React, { useState, FC } from 'react';

interface ILoginForm {
  onSubmit: () => null;
}

const LoginForm: FC<ILoginForm> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={onSubmit} data-testid="form">
        <label htmlFor="id1">
          이메일
          <input
            type="email"
            placeholder="user@test.com"
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
            id="id1"
          />
        </label>
        <label htmlFor="id2">
          비밀번호
          <input type="password" value={password} onChange={({ target: { value } }) => setPassword(value)} id="id2" />
        </label>
        <button type="submit" disabled={!email || !password}>
          로그인
        </button>
      </form>
    </>
  );
};

export default LoginForm;
