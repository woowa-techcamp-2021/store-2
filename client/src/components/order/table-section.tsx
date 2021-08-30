import React, { Fragment, FC } from 'react';
import styled from 'lib/woowahan-components';

import { formatPrice } from 'utils';

import { Table } from 'components';

export interface OrderItem {
  id: string;
  thumbnail: string;
  title: string;
  count: number;
  price: number;
}

interface TableSectionProps {
  orderItems: OrderItem[];
  loading: boolean;
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

const ItemTitle = styled.div`
  display: flex;
  font-size: 14px;
  align-items: center;

  ${({ theme }) => theme?.mobile} {
    font-size: 12px;
  }
`;

const tableHeaders = [
  { column: '상품/옵션 정보', span: 5 },
  { column: '수량', span: 2 },
  { column: '상품금액', span: 3 },
  { column: '배송비', span: 2 },
];

const TableSection: FC<TableSectionProps> = ({ orderItems, loading }) => {
  return (
    <Table headers={tableHeaders} loading={loading}>
      {orderItems.map(item => {
        const { id, title, thumbnail, count, price } = item;
        return (
          <Fragment key={id}>
            <TableRowTitle>
              <ItemTitle>
                <img src={thumbnail} alt={title} />
                {title}
              </ItemTitle>
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

export default TableSection;
