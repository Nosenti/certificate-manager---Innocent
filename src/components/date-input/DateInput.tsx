import { FC } from 'react';

interface DateInputProps {
  label: string;
  name: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const DateInput: FC<DateInputProps> = ({
  label,
  name,
  value,
  error,
  onChange
}) => {
  return (
    <>
      <label className="form-input">
        <span>{label}:</span>
        <input type="date" name={name} value={value} onChange={onChange} />
        <span className="form-error">
          {error && <p className="error">{error}</p>}
        </span>
      </label>
    </>
  );
};

export default DateInput;
