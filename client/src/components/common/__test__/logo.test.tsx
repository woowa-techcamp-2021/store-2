import React from 'react';
import { render } from '@testing-library/react';
import Logo from '../logo';

describe('<Logo />', () => {
  it('matches snapshot', () => {
    const { container } = render(<Logo full />);
    expect(container).toMatchSnapshot();
  });
});
