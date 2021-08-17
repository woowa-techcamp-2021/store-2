import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFoundPage from '../not-found-page';

describe('<NotFoundPage />', () => {
  it('matches snapshot', () => {
    const { container } = render(<NotFoundPage />);
    expect(container).toMatchSnapshot();
  });

  it('renders text', () => {
    render(<NotFoundPage />);
    const span1 = screen.getByText('404');
    const span2 = screen.getByText('낫 파운드');
    expect(span1).toBeInTheDocument();
    expect(span2).toBeInTheDocument();
  });
});
