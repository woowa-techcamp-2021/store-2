import React from 'react';
import { render, screen } from '@testing-library/react';
import Profile from '../Profile';

describe('<Profile />', () => {
  it('matches snapshot', () => {
    const utils = render(<Profile username="velopert" name="김민준" />);
    expect(utils.container).toMatchSnapshot();
  });
  it('shows the props correctly', () => {
    render(<Profile username="velopert" name="김민준" />);
    screen.getByText('velopert');
    screen.getByText('(김민준)');
    screen.getByText(/김/);
  });
});
