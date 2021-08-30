import React, { Fragment, FC } from 'react';
import styled from 'lib/woowahan-components';
import { Link } from 'lib/router';

import { IOrder } from 'types/order';

import { formatPrice } from 'utils';
import { ITEM_URL } from 'constants/urls';

import { Table } from 'components';

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

const ItemTitle = styled.div`
  display: flex;
  align-items: center;
  word-break: keep-all;
`;

const tableHeaders = [
  { column: '주문일자', span: 4 },
  { column: '상품명', span: 5 },
  { column: '상품금액/수량', span: 4 },
  { column: '주문상태', span: 3 },
];

const MyOrderTable: FC<MyOrderTableProps> = ({ loading, orders }) => {
  return (
    <Table headers={tableHeaders} loading={loading}>
      {orders.map(order => {
        const { id, createdAt, itemId, title, thumbnail, price, quantity, status } = order;
        return (
          <Fragment key={id}>
            <TableRowText>{createdAt}</TableRowText>
            <TableRowTitle>
              <Link className="item-link" to={`${ITEM_URL}/${itemId}`}>
                <ItemTitle>
                  <img src={thumbnail} alt={title} />
                  {title}
                </ItemTitle>
              </Link>
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
