import React from 'react';
import { render } from '@testing-library/react';
import Header from '../header';

describe('<Header />', () => {
  it('matches snapshot pc main', () => {
    const { container } = render(<Header displayMain isMobile={false} />);
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot pc', () => {
    const { container } = render(<Header displayMain={false} isMobile={false} />);
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot mobile main', () => {
    const { container } = render(<Header displayMain isMobile />);
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot mobile', () => {
    const { container } = render(<Header displayMain={false} isMobile />);
    expect(container).toMatchSnapshot();
  });
});
