import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import LoginForm from './LoginForm';

describe('<LoginForm />', () => {
  it('renders email input', () => {
    render(<LoginForm onSubmit={() => null} />);
    const email = screen.getByPlaceholderText(/@test.com$/);
    expect(email).toBeInTheDocument();
  });

  it('password input has not value', () => {
    const { getByLabelText } = render(<LoginForm onSubmit={() => null} />);
    // eslint-disable-next-line
    const password = getByLabelText('비밀번호');
    expect(password).toHaveValue('');
    // render(<LoginForm onSubmit={() => null} />);
    // const password = screen.getByLabelText('비밀번호');
    // expect(password).toHaveValue('');
  });

  it('enables button when both email and password are entered', () => {
    const { getByLabelText } = render(<LoginForm onSubmit={() => null} />);

    const button = screen.getByText('로그인');
    // eslint-disable-next-line
    const email = getByLabelText('이메일');
    // eslint-disable-next-line
    const password = getByLabelText('비밀번호');

    expect(button).toBeDisabled();

    fireEvent.change(email, { target: { value: 'user@test.com' } });
    fireEvent.change(password, { target: { value: 'Test1234' } });

    expect(button).toBeEnabled();
  });

  it('submits form when buttion is clicked', () => {
    const handleSubmit = jest.fn().mockImplementation(e => {
      // eslint-disable-next-line
      e.preventDefault();
    });
    const { getByLabelText } = render(<LoginForm onSubmit={handleSubmit} />);

    const button = screen.getByText('로그인');
    // eslint-disable-next-line
    const email = getByLabelText('이메일');
    // eslint-disable-next-line
    const password = getByLabelText('비밀번호');

    fireEvent.change(email, { target: { value: 'user@test.com' } });
    fireEvent.change(password, { target: { value: 'Test1234' } });

    fireEvent.click(button);
    fireEvent.submit(screen.getByTestId('form'));
    expect(handleSubmit).toHaveBeenCalledTimes(2);
  });
});
