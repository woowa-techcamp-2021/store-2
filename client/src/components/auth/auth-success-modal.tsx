import React, { FC } from 'react';
import styled from 'styled-components';
import Modal from 'components/common/modal';
import congrats from 'assets/icons/congrats.gif';

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    font-family: ${props => props.theme.fontEuljiro};
  }
  div {
    font-family: ${props => props.theme.fontHannaAir};
  }
  span {
    color: ${props => props.theme.colorPrimary};
  }
  b {
    font-weight: 600;
  }
  ${({ theme }) => theme.mobile} {
    h2 {
    }
    div {
    }
  }
  ${({ theme }) => theme.tablet} {
    h2 {
    }
    div {
    }
  }
  ${({ theme }) => theme.laptop} {
    h2 {
      font-size: 50px;
      margin: 30px;
    }
    div {
      font-size: 25px;
    }
  }
`;

const Img = styled.img`
  margin-top: 90;
  margin-bottom: 30;
  width: 250px;
`;

interface Inf {
  userId: string | null | undefined;
}

const AuthSuccessModal: FC<Inf> = ({ userId }) => {
  return (
    <Modal>
      <Img src={congrats} alt="축하" />
      <Inner>
        <h2>
          회원가입이 <span>완료</span>되었습니다
        </h2>
        <div>
          <b>{userId}</b>님의 회원가입을 축하드립니다
        </div>
        <div>알차고 실속있는 서비스로 찾아뵙겠습니다</div>
      </Inner>
    </Modal>
  );
};

export default AuthSuccessModal;
