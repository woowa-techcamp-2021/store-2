import React, { FC, useCallback, useState } from 'react';
import styled from 'lib/woowahan-components';

interface PaginationProps {
  totalCnt: number;
  showCnt?: number;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0;
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

const Pagination: FC<PaginationProps> = ({ totalCnt, showCnt = 10 }) => {
  const [startPage, setStartPage] = useState(1);
  const [activePage, setActivePage] = useState(1);

  const goNextPage = useCallback(() => {
    setStartPage(startPage + showCnt);
    setActivePage(startPage + showCnt);
  }, [showCnt, startPage]);

  const goPrevPage = useCallback(() => {
    setStartPage(startPage - showCnt);
    setActivePage(startPage - showCnt);
  }, [showCnt, startPage]);

  const handleClickPage = useCallback(page => {
    setActivePage(page);
  }, []);

  const renderPage = () => {
    const items = [];
    for (let page = startPage; page < startPage + showCnt && page <= totalCnt; page += 1) {
      items.push(
        <Button type="button" className={activePage === page && 'active'} onClick={() => handleClickPage(page)}>
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
      {startPage + showCnt <= totalCnt && (
        <Button type="button" onClick={goNextPage}>
          다음
        </Button>
      )}
    </Wrapper>
  );
};

export default Pagination;
