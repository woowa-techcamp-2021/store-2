import styled from 'lib/woowahan-components';
import React, { FC } from 'react';

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
  justify-content: space-between;
  div {
    display: flex;
    font-weight: bold;
    color: ${props => props.theme?.softBlack};
    font-size: 12px;
    margin-right: 15%;
    :last-child {
      margin-left: auto;
    }
  }
  :nth-child(3) {
    margin-left: auto;
  }
  :last-child {
    margin-right: 0;
  }
  margin-top: 50px;
  background-color: ${props => props.theme?.colorFooter};

  ${props => props.theme?.mobile} {
    margin: 0 -12px;
    background-color: transparent;
    div {
      margin-right: 10%;
    }
  }
  ${props => props.theme?.laptop} {
    div {
      margin-right: 20%;
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
