import React from 'react';
import { render } from '@testing-library/react';
import Layout from '../layout';

describe('<Layout />', () => {
  it('matches snapshot', () => {
    const { container } = render(<Layout>test layout</Layout>);
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot main', () => {
    const { container } = render(<Layout>test layout main</Layout>);
    expect(container).toMatchSnapshot();
  });
});
