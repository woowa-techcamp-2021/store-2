import React, { FC, useCallback } from 'react';
import styled from 'lib/woowahan-components';
import { useHistory } from 'lib/router';

import arrow from 'assets/icons/arrow_forward.svg';

import { IMenu } from 'types/category';

import { SMART_MENU_BLOCK_DELAY } from 'constants/index';
import { ITEM_LIST_URL } from 'constants/urls';

interface LargeMenuProps {
  menu: IMenu;
  position: { x: number; y: number };
  selectedLargeId: string;
  isMobile: boolean;
  setLargeId: React.Dispatch<React.SetStateAction<string>>;
  setMediumId: React.Dispatch<React.SetStateAction<string>>;
  setPosition: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >;
}

const LargeItemDiv = styled.div`
  display: grid;
`;

const LargeItemUl = styled.ul`
  writing-mode: horizontal-tb;
  text-orientation: sideways;
  background-color: ${({ theme }) => theme?.colorBg};

  border-radius: 20px;
  padding-left: 32px;
`;

const LargeItem = styled.li`
  font-family: ${({ theme }) => theme?.fontHannaAir};
  display: flex;
  background-color: ${props => (props.isSelected ? props.theme?.colorOffWhite : props.theme?.colorBg)};
  border: 1px solid ${({ theme }) => theme?.colorOffWhite};
  padding: 10px;
  align-items: center;
  justify-content: space-between;
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

const LargeTitle = styled.div`
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
    position: relative;
    top: -1px;
    width: 24px;
  }
`;

const LargeMenu: FC<LargeMenuProps> = ({
  menu,
  position,
  selectedLargeId,
  isMobile,
  setLargeId,
  setMediumId,
  setPosition,
}) => {
  const history = useHistory();
  const goCategoryPage = useCallback(
    (code: string) => () => history.push(`${ITEM_LIST_URL}?categoryId=${code}`),
    [history],
  );

  return (
    <LargeItemDiv>
      <LargeItemUl>
        {menu.data.map(large => {
          const largeId = large.code.slice(0, 2);
          return (
            <LargeItem
              key={largeId}
              onMouseMove={(e: React.MouseEvent) => {
                setMediumId('');
                setTimeout(() => {
                  if (e.clientX < position.x + 10) {
                    setLargeId(largeId);
                  }
                  setPosition({ x: e.clientX, y: e.clientY });
                }, SMART_MENU_BLOCK_DELAY);
              }}
              onClick={(e: React.MouseEvent) => {
                if (isMobile) {
                  setLargeId(largeId);
                  e.stopPropagation();
                } else {
                  history.push(`${ITEM_LIST_URL}?categoryId=${large.code}`);
                }
              }}
              isSelected={selectedLargeId === largeId}
              isLaptop={isMobile}
            >
              <LargeTitle>{large.name}</LargeTitle>
              <GoCategoryButton isSelected={selectedLargeId === largeId} onClick={goCategoryPage(large.code)}>
                <Image src={arrow} alt="카테고리 탐색" />
              </GoCategoryButton>
            </LargeItem>
          );
        })}
      </LargeItemUl>
    </LargeItemDiv>
  );
};

export default LargeMenu;
