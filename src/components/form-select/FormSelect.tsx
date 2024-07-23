import { FC } from 'react';
import "./form-select.css"

interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  options: { value: string, label: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FormSelect: FC<FormSelectProps> = ({ label, name, value, options, onChange }) => {
  return (
    <label className='form-input'>
      <span>{label}:</span>
      <select name={name} value={value} onChange={onChange}>
        <option value="">Select type</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
};

export default FormSelect;
