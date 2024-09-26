import { FC } from 'react';
import './form-select.css';

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  error?: string;
  required?: boolean;
  options: Option[];
  defaultOptionLabel?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FormSelect: FC<FormSelectProps> = ({
  label,
  name,
  value,
  options,
  error,
  required = false,
  onChange,
  defaultOptionLabel = 'Select an option',
}) => {
  const id = `select-${name}`;

  return (
    <>
      <label htmlFor={id} className="form-input">
        <span>{label}:</span>
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          aria-invalid={error ? 'true' : 'false'}
        >
          <option value="">{defaultOptionLabel}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="form-error">
          {error && <p className="error">{error}</p>}
        </span>
      </label>
    </>
  );
};

export default FormSelect;
