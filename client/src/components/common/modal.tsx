import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

import alertImg from 'assets/icons/congrats.gif';
import confirmImg from 'assets/icons/wait.png';

interface ModalProps {
  type: 'alert' | 'confirm';
  header?: ReactNode;
  body?: ReactNode;
}

const ModalBlock = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colorWhite};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
  height: 500px;

  ${({ theme }) => theme.mobile} {
    border-radius: 40px;
    width: 90%;
    max-height: 90%;
  }

  ${({ theme }) => theme.tablet} {
    width: 650px;
    max-width: 90%;
  }

  ${({ theme }) => theme.laptop} {
    width: 650px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  img {
    width: 200px;
    margin-bottom: 20px;

    ${({ theme }) => theme.mobile} {
      width: 150px;
    }
  }

  div {
    color: ${props => props.theme.colorBlack};
    font-family: ${props => props.theme.fontEuljiro};
    font-size: 36px;

    ${({ theme }) => theme.mobile} {
      font-size: 24px;
    }

    ${({ theme }) => theme.tablet} {
      font-size: 32px;
    }
  }
`;

const ModalBody = styled.div`
  text-align: center;
  margin-bottom: 20px;

  div {
    color: ${props => props.theme.colorBlack};
    font-family: ${props => props.theme.fontHannaAir};
    font-size: 20px;

    ${({ theme }) => theme.mobile} {
      font-size: 16px;
    }

    ${({ theme }) => theme.tablet} {
      font-size: 18px;
    }
  }
`;

const ModalFooter = styled.div``;

const Modal: FC<ModalProps> = ({ type, header, body }) => {
  return (
    <ModalBlock>
      <Inner>
        <ModalHeader>
          <img src={type === 'alert' ? alertImg : confirmImg} alt="modal-img" />
          <div>{header}</div>
        </ModalHeader>
        <ModalBody>
          <div>{body}</div>
        </ModalBody>
        {type === 'confirm' && <ModalFooter>buttons</ModalFooter>}
      </Inner>
    </ModalBlock>
  );
};

export default Modal;
