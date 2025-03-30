import React from "react";

interface inputFieldProps {
  label?: string;
  type?: string;
  placeholder?: string;
  error?: string;
  register: any;
}

const InputField: React.FC<inputFieldProps> = ({
  label,
  type = "text",
  placeholder,
  error,
  register,
}) => {
  return (
    <div>
      <label>{label}</label>
      <input {...register} type={type} placeholder={placeholder} />
      {error && <p className="error">*{error}</p>}
    </div>
  );
};

export default InputField;
