import React, { FC } from 'react';
import styled from 'lib/woowahan-components';

import xIcon from 'assets/icons/x.png';

interface RecentKeywordBoxProps {
  keywords: string[];
  isOpen: boolean;
  isRecent: boolean;
  setInput: (keyword: string) => void;
  removeRecentKeyword: (index: number) => void;
  moveToSearchPage: (keyword: string) => void;
}

const Container = styled.ul`
  position: absolute;
  padding: 4px;
  top: 30px;
  left: 0;
  border: 8px solid ${props => props.theme?.colorLineLight};
  border-top: none;
  width: 100%;
  display: ${props => (props.isopen ? 'flex' : 'none')};
  flex-direction: column;
  background-color: ${props => props.theme?.colorBg};
  z-index: 40;
`;

const KeywordList = styled.li`
  padding: 4px;
  font-family: ${props => props.theme?.fontHannaAir};
  display: flex;
  justify-content: space-between;

  div {
    line-height: 1;
  }

  .keyword {
    flex: 1;
    text-align: left;
  }

  button img {
    width: 10px;
    height: 10px;
  }
`;

const RecentKeywordBox: FC<RecentKeywordBoxProps> = ({
  keywords,
  isOpen,
  isRecent,
  setInput,
  removeRecentKeyword,
  moveToSearchPage,
}) => {
  const onKeywordListClick = (keyword: string) => () => {
    setInput(keyword);
    moveToSearchPage(keyword);
  };

  const handleKeywordRemove = (index: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    removeRecentKeyword(index);
  };

  return (
    <Container isopen={isOpen && keywords.length > 0}>
      {keywords.map((keyword, i) => {
        const key = keyword;
        return (
          <KeywordList key={key}>
            <button className="keyword" type="button" onClick={onKeywordListClick(keyword)}>
              {keyword}
            </button>
            {isRecent && (
              <button type="button" onClick={handleKeywordRemove(i)}>
                <img src={xIcon} alt="x" />
              </button>
            )}
          </KeywordList>
        );
      })}
    </Container>
  );
};

export default RecentKeywordBox;
