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
  align-items: center;
  justify-content: center;
`;

const Modal: FC = ({ children }) => {
  return <ModalBlock>{children}</ModalBlock>;
};

export default Modal;
