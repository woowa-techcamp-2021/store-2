import React from 'react';
import { render } from '@testing-library/react';
import Navbar from '../navbar';

describe('<Navbar />', () => {
  it('matches snapshot', () => {
    const { container } = render(<Navbar white />);
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot mobile', () => {
    const { container } = render(<Navbar mobile />);
    expect(container).toMatchSnapshot();
  });
});
