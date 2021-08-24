import styled from 'lib/woowahan-components';
import React, { FC } from 'react';

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
  onSubmit: (e: React.FormEvent) => void;
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

const Button = styled.button`
  width: 100px;
  height: 31px;
  font-weight: 700;
  background-color: ${props => props.theme?.colorBlack};
  color: ${props => props.theme?.colorWhite};
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
  onSubmit,
}) => {
  const btn: [string, () => void][] = [
    ['오늘', onClickToday],
    ['이번주', onClickThisWeek],
    ['1개월', onClickThisMonth],
    ['3개월', onClickThreeMonth],
  ];
  return (
    <Wrapper>
      <h3>조회기간</h3>
      <Form onSubmit={onSubmit}>
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

export default PeriodSelector;
