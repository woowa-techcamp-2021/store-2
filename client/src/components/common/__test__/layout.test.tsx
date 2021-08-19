import React from 'react';
import { render } from '@testing-library/react';
import Layout from '../layout';

describe('<Layout />', () => {
  it('matches snapshot pc main', () => {
    const { container } = render(
      <Layout displayMain isMobile={false}>
        test layout main
      </Layout>,
    );
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot pc', () => {
    const { container } = render(<Layout isMobile={false}>test layout</Layout>);
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot mobile main', () => {
    const { container } = render(
      <Layout displayMain isMobile>
        test layout mobile
      </Layout>,
    );
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot mobile', () => {
    const { container } = render(<Layout isMobile>test layout mobile</Layout>);
    expect(container).toMatchSnapshot();
  });
});
