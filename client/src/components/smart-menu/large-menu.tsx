import woowahan from 'lib/woowahan-components';
import React, { FC } from 'react';
import { IMenu } from 'types/category';
import { SMART_MENU_BLOCK_DELAY } from '../../constants';

interface LargeMenuProps {
  menu: IMenu;
  position: { x: number; y: number };
  selectedLargeId: string;
  isLaptop: boolean;
  setLargeId: React.Dispatch<React.SetStateAction<string>>;
  setPosition: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >;
}

const LargeItemDiv = woowahan.ul`
  writing-mode: horizontal-tb;
  text-orientation: sideways;
  background-color: ${({ theme }) => theme?.colorBg};
  border-radius: 20px;
  padding-left: 32px;
`;

const LargeItem = woowahan.li`
  font-family: ${({ theme }) => theme?.fontHannaAir};
  display: flex;
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

const LargeMenu: FC<LargeMenuProps> = ({ menu, position, selectedLargeId, isLaptop, setLargeId, setPosition }) => {
  return (
    <LargeItemDiv>
      {menu.data.map(large => {
        const largeId = large.code.slice(0, 2);
        return (
          <LargeItem
            key={largeId}
            onMouseMove={(e: React.MouseEvent) => {
              if (isLaptop) {
                setTimeout(() => {
                  if (e.clientX < position.x + 10) {
                    setLargeId(largeId);
                  }
                  setPosition({ x: e.clientX, y: e.clientY });
                }, SMART_MENU_BLOCK_DELAY);
              }
            }}
            onClick={() => {
              if (!isLaptop) {
                setLargeId(largeId);
              }
            }}
            isSelected={selectedLargeId === largeId}
          >
            {large.name}
          </LargeItem>
        );
      })}
    </LargeItemDiv>
  );
};

export default LargeMenu;
