import React from "react";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder = "",
  className = "",
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`border py-1.5 px-2 text-md1 rounded-md active:border-focus
      placeholder:text-dark-text_secondary border-border
      focus:outline-none focus:border-focus bg-white ${className}`}
    />
  );
};

export default TextInput;
