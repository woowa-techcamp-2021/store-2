import React, { FC, useCallback, useState, Dispatch, SetStateAction } from 'react';
import styled from 'lib/woowahan-components';

interface PaginationProps {
  pageCount: number;
  showCnt?: number;
  activePage: number;
  setActivePage: Dispatch<SetStateAction<number>>;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 60px;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: 0 10px;
  color: ${props => props.theme?.colorGreyDark};
  font-family: ${props => props.theme?.fontHannaAir};
  font-size: 16px;

  &:hover {
    color: ${props => props.theme?.colorSoftBlack};
  }

  &.active {
    font-family: ${props => props.theme?.fontHanna};
    color: ${props => props.theme?.colorSoftBlack};
  }
`;

const Pagination: FC<PaginationProps> = ({ pageCount, showCnt = 10, activePage, setActivePage }) => {
  const [startPage, setStartPage] = useState(1);

  const goNextPage = useCallback(() => {
    setStartPage(startPage + showCnt);
    setActivePage(startPage + showCnt);
  }, [showCnt, startPage, setActivePage]);

  const goPrevPage = useCallback(() => {
    setStartPage(startPage - showCnt);
    setActivePage(startPage - showCnt);
  }, [showCnt, startPage, setActivePage]);

  const handleClickPage = useCallback(
    page => {
      setActivePage(page);
    },
    [setActivePage],
  );

  const renderPage = () => {
    const items = [];
    for (let page = startPage; page < startPage + showCnt && page <= pageCount; page += 1) {
      items.push(
        <Button
          type="button"
          key={page}
          className={activePage === page && 'active'}
          onClick={() => handleClickPage(page)}
        >
          {page}
        </Button>,
      );
    }
    return items;
  };

  return (
    <Wrapper>
      {startPage > 1 && (
        <Button type="button" onClick={goPrevPage}>
          이전
        </Button>
      )}
      {renderPage()}
      {startPage + showCnt <= pageCount && (
        <Button type="button" onClick={goNextPage}>
          다음
        </Button>
      )}
    </Wrapper>
  );
};

export default Pagination;
