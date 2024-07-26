import { FC } from 'react';
import './form-input.css';

interface TextInputProps {
  label: string;
  name: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const TextInput: FC<TextInputProps> = ({
  label,
  name,
  value,
  error,
  onChange,
}) => {
  return (
    <>
      <label className="form-input">
        <span>{label}:</span>
        <input type="text" name={name} value={value} onChange={onChange} />
        <span className="form-error">
          {error && <p className="error">{error}</p>}
        </span>
      </label>
    </>
  );
};

export default TextInput;
