import React, { FC } from 'react';
import styled from 'styled-components';
import { Modal } from 'components';

const Title = styled.h2`
  span {
    color: ${props => props.theme.colorPrimary};
  }
`;

const AuthLogoutModal: FC = () => {
  return (
    <Modal
      type="confirm"
      header={
        <Title>
          정말 <span>로그아웃</span> 하시겠습니까?
        </Title>
      }
      body={<p>나중에 꼭 다시 로그인하러 오세요~</p>}
    />
  );
};

export default AuthLogoutModal;
