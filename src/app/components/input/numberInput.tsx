import React from "react";

interface NumberInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  placeholder = "",
  className = "",
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
      placeholder:text-dark-text_secondary border-border
      focus:outline-none focus:border-focus bg-white ${className}`}
    />
  );
};

export default NumberInput;
