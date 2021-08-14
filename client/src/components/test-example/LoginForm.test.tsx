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
    render(<LoginForm onSubmit={() => null} />);
    const password = screen.getByLabelText('비밀번호');
    expect(password).toHaveValue('');
    // render(<LoginForm onSubmit={() => null} />);
    // const password = screen.getByLabelText('비밀번호');
    // expect(password).toHaveValue('');
  });

  it('enables button when both email and password are entered', () => {
    render(<LoginForm onSubmit={() => null} />);

    const button = screen.getByText('로그인');
    const email = screen.getByLabelText('이메일');
    const password = screen.getByLabelText('비밀번호');

    expect(button).toBeDisabled();

    fireEvent.change(email, { target: { value: 'user@test.com' } });
    fireEvent.change(password, { target: { value: 'Test1234' } });

    expect(button).toBeEnabled();
  });

  it('submits form when buttion is clicked', () => {
    const handleSubmit = jest.fn().mockImplementation((e: Event) => {
      e.preventDefault();
    });
    render(<LoginForm onSubmit={handleSubmit} />);

    const button = screen.getByText('로그인');

    const email = screen.getByLabelText('이메일');
    const password = screen.getByLabelText('비밀번호');

    fireEvent.change(email, { target: { value: 'user@test.com' } });
    fireEvent.change(password, { target: { value: 'Test1234' } });

    fireEvent.click(button);
    fireEvent.submit(screen.getByTestId('form'));
    expect(handleSubmit).toHaveBeenCalledTimes(2);
  });
});
