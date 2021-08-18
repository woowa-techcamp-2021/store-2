import React, { FC, useCallback } from 'react';
import woowahan from 'lib/woowahan-components';
import { useHistory } from 'lib/router';
import { IMenu } from 'types/category';

interface MediumMenuProps {
  menu: IMenu;
  selectedLargeId: string;
  selectedMediumId: string;
  setMediumId: React.Dispatch<React.SetStateAction<string>>;
}

const MediumItemDiv = woowahan.div`
  display: flex;
`;

const MediumItem = woowahan.ul`
  font-family: ${({ theme }) => theme?.fontHannaAir};
  writing-mode: horizontal-tb;
  text-orientation: sideways;
  background-color: ${props => (props.isSelected ? props.theme?.colorOffWhite : props.theme?.colorBg)};

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
`;

const GoCategoryButton = woowahan.div`
  font-family: ${({ theme }) => theme?.fontHannaAir};
  visibility: ${props => (props.isSelected ? 'visible' : 'hidden')};
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
                {medium.name}
                <GoCategoryButton isSelected={selectedMediumId === mediumId} onClick={goCategoryPage(medium.code)}>
                  이동
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
