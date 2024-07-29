import { ReactNode } from 'react';
import './Table.css';
import React from 'react';

export interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  caption?: string;
  className?: string;
  render?: (id?: number) => React.ReactNode;
}

function Table<T extends { id?: number }>({
  columns,
  data,
  caption,
  className,
  render,
}: TableProps<T>): JSX.Element {
  if (data.length === 0 && columns.length === 0) {
    return <p>No data available</p>;
  }

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
            data.map((row) => (
              <tr key={row.id}>
                <td>{render ? render(row.id) : null}</td>
                {columns.map((column) => (
                  <td key={`${row.id}-${String(column.accessor)}`}>
                    {column.render
                      ? column.render(row[column.accessor], row)
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
