import React, { useState, useRef } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import CogIcon from '../../../public/assets/cog.svg';
import { Certificate } from '../../../types/types';
import { useLanguage } from '../../context/LanguageContext';
import en from '../../locales/en.json';
import de from '../../locales/de.json';
import { Locales } from '../../../types/types';

const locales: Locales = { en, de };

interface ActionMenuProps {
  row: Certificate;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ row, onDelete, onEdit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));
   const { language } = useLanguage();

  const t = locales[language as keyof Locales];

  return (
    <div
      className="cog-container"
      onClick={() => setIsOpen(!isOpen)}
      ref={dropdownRef}
    >
      <CogIcon />
      {isOpen && (
        <div className="dropdown-menu">
          <button onClick={() => onEdit(row.id)}>{ t.edit }</button>
          <button onClick={() => onDelete(row.id)}>{ t.delete}</button>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
