import React, { FC } from 'react';
import styled from 'lib/woowahan-components';

interface MyStatusBarProps {
  data: string[];
}

const Wrapper = styled.div`
  border-top: 1px solid ${props => props.theme?.colorLineLight};
  border-bottom: 1px solid ${props => props.theme?.colorLineLight};
  height: 46px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  div {
    display: flex;
    font-weight: bold;
    color: ${props => props.theme?.softBlack};
    font-size: 12px;
  }
  :nth-child(1) {
    flex: 1.4;
  }
  :nth-child(2) {
    flex: 3;
  }
  :nth-child(3) {
    flex: 1.7;
  }
  :nth-child(4) {
    flex: 1;
  }
  margin-top: 50px;
  background-color: ${props => props.theme?.colorFooter};

  ${props => props.theme?.mobile} {
    margin: 0 -12px;
    background-color: transparent;
  }
  ${props => props.theme?.tablet} {
    > div {
      font-size: 14px;
    }
  }
  ${props => props.theme?.laptop} {
    > div {
      font-size: 16px;
    }
  }
`;

const MyStatusBar: FC<MyStatusBarProps> = ({ data }) => {
  return (
    <Wrapper>
      {data.map(text => (
        <div key={text}>{text}</div>
      ))}
    </Wrapper>
  );
};

export default MyStatusBar;
