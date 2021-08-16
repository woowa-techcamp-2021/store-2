import styled from 'styled-components';
import React, { FC } from 'react';
import { IMenu } from 'types/types';

interface IMediumMenuProps {
  menu: IMenu;
  selectedLargeId: string;
  setMediumId: React.Dispatch<React.SetStateAction<string>>;
}

const MediumItemDiv = styled.div`
  display: flex;
`;

const MediumItem = styled.ul`
  font-family: ${({ theme }) => theme.fontHannaAir};
  writing-mode: horizontal-tb;
  text-orientation: sideways;
  background-color: ${({ theme }) => theme.colorBg};
  border: 1px solid ${({ theme }) => theme.colorOffWhite};
  padding: 5px;
  &:hover {
    background-color: ${({ theme }) => theme.colorOffWhite};
  }

  ${({ theme }) => theme.mobile} {
    width: 110px;
    font-size: 18px;
  }
  ${({ theme }) => theme.tablet} {
    width: 150px;
    font-size: 20px;
  }
  ${({ theme }) => theme.laptop} {
    width: 200px;
    font-size: 26px;
  }
`;

const MediumMenu: FC<IMediumMenuProps> = ({ menu, selectedLargeId, setMediumId }) => {
  return (
    <MediumItemDiv>
      {menu.data.map(large => {
        if (large.code.slice(0, 2) === selectedLargeId) {
          return large.child?.map(medium => {
            const mediumId = medium.code.slice(2, 4);
            return (
              <MediumItem
                key={selectedLargeId + mediumId}
                onMouseEnter={e => {
                  setMediumId(mediumId);
                  e.stopPropagation();
                }}
                onMouseLeave={e => {
                  setMediumId('');
                  e.stopPropagation();
                }}
              >
                {medium.name}
              </MediumItem>
            );
          });
        }
        return null;
      })}
    </MediumItemDiv>
  );
};

export default MediumMenu;
