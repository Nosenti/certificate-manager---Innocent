import { ReactNode } from 'react';
import './Table.css';
import React from 'react';
import { UUID } from 'crypto';

export interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T], row: T, index: number) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  caption?: string;
  className?: string;
  render?: (handle?: UUID) => React.ReactNode;
}

function Table<T extends { handle?: UUID }>({
  columns,
  data,
  caption,
  className,
  render,
}: TableProps<T>): JSX.Element {
  if (data.length === 0 && columns.length === 0) {
    return <p>No data available</p>;
  }

  console.log("Colomns::::: ", columns)

  return (
    <div className={`table-container ${className}`}>
      <table>
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            <th></th>
            {columns.map((column) => (
              <th key={String(column.accessor)} scope="col">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td className="no-data" colSpan={columns.length + 1}>
                No data
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={row.handle}>
                <td>{render ? render(row.handle) : null}</td>
                {columns.map((column) => (
                  <td key={`${row.handle}-${String(column.accessor)}`}>
                    {column.render
                      ? column.render(row[column.accessor], row, index)
                      : String(row[column.accessor])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}


export default Table;
