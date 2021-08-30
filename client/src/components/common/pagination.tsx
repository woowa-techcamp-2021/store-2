import React, { FC, useCallback, useState, useEffect } from 'react';
import styled from 'lib/woowahan-components';
import { useHistory, useQuery } from 'lib/router';

interface PaginationProps {
  className?: string;
  pageCount: number;
  showCnt?: number;
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

const Pagination: FC<PaginationProps> = ({ className = '', pageCount, showCnt = 5 }) => {
  const history = useHistory();
  const query = useQuery();
  const [startPage, setStartPage] = useState(1);

  const goPage = useCallback(
    (pageId: number) => {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set('pageId', pageId.toString());
      history.push(`${window.location.pathname}?${searchParams.toString()}`);
    },
    [history],
  );

  const goNextPage = useCallback(() => {
    setStartPage(startPage + showCnt);
    goPage(startPage + showCnt);
  }, [showCnt, startPage, goPage]);

  const goPrevPage = useCallback(() => {
    setStartPage(startPage - showCnt);
    goPage(startPage - showCnt);
  }, [showCnt, startPage, goPage]);

  const handleClickPage = useCallback(page => goPage(page), [goPage]);

  useEffect(() => {
    const { pageId = 1 } = query;
    const temp = Math.floor(Number(pageId) / showCnt);
    setStartPage((Number(pageId) % showCnt === 0 ? temp - 1 : temp) * showCnt + 1);
  }, [query, showCnt]);

  const renderPage = () => {
    const items = [];
    for (let page = startPage; page < startPage + showCnt && page <= pageCount; page += 1) {
      items.push(
        <Button
          type="button"
          key={page}
          className={(Number(query.pageId) || 1) === page && 'active'}
          onClick={() => handleClickPage(page)}
        >
          {page}
        </Button>,
      );
    }
    return items;
  };

  return (
    <Wrapper className={className}>
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
