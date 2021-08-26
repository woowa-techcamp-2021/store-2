import React, { FC, Children, ReactElement } from 'react';
import styled from 'lib/woowahan-components';

import CircleLoader from './loader/circle-loader';

interface TableProps {
  headers: TableColumn[];
  loading?: boolean;
}

interface TableColumn {
  column: string | ReactElement;
  span: number;
}

const TableBody = styled.table`
  width: 100%;

  thead {
    border-top: 1px solid ${({ theme }) => theme?.colorLineLight};
    border-bottom: 1px solid ${({ theme }) => theme?.colorLineLight};
    background: ${({ theme }) => theme?.colorFooter};

    th {
      padding: 16px 24px;
      font-size: 14px;
      font-weight: ${({ theme }) => theme?.weightBold};
      vertical-align: middle;
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid ${({ theme }) => theme?.colorLineLight};
    }
  }

  ${({ theme }) => theme?.mobile} {
    thead {
      th {
        font-size: 12px;
        padding: 8px 6px;
      }
    }
  }
`;

const TableCell = styled.td`
  padding: 12px 24px;
  font-size: 14px;
  vertical-align: middle;

  ${({ theme }) => theme?.mobile} {
    padding: 12px 6px;
    font-size: 12px;
  }
`;

const EmptyCell = styled.tr`
  width: 100%;
  color: ${({ theme }) => theme?.colorLine};
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme?.colorLineLight};

  td {
    font-size: 80px;
    padding: 32px 24px;
    font-family: ${({ theme }) => theme?.fontEuljiro10};
  }
`;

const Table: FC<TableProps> = ({ headers, children, loading }) => {
  return (
    <TableBody>
      <colgroup>
        {headers.map(({ span }, i) => (
          <col span={span} key={headers[i].column.toString()} />
        ))}
      </colgroup>
      <thead>
        <tr>
          {headers.map(({ column }) => {
            return <th key={column.toString()}>{column}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {Children.count(children) > 0 ? (
          Children.map(children, wrapper => {
            const ch = wrapper as React.ReactElement<{ children: React.ReactNode }>;
            return (
              <tr key={wrapper?.toLocaleString()}>
                {Children.map(ch.props.children, child => {
                  return <TableCell key={child?.toLocaleString()}>{child}</TableCell>;
                })}
              </tr>
            );
          })
        ) : (
          <EmptyCell>
            {loading ? (
              <td colSpan={100}>
                <CircleLoader color="brown" size="50px" />
              </td>
            ) : (
              <td colSpan={100}>텅</td>
            )}
          </EmptyCell>
        )}
      </tbody>
    </TableBody>
  );
};

export default Table;
