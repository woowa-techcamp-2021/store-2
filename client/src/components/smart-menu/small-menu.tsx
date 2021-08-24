import React, { FC } from 'react';
import styled from 'lib/woowahan-components';

import { IMenu } from 'types/category';

interface SmallMenuProps {
  menu: IMenu;
  selectedLargeId: string;
  selectedMediumId: string;
}

const SmallItemDiv = styled.div`
  writing-mode: horizontal-tb;
  text-orientation: sideways;
`;

const SmallItem = styled.div`
  font-family: ${({ theme }) => theme?.fontHannaAir};
  font-size: 26px;
  background-color: ${({ theme }) => theme?.colorBg};
  padding: 5px 10px;
  ${({ theme }) => theme?.mobile} {
    width: 110px;
    font-size: 16px;
  }
  ${({ theme }) => theme?.tablet} {
    width: 150px;
    font-size: 18px;
  }
  ${({ theme }) => theme?.laptop} {
    width: 200px;
    font-size: 22px;
  }
  cursor: default;
`;

const SmallMenu: FC<SmallMenuProps> = ({ menu, selectedLargeId, selectedMediumId }) => {
  return (
    <SmallItemDiv>
      {menu.data.map(large => {
        if (large.code.slice(0, 2) === selectedLargeId) {
          return large.child?.map(medium => {
            if (medium.code.slice(2, 4) === selectedMediumId) {
              return medium.child?.map(small => {
                if (small.code.slice(4, 6) !== '00') return <SmallItem key={small.code}>{small.name}</SmallItem>;
                return null;
              });
            }
            return null;
          });
        }
        return null;
      })}
    </SmallItemDiv>
  );
};

export default SmallMenu;
