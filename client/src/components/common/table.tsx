import React, { FC, Children, ReactElement } from 'react';
import styled from 'lib/woowahan-components';

interface TableProps {
  headers: TableColumn[];
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
      padding: 16px 12px;
      font-size: 16px;
      font-weight: ${({ theme }) => theme?.weightBold};
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
      }
    }
  }
`;

const TableCell = styled.td`
  padding: 12px 24px;
  font-size: 16px;
  vertical-align: middle;

  ${({ theme }) => theme?.mobile} {
    padding: 12px 12px;
    font-size: 12px;
  }
`;

const EmptyCell = styled.td`
  width: 100%;
  color: ${({ theme }) => theme?.colorLine};
  font-size: 80px !important;
  padding: 32px 24px !important;
  font-family: ${({ theme }) => theme?.fontEuljiro10};
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme?.colorLineLight};
`;

const Table: FC<TableProps> = ({ headers, children }) => {
  return (
    <TableBody>
      <colgroup>
        {headers.map(({ span }, i) => (
          <col span={span} key={headers[i].column.toString()} />
        ))}
      </colgroup>
      <thead>
        {headers.map(({ column }) => {
          return <th key={column.toString()}>{column}</th>;
        })}
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
          <EmptyCell colspan="100">텅</EmptyCell>
        )}
      </tbody>
    </TableBody>
  );
};

export default Table;
