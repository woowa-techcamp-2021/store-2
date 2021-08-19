import React, { useState, FC, useEffect } from 'react';
import styled from 'lib/woowahan-components';
import useWindowSize from 'hooks/use-window-size';
import { useQuery } from 'lib/router/hooks/use-query';
import { IMenu } from 'types/category';
import { SMART_MENU_LARGE_WIDTH, SMART_MENU_SMALL_WIDTH, SMART_MENU_BLOCK_DELAY } from '../../constants';
import LargeMenu from './large-menu';
import MediumMenu from './medium-menu';
import SmallMenu from './small-menu';

interface SmartMenuProps {
  currentMenu: string;
  menu: IMenu;
}

const MenuDiv = styled.div`
  cursor: pointer;
  position: fixed;
  top: 10%;
  left: -27px;
  display: inline-block;
  writing-mode: vertical-lr;
  text-orientation: upright;
  padding: 24px 12px;
  background-color: ${({ theme }) => theme?.colorBg};
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  color: ${({ theme }) => theme?.colorBlack};
  border: 3px solid ${({ theme }) => theme?.colorLineDark};
  z-index: 1000;
`;

const MenuTitle = styled.div`
  padding-left: 20px;
  color: ${({ theme }) => theme?.colorLineDark};
  font-family: ${({ theme }) => theme?.fontHanna};

  ${({ theme }) => theme?.mobile} {
    font-size: 18px;
    transform: translate(0px, -13px);
  }
  ${({ theme }) => theme?.tablet} {
    font-size: 20px;
    transform: translate(0px, -15px);
  }
  ${({ theme }) => theme?.laptop} {
    font-size: 26px;
    transform: translate(0px, -17px);
  }
`;

const isLaptop = (width: number) => {
  return width >= SMART_MENU_LARGE_WIDTH;
};

const isSmall = (width: number) => {
  return width <= SMART_MENU_SMALL_WIDTH;
};

const SmartMenu: FC<SmartMenuProps> = ({ currentMenu, menu }) => {
  const [isOpen, setOpenStatus] = useState(false);
  const [selectedLargeId, setLargeId] = useState('');
  const [selectedMediumId, setMediumId] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [menuName, setMenuName] = useState('');
  const { width } = useWindowSize();
  const query = useQuery();

  useEffect(() => {
    setOpenStatus(false);
  }, [query]);
  if (currentMenu !== menuName) {
    setMenuName(currentMenu);
    setOpenStatus(false);
  }

  return (
    <MenuDiv
      onMouseEnter={() => {
        setOpenStatus(true);
      }}
      onMouseLeave={() => {
        setOpenStatus(false);
        setLargeId('');
        setMediumId('');
        setTimeout(() => {
          setLargeId('');
        }, SMART_MENU_BLOCK_DELAY);
      }}
    >
      {isOpen && (
        <LargeMenu
          menu={menu}
          position={position}
          selectedLargeId={selectedLargeId}
          isLaptop={isLaptop(width)}
          setLargeId={setLargeId}
          setPosition={setPosition}
        />
      )}
      {isOpen && selectedLargeId !== '' && (
        <MediumMenu
          menu={menu}
          selectedLargeId={selectedLargeId}
          selectedMediumId={selectedMediumId}
          setMediumId={setMediumId}
        />
      )}
      {isOpen && !isSmall(width) && selectedMediumId !== '' && (
        <SmallMenu menu={menu} selectedLargeId={selectedLargeId} selectedMediumId={selectedMediumId} />
      )}
      <MenuTitle
        onClick={() => {
          if (!isLaptop(width) && isOpen) {
            setOpenStatus(false);
            setLargeId('');
            setMediumId('');
          } else {
            setOpenStatus(true);
          }
        }}
      >
        {currentMenu}
      </MenuTitle>
    </MenuDiv>
  );
};

export default SmartMenu;
