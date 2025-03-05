import React from "react";

interface NumberInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  placeholder = "",
  className = "",
  disabled = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // 숫자만 허용 (빈 문자열도 허용)
    if (/^\d*$/.test(inputValue)) {
      onChange(inputValue);
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={`border py-1.5 px-2 text-md1 rounded-md active:border-focus
      placeholder:text-dark-text_secondary 
      ${
        disabled
          ? "text-gray-500 bg-black_07 border-gray-2"
          : "focus:outline-none focus:border-focus bg-white border-border"
      }
       ${className}`}
      disabled={disabled}
    />
  );
};

export default NumberInput;
