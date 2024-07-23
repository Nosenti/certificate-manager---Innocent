import { FC } from 'react';
import './Table.css';

interface TableColumn {
  Header: string;
  accessor: string;
}

interface TableProps {
  columns: TableColumn[];
  data: Record<string, any>[];
}

const Table: FC<TableProps> = ({ columns, data }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.Header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>{row[column.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
