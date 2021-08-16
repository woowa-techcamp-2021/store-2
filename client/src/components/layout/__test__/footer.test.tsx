import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../footer';

describe('<Footer />', () => {
  it('matches snapshot', () => {
    const { container } = render(<Footer isMobile={false} />);
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot mobile', () => {
    const { container } = render(<Footer isMobile />);
    expect(container).toMatchSnapshot();
  });
});
