import React, { useState, useRef } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import CogIcon from '../../../public/assets/cog.svg';
import { Certificate } from '../../../types/types';

interface ActionMenuProps {
  row: Certificate;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ row, onDelete,onEdit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  return (
    <div className="cog-container" onClick={() => setIsOpen(!isOpen)} ref={dropdownRef}>
      <CogIcon />
      {isOpen && (
        <div className="dropdown-menu">
          <button
            onClick={() => onEdit(row.id)}
          >Edit</button>
          <button
            onClick={() => onDelete(row.id)}
          >Delete</button>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
