import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';

describe('<NotFound />', () => {
  it('renders header', () => {
    render(<NotFound path="/abc" />);
    const header = screen.getByText('Page Not Found');
    expect(header).toBeInTheDocument();
  });
});
