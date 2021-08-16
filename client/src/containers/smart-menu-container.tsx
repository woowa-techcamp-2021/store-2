import React, { FC } from 'react';
import SmartMenu from 'components/smart-menu';

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

interface ISmartMenuContainer {
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

const SmartMenuContainer: FC<ISmartMenuContainer> = ({ currentMenu }) => {
  return <SmartMenu currentMenu={currentMenu} menu={generateMenu()} />;
};

export default SmartMenuContainer;
