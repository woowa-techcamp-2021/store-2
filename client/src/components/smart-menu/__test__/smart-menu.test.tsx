import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SmartMenuContainer from '../../../containers/smart-menu-container';

describe('<SmartMenu />', () => {
  it('render menu', () => {
    render(<SmartMenuContainer currentCode="000000" />);
    const menu = screen.getByText('캇테고리');
    expect(menu).toBeInTheDocument();
  });

  it('open/close menu', () => {
    render(<SmartMenuContainer currentCode="000000" />);
    const menu = screen.getByText('캇테고리');

    fireEvent.click(menu);
    const largeMenu = screen.getByText('문구');
    expect(largeMenu).toBeInTheDocument();

    fireEvent.click(largeMenu);
    const mediumMenu = screen.getByText('노트/메모지');
    expect(mediumMenu).toBeInTheDocument();

    fireEvent.mouseEnter(mediumMenu);
    const smallMenu = screen.getByText('베이직 노트');
    expect(smallMenu).toBeInTheDocument();

    fireEvent.mouseLeave(mediumMenu);
    expect(smallMenu).not.toBeInTheDocument();

    fireEvent.mouseLeave(largeMenu);
    expect(mediumMenu).not.toBeInTheDocument();

    fireEvent.mouseLeave(menu);
    expect(largeMenu).not.toBeInTheDocument();
  });
});
