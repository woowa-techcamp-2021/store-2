import React, { FC, ReactNode, useCallback } from 'react';
import styled from 'lib/woowahan-components';
import { useHistory, useQuery } from 'lib/router';

import { SORT } from 'constants/index';
import { ESortType } from 'types/item';

interface FilterProps {
  total: number;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 16px 30px 16px;

  @media all and (max-width: 730px) {
    flex-direction: column;
  }
`;

const Total = styled.div`
  color: ${props => props.theme?.colorSoftBlack};
  font-family: ${props => props.theme?.fontEuljiro};
  font-size: 18px;

  @media all and (max-width: 730px) {
    margin-bottom: 20px;
  }
`;

const Sort = styled.div`
  color: ${props => props.theme?.colorTextBeige};
  font-family: ${props => props.theme?.fontEuljiro};
  font-size: 18px;

  button {
    color: ${props => props.theme?.colorTextBeige};
    font-family: ${props => props.theme?.fontEuljiro};
    font-size: 18px;

    &.active {
      color: ${props => props.theme?.colorPrimary};
    }
  }

  @media all and (max-width: 730px) {
    text-align: center;
    width: 70%;
    font-size: 14px;

    button {
      font-size: 16px;
    }
  }
`;

const Filter: FC<FilterProps> = ({ total }) => {
  const history = useHistory();
  const query = useQuery();

  const handleClickSort = useCallback(
    sortType => {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set('type', sortType);
      searchParams.set('pageId', '1');
      history.push(`${history.currentPath}?${searchParams.toString()}`);
    },
    [history],
  );

  return (
    <Wrapper>
      <Total>총 {total} 개</Total>
      <Sort>
        {SORT.map<ReactNode>(sort => {
          return (
            <button
              key={sort.type}
              type="button"
              className={(query.type || ESortType.RECOMMEND) === sort.type ? 'active' : ''}
              onClick={() => handleClickSort(sort.type)}
            >
              {sort.value}
            </button>
          );
        }).reduce((acc, cur) => [acc, ' / ', cur])}
      </Sort>
    </Wrapper>
  );
};

export default Filter;
