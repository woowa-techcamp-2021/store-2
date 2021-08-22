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
  h3 {
    font-size: 16px;
    font-weight: 700;
    padding: 16px;
  }
  padding: 35px 40px;
  border: 2px solid ${props => props.theme?.colorLineLight};
  ${props => props.theme?.mobile} {
    padding: 0;
    border: 0;
    h3 {
      margin: 0 -12px;
      font-size: 16px;
      font-weight: 700;
    }
  }
  ${props => props.theme?.labtop} {
    display: flex;
    align-items: center;
  }
`;

const Form = styled.form`
  display: flex;
  align-items: baselin;
  flex-wrap: wrap;
  > div {
    margin-right: 10px;
    margin-bottom: 10px;
  }
`;

const RegionFlex = styled.div`
  display: flex;
  button {
    width: 54px;
    height: 31px;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${props => props.theme?.colorLineLight};
  }
  button:not(:first-child) {
    border-left: 0;
  }
`;

const DateFlex = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  input[type='date'] {
    padding: 5px;
    font-size: 12px;
    height: 31px;
    border: 1px solid ${props => props.theme?.colorLineLight};
    margin-bottom: 15px;
  }
  :nth-child(3) {
    margin-right: 10px;
  }
  span {
    margin: 0 5px;
    margin-bottom: 15px;
  }
`;

const Button = styled.button`
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
      <Form>
        <RegionFlex>
          <button type="button">오늘</button>
          <button type="button">이번주</button>
          <button type="button">1개월</button>
          <button type="button">3개월</button>
        </RegionFlex>
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
          <Button type="submit">조회</Button>
        </DateFlex>
      </Form>
    </Wrapper>
  );
};

export default InquiryPeriod;
