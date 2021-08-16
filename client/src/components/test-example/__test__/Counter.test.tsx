import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Counter from '../Counter';

describe('<Counter />', () => {
  it('matches snapshot', () => {
    const { container } = render(<Counter />);
    expect(container).toMatchSnapshot();
  });
  it('has a number and two buttons', () => {
    render(<Counter />);
    screen.getByText('0');
    screen.getByText('+1');
    screen.getByText('-1');
  });
  it('increases', () => {
    render(<Counter />);
    const number = screen.getByText('0');
    const plusButton = screen.getByText('+1');
    fireEvent.click(plusButton);
    fireEvent.click(plusButton);
    expect(number).toHaveTextContent('2');
    expect(number.textContent).toBe('2');
  });
  it('decreases', () => {
    render(<Counter />);
    const number = screen.getByText('0');
    const plusButton = screen.getByText('-1');
    fireEvent.click(plusButton);
    fireEvent.click(plusButton);
    expect(number).toHaveTextContent('-2');
  });
});
