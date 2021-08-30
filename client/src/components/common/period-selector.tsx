import React, { FC } from 'react';
import styled from 'lib/woowahan-components';

interface PeriodSelectorProps {
  prevDate: string;
  setPrevDate: React.Dispatch<React.SetStateAction<string>>;
  currentDate: string;
  setCurrentDate: React.Dispatch<React.SetStateAction<string>>;
  today: string;
  onClickToday: () => void;
  onClickThisWeek: () => void;
  onClickThisMonth: () => void;
  onClickThreeMonth: () => void;
  select: undefined | number;
}

const Wrapper = styled.div`
  margin-bottom: 40px;
  h3 {
    font-size: 16px;
    font-weight: 700;
    padding: 16px;
  }
  padding: 20px 25px 10px 25px;
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
  align-items: baseline;
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
    color: #777777;
    &.active {
      color: ${props => props.theme?.colorWhite};
      background-color: ${props => props.theme?.colorLineLight};
    }
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

const PeriodSelector: FC<PeriodSelectorProps> = ({
  prevDate,
  setPrevDate,
  currentDate,
  setCurrentDate,
  today,
  onClickToday,
  onClickThisWeek,
  onClickThisMonth,
  onClickThreeMonth,
  select,
}) => {
  const btn: [string, () => void][] = [
    ['오늘', onClickToday],
    ['이번주', onClickThisWeek],
    ['1개월', onClickThisMonth],
    ['3개월', onClickThreeMonth],
  ];
  const prevMax = currentDate && new Date(currentDate) < new Date(today) ? currentDate : today;
  return (
    <Wrapper>
      <Form>
        <h3>조회기간</h3>
        <RegionFlex>
          {btn.map(([text, fn], idx) => (
            <button key={text} type="button" onClick={fn} className={select === idx ? 'active' : ''}>
              {text}
            </button>
          ))}
        </RegionFlex>
        <DateFlex>
          <input
            type="date"
            max={prevMax}
            value={prevDate}
            onChange={e => {
              setPrevDate(e.target.value);
            }}
            required
          />
          <span>~</span>
          <input
            type="date"
            min={prevDate}
            max={today}
            value={currentDate}
            onChange={e => {
              setCurrentDate(e.target.value);
            }}
            required
          />
        </DateFlex>
      </Form>
    </Wrapper>
  );
};

export default PeriodSelector;
