import React, { FC } from 'react';
import styled from 'styled-components';

const ModalBlock = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.colorWhite};
  ${({ theme }) => theme.mobile} {
    border-radius: 40px;
    /* width: 100%;
    height: 100%; */
    margin: 100px 20px;
  }
  ${({ theme }) => theme.tablet} {
  }
  ${({ theme }) => theme.laptop} {
    border-radius: 67px;
    width: 650px;
    height: 500px;
  }
`;

const Modal: FC = ({ children }) => {
  return (
    <ModalBlock>
      <Inner>{children}</Inner>
    </ModalBlock>
  );
};

export default Modal;
