import React, { FC, useCallback } from 'react';
import styled from 'lib/woowahan-components';
import { useHistory } from 'lib/router';

import back from 'assets/icons/back.svg';

interface MenuHeaderProps {
  title: string;
  isMobile: boolean;
}

const MobileWrapper = styled.div`
  background-color: ${props => props.theme?.colorFooter};
  border-bottom: 1px solid ${props => props.theme?.colorLineLight};
  border-top: 1px solid ${props => props.theme?.colorLineLight};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  margin: 0 -12px;
  .title {
    text-align: center;
    font-family: ${props => props.theme?.fontHanna};
    font-size: 18px;
  }
  .empty {
    width: 30px;
  }
`;

const BackButton = styled.img`
  width: 30px;
`;

const Wrapper = styled.div`
  padding-top: 50px;
  padding-bottom: 30px;
  font-size: 28px;
  font-weight: 700;
  border-bottom: 1px solid ${props => props.theme?.colorLineLight};
`;

const MenuHeader: FC<MenuHeaderProps> = ({ title, isMobile }) => {
  const history = useHistory();
  const onClick = useCallback(() => history.goBack(), [history]);
  if (isMobile)
    return (
      <MobileWrapper className="mobile-wrapper">
        <button type="button" onClick={onClick}>
          <BackButton src={back} alt="뒤로가기" />
        </button>
        <div className="title">{title}</div>
        <div className="empty" />
      </MobileWrapper>
    );
  return <Wrapper className="title">{title}</Wrapper>;
};

export default MenuHeader;
