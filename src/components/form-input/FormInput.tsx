import { FC } from 'react';
import './form-input.css';

interface FormInputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const FormInput: FC<FormInputProps> = ({
  label,
  type,
  name,
  value,
  error,
  onChange,
}) => {
  return (
    <>
      <label className="form-input">
        <span>{label}:</span>
        <input type={type} name={name} value={value} onChange={onChange} />
        <span className="form-error">
          {error && <p className="error">{error}</p>}
        </span>
      </label>
    </>
  );
};

export default FormInput;
