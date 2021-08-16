import styled from 'styled-components';
import React, { useState, FC } from 'react';
import useWindowSize from 'hooks/use-window-size';

const MenuContainer = styled.div`
  cursor: pointer;
  position: fixed;
  top: 200px;
  left: -17px;
  display: inline-block;
  writing-mode: vertical-lr;
  text-orientation: upright;
  padding: 12px;
  background-color: ${({ theme }) => theme.colorBg};
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  color: ${({ theme }) => theme.colorBlack};
  border: 3px solid ${({ theme }) => theme.colorLineDark};
`;

const MenuTitle = styled.div`
  padding-left: 10px;
  color: ${({ theme }) => theme.colorLineDark};
  font-family: ${({ theme }) => theme.fontHanna};

  ${({ theme }) => theme.mobile} {
    font-size: 18px;
    transform: translate(0px, -13px);
  }
  ${({ theme }) => theme.tablet} {
    font-size: 20px;
    transform: translate(0px, -15px);
  }
  ${({ theme }) => theme.laptop} {
    font-size: 26px;
    transform: translate(0px, -17px);
  }
`;

const Menu = styled.ul`
  writing-mode: horizontal-tb;
  text-orientation: sideways;
  background-color: ${({ theme }) => theme.colorBg};
  border-radius: 20px;
  padding-left: 12px;
`;

const LargeItem = styled.li<LargeItemProps>`
  font-family: ${({ theme }) => theme.fontHannaAir};
  display: flex;
  background-color: ${props => (props.isSelected ? props.theme.colorOffWhite : props.theme.colorBg)};
  border: 1px solid ${({ theme }) => theme.colorOffWhite};
  padding: 5px;

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

const SmallItem = styled.div`
  font-family: ${({ theme }) => theme.fontHannaAir};
  font-size: 26px;
  background-color: ${({ theme }) => theme.colorBg};
  border: 1px solid ${({ theme }) => theme.colorOffWhite};
  padding: 5px;

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

const SmallItemDiv = styled.div`
  writing-mode: horizontal-tb;
  text-orientation: sideways;
`;

interface LargeItemProps {
  isSelected: boolean;
}

interface IMenu {
  data: Array<{
    name: string;
    code: string;
    child?: Array<IMenuChild>;
  }>;
}

interface IMenuChild {
  name: string;
  code: string;
  child?: Array<{ name: string; code: string }>;
}

interface ICategory {
  name: string;
  code: string;
}

interface SmartMenuProps {
  currentMenu: string;
}

// 카테고리 더미 데이터 api연동 시 삭제 예정
const data = [
  { name: '전체', code: '000000' },
  { name: '문구', code: '080000' },
  { name: '노트/메모지', code: '080100' },
  { name: '베이직 노트', code: '080101' },
  { name: '스프링 노트', code: '080102' },
  { name: '스프링 노트2', code: '080103' },
  { name: '스프링 노트3', code: '080104' },
  { name: '스프링 노트4', code: '080105' },
  { name: '데코레이션', code: '080200' },
  { name: '데코레이션2', code: '080300' },
  { name: '데코레이션3', code: '080400' },
  { name: '데코레이션4', code: '080500' },
  { name: '카드/편지/봉투', code: '080600' },
  { name: '스탬프', code: '080201' },
  { name: '스티커', code: '080202' },
  { name: '리빙', code: '090000' },
  { name: '데코레이션', code: '090100' },
  { name: 'ㅋㅋ에디션', code: '110000' },
  { name: 'ㅋㅋ에디션', code: '110100' },
  { name: '콜라보레이션', code: '120000' },
  { name: '콜라보레이션', code: '120100' },
  { name: '배달이친구들', code: '130000' },
  { name: '배달이친구들', code: '130100' },
  { name: '책', code: '140000' },
  { name: '책', code: '140100' },
  { name: '선물세트', code: '160000' },
  { name: '선물세트', code: '160100' },
  { name: '을지로 에디션', code: '180000' },
  { name: '을지로 에디션', code: '180100' },
  { name: '배민그린', code: '190000' },
  { name: '배민그린', code: '190100' },
];

const generateMenu = () => {
  const dataJson = { data: [] } as IMenu;
  let idx = -1;
  data.forEach(row2 => {
    const row = JSON.parse(JSON.stringify(row2)) as ICategory;
    const mediumCode: string = row.code.slice(2, 4);

    if (row.code.indexOf('0000') >= 0) {
      dataJson.data.push(row);
      idx += 1;
    } else if (row.code.lastIndexOf('00') === 4) {
      if (dataJson.data[idx].child === undefined) {
        dataJson.data[idx].child = [row];
      } else {
        dataJson.data[idx].child?.push(row);
      }
    }

    if (dataJson.data[idx].child?.[Number(mediumCode) - 1].child === undefined) {
      if (dataJson.data[idx]?.child) {
        (dataJson.data[idx].child as Array<IMenuChild>)[Number(mediumCode) - 1].child = [row];
      }
    } else {
      dataJson.data[idx].child?.[Number(mediumCode) - 1].child?.push(row);
    }
  });
  return dataJson;
};

const isLaptop = (width: number) => {
  return width >= 1200;
};

const isSmall = (width: number) => {
  return width <= 550;
};

const SmartMenu: FC<SmartMenuProps> = ({ currentMenu }) => {
  const [isOpen, setOpenStatus] = useState(false);
  const [selectedLargeId, setLargeId] = useState('');
  const [selectedMediumId, setMediumId] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menu = generateMenu();
  const { width } = useWindowSize();
  return (
    <MenuContainer
      onMouseEnter={() => {
        setOpenStatus(true);
      }}
      onMouseLeave={() => {
        setOpenStatus(false);
        setLargeId('');
        setMediumId('');
        setTimeout(() => {
          setLargeId('');
        }, 100);
      }}
    >
      {isOpen && (
        <Menu>
          {menu.data.map(large => {
            const largeId = large.code.slice(0, 2);
            return (
              <LargeItem
                key={largeId}
                onMouseMove={e => {
                  if (isLaptop(width)) {
                    setTimeout(() => {
                      if (e.clientX < position.x + 10) {
                        setLargeId(largeId);
                      }
                      setPosition({ x: e.clientX, y: e.clientY });
                    }, 100);
                  }
                }}
                onClick={() => {
                  if (!isLaptop(width)) {
                    setLargeId(largeId);
                  }
                }}
                isSelected={selectedLargeId === largeId}
              >
                {large.name}
              </LargeItem>
            );
          })}
        </Menu>
      )}
      {selectedLargeId !== '' && (
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
      )}
      {!isSmall(width) && selectedMediumId !== '' && (
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
    </MenuContainer>
  );
};

export default SmartMenu;
