import { ReactNode } from 'react';
import './Table.css';
import { useNavigate } from 'react-router-dom';

interface TableColumn<T> {
  Header: string;
  accessor: keyof T;
  render?: (value: T[keyof T]) => ReactNode;
}

interface TableProps<T extends { id: number }> {
  columns: TableColumn<T>[];
  data: T[];
  caption?: string;
}

function Table<T extends { id: number }>({
  columns,
  data,
  caption,
}: TableProps<T>): JSX.Element {
  if (data.length === 0) {
    return <p>No data available</p>;
  }
  return (
    <div className="table-container">
      <table>
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={String(column.accessor)} scope="col">
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={`${row.id}-${String(column.accessor)}`}>
                  {column.render
                    ? column.render(row[column.accessor])
                    : String(row[column.accessor])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
