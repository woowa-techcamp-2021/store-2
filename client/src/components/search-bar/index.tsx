import React, { FC, useState, Dispatch, SetStateAction, ChangeEvent, FormEvent, useRef } from 'react';
import styled from 'lib/woowahan-components';

import useOutSideClick from 'hooks/use-out-side-click';

import searchIcon from 'assets/icons/search.svg';

import RecentKeywordBox from './recent-keyword-box';

interface SearchBarProps {
  search: string;
  keywords: string[];
  isRecent: boolean;
  setSearch: Dispatch<SetStateAction<string>>;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  removeRecentKeyword: (index: number) => void;
  moveToSearchPage: (keyword: string) => void;
}

const SearchBarContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  height: fit-content;
  margin: 48px 0;

  form {
    display: flex;
    align-items: center;
  }

  img {
    height: 30px;
  }
`;

const SearchBox = styled.div`
  width: 430px;
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;

  ${({ theme }) => theme?.mobile} {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  height: 30px;
  border-bottom: 2px solid ${props => props.theme?.colorSoftBlack};
  font-size: 18px;
  font-family: ${props => props.theme?.fontHannaAir};

  &:focus {
    border-bottom-color: ${props => props.theme?.colorLineLight};
  }
`;

const SearchBar: FC<SearchBarProps> = ({
  search,
  keywords,
  isRecent,
  setSearch,
  onSubmit,
  onChange,
  removeRecentKeyword,
  moveToSearchPage,
}) => {
  const [isBoxOpened, setIsBoxOpened] = useState<boolean>(false);

  const onFocus = () => {
    setIsBoxOpened(true);
  };

  const onClickOutSide = () => {
    setIsBoxOpened(false);
  };

  const searchBoxRef = useRef(null);
  useOutSideClick(searchBoxRef, onClickOutSide);

  return (
    <SearchBarContainer>
      <form onSubmit={onSubmit} ref={searchBoxRef}>
        <SearchBox>
          <SearchInput placeholder="무엇을 사러 오셨나요?" onChange={onChange} onFocus={onFocus} value={search} />
          <RecentKeywordBox
            keywords={keywords}
            isOpen={isBoxOpened}
            setInput={setSearch}
            isRecent={isRecent}
            removeRecentKeyword={removeRecentKeyword}
            moveToSearchPage={moveToSearchPage}
          />
        </SearchBox>
        <button type="submit">
          <img src={searchIcon} alt="search" />
        </button>
      </form>
    </SearchBarContainer>
  );
};

export default SearchBar;
