import React, { Fragment, FC } from 'react';
import styled from 'lib/woowahan-components';

import { Table } from 'components';

import { formatPrice } from 'utils';
import { IOrder } from 'types/order';
import CircleLoader from 'components/common/loader/circle-loader';

interface MyOrderTableProps {
  loading: boolean;
  orders: IOrder[];
  totalCount: number;
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
  { column: '주문일자', span: 1.4 },
  { column: '상품명', span: 3 },
  { column: '상품금액/수량', span: 1.7 },
  { column: '주문상태', span: 1 },
];

const MyOrderTable: FC<MyOrderTableProps> = ({ loading, orders }) => {
  return loading ? (
    <CircleLoader color="brown" size="100px" />
  ) : (
    <Table headers={tableHeaders}>
      {orders.map(order => {
        const { createdAt, title, thumbnail, price, quantity, status } = order;
        return (
          <Fragment key={title}>
            <TableRowText>{createdAt}</TableRowText>
            <TableRowTitle>
              <img src={thumbnail} alt={title} />
              {title}
            </TableRowTitle>
            <TableRowText>
              {formatPrice(price)}원 / {quantity}개
            </TableRowText>
            <TableRowText>{status}</TableRowText>
          </Fragment>
        );
      })}
    </Table>
  );
};

export default MyOrderTable;
