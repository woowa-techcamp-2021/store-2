import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import SearchBar from 'containers/search-container';

describe('<SearchBar /> test', () => {
  it('should render recent search keywords when focused', () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText('무엇을 사러 오셨나요?');
    fireEvent.focus(input);

    const recentSearchBox = screen.getByText('최근 검색어');
    expect(recentSearchBox).toBeInTheDocument();
  });

  it('should not render recent search keywords when no focused', () => {
    render(<SearchBar />);

    const recentSearchBox = screen.getByText('최근 검색어');
    expect(recentSearchBox).not.toBeInTheDocument();
  });

  it('should remove recent search keywords when focus out', () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText('무엇을 사러 오셨나요?');
    fireEvent.focus(input);
    fireEvent.focusOut(input);

    const recentSearchBox = screen.getByText('최근 검색어');
    expect(recentSearchBox).not.toBeInTheDocument();
  });
});
