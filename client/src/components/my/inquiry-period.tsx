import styled from 'lib/woowahan-components';
import React, { FC } from 'react';
import { getToday } from 'utils';

interface InquiryPeroidProps {
  prevDate: string;
  setPrevDate: React.Dispatch<React.SetStateAction<string>>;
  currentDate: string;
  setCurrentDate: React.Dispatch<React.SetStateAction<string>>;
}

const Wrapper = styled.div`
  ${props => props.theme?.mobile} {
    h3 {
      margin: 0 -12px;
      padding: 16px;
      font-size: 16px;
      font-weight: 700;
    }
  }
`;

const RegionFlex = styled.div`
  display: flex;
  div {
    width: 54px;
    height: 31px;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${props => props.theme?.colorLineLight};
  }
  div:not(:first-child) {
    border-left: 0;
  }
`;

const DateFlex = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  input[type='date'] {
    padding: 5px;
    font-size: 12px;
    height: 31px;
    border: 1px solid ${props => props.theme?.colorLineLight};
  }
  span {
    margin: 0 5px;
  }
`;

const Button = styled.button`
  margin-top: 8px;
  width: 100px;
  height: 31px;
  font-weight: 700;
  background-color: ${props => props.theme?.colorBlack};
  color: ${props => props.theme?.colorWhite};
`;

const InquiryPeriod: FC<InquiryPeroidProps> = ({ prevDate, setPrevDate, currentDate, setCurrentDate }) => {
  const today = getToday();
  return (
    <Wrapper>
      <h3>조회기간</h3>
      <RegionFlex>
        <div>오늘</div>
        <div>이번주</div>
        <div>1개월</div>
        <div>3개월</div>
      </RegionFlex>
      <form>
        <DateFlex>
          <input
            type="date"
            max={today}
            value={prevDate}
            onChange={e => {
              setPrevDate(e.target.value);
            }}
          />
          <span>~</span>
          <input
            type="date"
            max={today}
            value={currentDate}
            onChange={e => {
              setCurrentDate(e.target.value);
            }}
          />
        </DateFlex>
        <Button type="submit">조회</Button>
      </form>
    </Wrapper>
  );
};

export default InquiryPeriod;
