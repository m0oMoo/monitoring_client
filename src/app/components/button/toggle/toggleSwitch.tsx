import React, { useState } from "react";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleSwitch: React.FC<SwitchProps> = ({ checked, onChange }) => {
  const handleToggle = () => {
    onChange(!checked);
  };

  return (
    <div
      onClick={handleToggle}
      className={`relative inline-flex items-center cursor-pointer ${
        checked ? "bg-navy-btn" : "bg-gray-1"
      } rounded-full w-11 h-6 transition-colors duration-200 ease-in-out`}
    >
      <span
        className={`${
          checked ? "translate-x-6" : "translate-x-1"
        } inline-block w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-200 ease-in-out`}
      />
      <span
        className={`absolute text-white text-xs font-medium left-1 top-1 ${
          checked ? "opacity-100" : "opacity-0"
        } transition-opacity duration-200 ease-in-out`}
      />
    </div>
  );
};

export default ToggleSwitch;
