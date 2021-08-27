import React, { Fragment, FC } from 'react';
import styled from 'lib/woowahan-components';
import { Link } from 'lib/router';

import { formatPrice } from 'utils';
import { ITEM_URL } from 'constants/urls';
import { CartItem } from 'types/cart';

import Table from 'components/common/table';
import { CheckBox } from 'components';

interface TableSectionProps {
  cartItems: CartItem[];
  checkedItems: Set<number>;
  checkAll: boolean;
  setPrices: React.Dispatch<React.SetStateAction<number[]>>;
  setTotalCount: React.Dispatch<React.SetStateAction<number>>;
  setCheckAll: React.Dispatch<React.SetStateAction<boolean>>;
  setCheckedItems: React.Dispatch<React.SetStateAction<Set<number>>>;
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

  .item-link {
    color: ${({ theme }) => theme?.colorBlack};
  }
`;

const TableRowText = styled.div`
  text-align: center;
`;

const CheckBoxDiv = styled.div`
  margin-bottom: 20px;
`;

const ItemTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;

  ${({ theme }) => theme?.mobile} {
    font-size: 12px;
  }
`;

const tableHeaders = [
  { column: '상품/옵션 정보', span: 6 },
  { column: '수량', span: 3 },
  { column: '상품금액', span: 4 },
  { column: '배송비', span: 3 },
];

const TableSection: FC<TableSectionProps> = ({
  cartItems,
  checkedItems,
  checkAll,
  setPrices,
  setTotalCount,
  setCheckAll,
  setCheckedItems,
}) => {
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
    const checkedSet = new Set<number>();
    if (checkAll) {
      setCheckAll(false);
      setCheckedItems(checkedSet);
      updatePrice(checkedSet);
      localStorage.setItem('select', '');
    } else {
      setCheckAll(true);
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
          <Fragment key={id}>
            <CheckBoxDiv className="dd">
              <CheckBox id={idx.toString()} text="" onChange={checkedItemHandler(idx)} check={checkedItems.has(idx)} />
            </CheckBoxDiv>
            <TableRowTitle>
              <div>
                <Link className="item-link" to={`${ITEM_URL}/${id}`}>
                  <ItemTitle>
                    <img src={thumbnail} alt={title} />
                    <div>{title}</div>
                  </ItemTitle>
                </Link>
              </div>
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
