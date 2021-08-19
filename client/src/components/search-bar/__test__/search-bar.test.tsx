import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import SearchBar from 'components/search-bar';

describe('<SearchBar /> test', () => {
  it('should render recent search keywords when focused', () => {
    render(
      <SearchBar
        search=""
        keywords={['테스트']}
        isRecent
        setSearch={() => {}}
        onSubmit={() => {}}
        onChange={() => {}}
        removeRecentKeyword={() => {}}
        moveToSearchPage={() => {}}
      />,
    );

    const input = screen.getByPlaceholderText('무엇을 사러 오셨나요?');
    fireEvent.focus(input);

    const recentSearchBox = screen.getByText('테스트');
    expect(recentSearchBox).toBeInTheDocument();
  });

  it('should not render recent search keywords when no focused', () => {
    render(
      <SearchBar
        search=""
        keywords={['테스트']}
        isRecent
        setSearch={() => {}}
        onSubmit={() => {}}
        onChange={() => {}}
        removeRecentKeyword={() => {}}
        moveToSearchPage={() => {}}
      />,
    );

    const recentSearchBox = screen.getByText('테스트');
    expect(recentSearchBox).not.toBeInTheDocument();
  });
});
