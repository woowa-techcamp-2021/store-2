import styled from 'styled-components';
import React, { FC } from 'react';
import { IMenu } from 'types';

interface IMediumMenuProps {
  menu: IMenu;
  selectedLargeId: string;
  selectedMediumId: string;
  setMediumId: React.Dispatch<React.SetStateAction<string>>;
}

interface IMediumItem {
  isSelected: boolean;
}

const MediumItemDiv = styled.div`
  display: flex;
`;

const MediumItem = styled.ul<IMediumItem>`
  font-family: ${({ theme }) => theme.fontHannaAir};
  writing-mode: horizontal-tb;
  text-orientation: sideways;
  background-color: ${props => (props.isSelected ? props.theme.colorOffWhite : props.theme.colorBg)};
  border: 1px solid ${({ theme }) => theme.colorOffWhite};
  padding: 10px;

  ${({ theme }) => theme.mobile} {
    width: 110px;
    font-size: 16px;
  }
  ${({ theme }) => theme.tablet} {
    width: 150px;
    font-size: 18px;
  }
  ${({ theme }) => theme.laptop} {
    width: 200px;
    font-size: 22px;
  }
`;

const MediumMenu: FC<IMediumMenuProps> = ({ menu, selectedLargeId, selectedMediumId, setMediumId }) => {
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
                isSelected={selectedMediumId === mediumId}
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
