import woowahan from 'lib/woowahan-components';
import React, { FC } from 'react';
import { IMenu } from 'types';

interface ISmallMenuProps {
  menu: IMenu;
  selectedLargeId: string;
  selectedMediumId: string;
}

const SmallItemDiv = woowahan.div`
  writing-mode: horizontal-tb;
  text-orientation: sideways;
`;

const SmallItem = woowahan.div`
  font-family: ${({ theme }) => theme?.fontHannaAir};
  font-size: 26px;
  background-color: ${({ theme }) => theme?.colorBg};

  border: 1px solid ${({ theme }) => theme?.colorOffWhite};
  padding: 10px;
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

const SmallMenu: FC<ISmallMenuProps> = ({ menu, selectedLargeId, selectedMediumId }) => {
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
