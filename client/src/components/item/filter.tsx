import React, { FC, Dispatch, SetStateAction, ReactNode, useCallback } from 'react';
import styled from 'lib/woowahan-components';
import { ESortType } from 'types/item';
import { SORT } from 'constants/index';

interface FilterProps {
  total: number;
  sortType: ESortType;
  setSortType: Dispatch<SetStateAction<ESortType>>;
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

const Filter: FC<FilterProps> = ({ total, sortType, setSortType }) => {
  const handleClickSort = useCallback(
    sortType => {
      setSortType(sortType);
    },
    [setSortType],
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
              className={sortType === sort.type ? 'active' : ''}
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
