import Image from "next/image";
import React from "react";
import active from "@/app/image/icon/checkbox.svg";
import inactive from "@/app/image/icon/checkbox_inactive.svg";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="hidden"
      />
      <div onClick={() => onChange(!checked)} className="cursor-pointer">
        <Image
          src={checked ? active : inactive}
          alt="checkbox"
          width={20}
          height={20}
        />
      </div>
      <label className="text-text">{label}</label>
    </div>
  );
};

export default Checkbox;
