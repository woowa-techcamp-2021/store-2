import React, { FC, useCallback } from 'react';
import styled from 'lib/woowahan-components';
import { useHistory } from 'lib/router';
import { IMenu } from 'types/category';
import arrow from 'assets/icons/arrow_forward.png';

interface MediumMenuProps {
  menu: IMenu;
  selectedLargeId: string;
  selectedMediumId: string;
  setMediumId: React.Dispatch<React.SetStateAction<string>>;
}

const MediumItemDiv = styled.div`
  display: flex;
`;

const MediumItem = styled.ul`
  font-family: ${({ theme }) => theme?.fontHannaAir};
  writing-mode: horizontal-tb;
  text-orientation: sideways;
  background-color: ${props => (props.isSelected ? props.theme?.colorOffWhite : props.theme?.colorBg)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme?.colorOffWhite};
  padding: 10px;
  ${({ theme }) => theme?.mobile} {
    width: 130px;
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
`;

const MediumTitle = styled.div`
  padding-top: 3px;
`;

const GoCategoryButton = styled.div`
  font-family: ${({ theme }) => theme?.fontHannaAir};
  visibility: ${props => (props.isSelected ? 'visible' : 'hidden')};
  ${({ theme }) => theme?.mobile} {
    font-size: 16px;
  }
  ${({ theme }) => theme?.tablet} {
    font-size: 18px;
  }
  ${({ theme }) => theme?.laptop} {
    font-size: 22px;
  }
`;

const Image = styled.img`
  ${({ theme }) => theme?.mobile} {
    width: 16px;
  }
  ${({ theme }) => theme?.tablet} {
    width: 22px;
  }
  ${({ theme }) => theme?.laptop} {
    width: 24px;
  }
`;

const MediumMenu: FC<MediumMenuProps> = ({ menu, selectedLargeId, selectedMediumId, setMediumId }) => {
  const history = useHistory();
  const goCategoryPage = useCallback((code: string) => () => history.push(`/item/category/${code}`), [history]);

  return (
    <MediumItemDiv>
      {menu.data.map(large => {
        if (large.code.slice(0, 2) === selectedLargeId) {
          return large.child?.map(medium => {
            const mediumId = medium.code.slice(2, 4);
            return (
              <MediumItem
                key={selectedLargeId + mediumId}
                onMouseEnter={(e: React.MouseEvent) => {
                  setMediumId(mediumId);
                  e.stopPropagation();
                }}
                isSelected={selectedMediumId === mediumId}
              >
                <MediumTitle>{medium.name}</MediumTitle>
                <GoCategoryButton isSelected={selectedMediumId === mediumId} onClick={goCategoryPage(medium.code)}>
                  <Image src={arrow} alt="카테고리 탐색" />
                </GoCategoryButton>
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
