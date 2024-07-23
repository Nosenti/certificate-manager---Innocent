import { FC } from "react";
import "./form-input.css";

interface FormInputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const FormInput: FC<FormInputProps> = ({ label, type, name, value, onChange }) => {
  return (
	<label className='form-input'>
      <span>{label}:</span>
      <input type={type} name={name} value={value} onChange={onChange} />
    </label>
  )
}

export default FormInput
