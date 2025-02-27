import React, { useState } from "react";
import { useChartOptions } from "@/app/context/chartOptionContext";
import { COLOR_PALETTES_COPY } from "@/app/data/color/colorPalettes";

const ColorPaletteSelector = () => {
  const { setOptions } = useChartOptions();
  const [selectedPalette, setSelectedPalette] = useState(
    COLOR_PALETTES_COPY[0]
  );

  const handlePaletteChange = (palette: {
    name: string;
    borderColor: string;
    backgroundColor: string;
  }) => {
    setSelectedPalette(palette);
    setOptions({
      borderColor: palette.borderColor,
      backgroundColor: palette.backgroundColor,
    });
  };

  return (
    <div className="relative">
      <select
        className="w-full p-2 border rounded-md bg-white"
        onChange={(e) => {
          const selected = COLOR_PALETTES_COPY.find(
            (p) => p.name === e.target.value
          );
          if (selected) handlePaletteChange(selected);
        }}
        value={selectedPalette.name}
      >
        {COLOR_PALETTES_COPY.map((palette, index) => (
          <option key={index} value={palette.name}>
            {palette.name}
          </option>
        ))}
      </select>

      {/* 팔레트 미리보기 */}
      <div className="flex gap-2 mt-2">
        {COLOR_PALETTES_COPY.map((palette, index) => (
          <button
            key={index}
            className="w-10 h-6 rounded border"
            style={{ backgroundColor: palette.borderColor }}
            onClick={() => handlePaletteChange(palette)}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPaletteSelector;
