import React from "react";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder = "",
  className = "",
  disabled = false,
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`border py-1.5 px-2 text-md1 rounded-md
      placeholder:text-dark-text_secondary
      ${
        disabled
          ? "text-gray-500 bg-black_07 border-gray-2"
          : "focus:outline-none focus:border-focus bg-white border-border"
      } ${className}`}
      disabled={disabled}
    />
  );
};

export default TextInput;
