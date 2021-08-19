import React from 'react';
import { render } from '@testing-library/react';
import Navbar from '../navbar';

describe('<Navbar />', () => {
  it('matches snapshot', () => {
    const { container } = render(<Navbar displayMain={false} isMobile={false} userId="test" onLogout={() => null} />);
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot mobile', () => {
    const { container } = render(<Navbar displayMain={false} isMobile userId="test" onLogout={() => null} />);
    expect(container).toMatchSnapshot();
  });
});
