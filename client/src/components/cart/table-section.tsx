import React, { Fragment, FC, useState } from 'react';
import styled from 'lib/woowahan-components';

import { formatPrice } from 'utils';

import Table from 'components/common/table';
import { CheckBox } from 'components';

interface TableSectionProps {
  cartItems: CartItem[];
  checkedItems: Set<number>;
  setPrices: React.Dispatch<React.SetStateAction<number[]>>;
  setTotalCount: React.Dispatch<React.SetStateAction<number>>;
  setCheckedItems: React.Dispatch<React.SetStateAction<Set<number>>>;
}

interface CartItem {
  id: string;
  thumbnail: string;
  title: string;
  count: number;
  price: number;
}

const TableRowTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: ${({ theme }) => theme?.weightMid};

  img {
    width: 42px;
    height: auto;
    margin-right: 8px;
  }

  ${({ theme }) => theme?.mobile} {
    img {
      display: none;
    }
  }
`;
const TableRowText = styled.div`
  text-align: center;
`;

const tableHeaders = [
  { column: '상품/옵션 정보', span: 6 },
  { column: '수량', span: 1 },
  { column: '상품금액', span: 1 },
  { column: '배송비', span: 1 },
];

const TableSection: FC<TableSectionProps> = ({
  cartItems,
  checkedItems,
  setPrices,
  setTotalCount,
  setCheckedItems,
}) => {
  const [checkAll, setCheckAll] = useState(false);

  const updatePrice = (set: Set<number>) => {
    const prices = [] as number[];
    let totalCount = 0;
    Array.from(set).forEach(index => {
      const item = cartItems[Number(index)];
      prices.push(item.price * item.count);
      totalCount += item.count;
    });
    if (prices.length === 0) {
      prices.push(0);
    }
    setPrices(prices);
    setTotalCount(totalCount);
  };

  const checkedItemHandler = (id: number) => () => {
    const checkedSet = new Set<number>(checkedItems);
    if (checkedSet.has(id)) {
      checkedSet.delete(id);
      setCheckedItems(checkedSet);
    } else {
      checkedSet.add(id);
      setCheckedItems(checkedSet);
    }

    if (cartItems.length === checkedSet.size) {
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
    updatePrice(checkedSet);
    localStorage.setItem('select', Array.from(checkedSet).join(','));
  };

  const checkAllHandler = () => {
    if (checkAll) {
      setCheckAll(false);
      setCheckedItems(new Set<number>());
      localStorage.setItem('select', '');
    } else {
      setCheckAll(true);
      const checkedSet = new Set<number>();
      cartItems.forEach((item, index) => checkedSet.add(index));
      setCheckedItems(checkedSet);
      updatePrice(checkedSet);
      localStorage.setItem('select', Array.from(checkedSet).join(','));
    }
  };

  return (
    <Table
      headers={[
        {
          column: <CheckBox id="all" text="" onChange={checkAllHandler} check={checkAll} />,
          span: 1,
        },
        ...tableHeaders,
      ]}
    >
      {cartItems.map((item, idx) => {
        const { id, title, thumbnail, count, price } = item;
        return (
          <Fragment key={id.toString() + idx.toString()}>
            <TableRowTitle>
              <CheckBox id={idx.toString()} text="" onChange={checkedItemHandler(idx)} check={checkedItems.has(idx)} />
              <img src={thumbnail} alt={title} />
              {title}
            </TableRowTitle>
            <TableRowText>{count}개</TableRowText>
            <TableRowText>{formatPrice(price)}원</TableRowText>
            <TableRowText>공짜!</TableRowText>
          </Fragment>
        );
      })}
    </Table>
  );
};

export { TableSection, CartItem };
