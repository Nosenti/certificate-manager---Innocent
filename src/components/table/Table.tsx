import { ReactNode, useState } from 'react';
import './Table.css';
import { useNavigate } from 'react-router-dom';
import CogIcon from '../../../public/assets/cog.svg';

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
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleDropdownToggle = (index: number) => {
    setDropdownVisible(dropdownVisible === index ? null : index);
  };

  const handleEdit = (id: number) => {
    navigate(`/certificates/edit/${id}`);
  };
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
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>
                <div
                  className="cog-container"
                  onClick={() => handleDropdownToggle(rowIndex)}
                >
                  <CogIcon />
                  {dropdownVisible === rowIndex && (
                    <div className="dropdown-menu">
                      <button onClick={() => handleEdit(row.id!)}>Edit</button>
                      <button onClick={() => console.log('Delete Clicked')}>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </td>
              {columns.slice(1).map((column, colIndex) => (
                <td key={colIndex}>{row[column.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
