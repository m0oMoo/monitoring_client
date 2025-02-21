import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
      colors: {
        dark: {
          bg: "#1E1E1E",
          bg_primary: "#252525",
          bg_secondary: "#3E3E3E",
          text: "#E0E0E0",
          text_primary: "#6B6B6B",
          text_secondary: "#A8A8A8",
          border: "#333333",
        },
        hover: "#F4F6FA",
        pressed: "#E8EBF1",
        border: "#D1D7E5",
        focus: "#8B9DA6 ",
        text: "#1F1F1F",
        text2: "#4B4B4B",
        text3: "#A0A0A0",
        ivory: {
          bg: "#fdfdf4",
          bg_sub: "#fffffa",
          bg_primary: "#fdfaf2",
          bg_secondary: "#fdfcf7",
          text: "#fffcf2",
          text_sub: "#fdf7e4",
          hover: "#fdfaf2",
          pressed: "#fff8e7",
        },
        navy: {
          bg: "#172b41",
          bg_primary: "#213953",
          btn: "#26415a",
          btn_hover: "#162f4b",
          border: "#1f3e5c",
          text: "#1d2e41",
          text_hover: "#2f4e72",
          text_disable: "#8296ad",
          hover: "#eef3f8",
          pressed: "#d0dbe8",
          disable: "#eaf0f5",
          selected_bg: "#e3e9f5",
        },
        gray: {
          9: "#111111",
          8: "#1F1F1F",
          7: "#3E3E3E",
          6: "#4B4B4B",
          5: "#5B5B5B",
          4: "#808080",
          3: "#A0A0A0",
          2: "#C0C0C0",
          1: "#E0E0E0",
          0: "#F5F5F5",
        },
        transparent: {
          gray: "rgba(128, 128, 128, 0.2)",
          green: "rgba(134, 207, 94, 0.2)",
          yellow: "rgba(435, 248, 15, 0.2)",
          blue: "rgba(99, 130, 246, 0.2)",
          pink: "rgba(244, 114, 182, 0.2)",
          red: "rgba(220, 52, 52, 0.2)",
          gray_hover: "rgba(128, 128, 128, 0.3)",
          green_hover: "rgba(134, 207, 94, 0.3)",
          yellow_hover: "rgba(435, 248, 15, 0.3)",
          blue_hover: "rgba(99, 130, 246, 0.3)",
          pink_hover: "rgba(244, 114, 182, 0.3)",
          red_hover: "rgba(220, 52, 52, 0.3)",
          gray_active: "rgba(128, 128, 128, 0.4)",
          green_active: "rgba(134, 207, 94, 0.4)",
          yellow_active: "rgba(435, 248, 15, 0.4)",
          blue_active: "rgba(99, 130, 246, 0.4)",
          pink_active: "rgba(244, 114, 182, 0.4)",
          red_active: "rgba(220, 52, 52, 0.4)",
        },
      },
      boxShadow: {
        default: "2px 2px 12px 0px rgba(0, 0, 0, 0.12)",
        border: "0px -3px 20px 0px rgba(0, 0, 0, 0.05)",
        modal: "0px -6px 30px 0px rgba(0, 0, 0, 0.08)",
      },
      screens: {
        sm: "360px",
        sm_md: "668px",
        md: "768px",
        lg: "1024px",
        lx: "1288px",
      },
      fontSize: {
        xs: "10px",
        sm: "12px",
        md: "14px",
        lg: "16px",
        xl: "18px",
        xxl: "21px",
        xxxl: "24px",
        // 제목
        title_lg: ["24px", { fontWeight: 600, lineHeight: "32px" }],
        title_md: ["21px", { fontWeight: 600, lineHeight: "28px" }],
        title_sm: ["18px", { fontWeight: 600, lineHeight: "27px" }],
        title_xs: ["16px", { fontWeight: 500, lineHeight: "24px" }],
        // 본문
        sm1: ["12px", { fontWeight: 400, lineHeight: "18px" }],
        sm2: ["12px", { fontWeight: 500, lineHeight: "18px" }],
        sm_bold: ["14px", { fontWeight: 600, lineHeight: "18px" }],
        md1: ["14px", { fontWeight: 400, lineHeight: "21px" }],
        md2: ["14px", { fontWeight: 500, lineHeight: "21px" }],
        bold_md: ["14px", { fontWeight: 600, lineHeight: "21px" }],
        lg1: ["16px", { fontWeight: 400, lineHeight: "24px" }],
        lg2: ["16px", { fontWeight: 500, lineHeight: "24px" }],
        bold_lg: ["16px", { fontWeight: 600, lineHeight: "24px" }],
        // 모바일
        mobile1: ["18px", { fontWeight: 600, lineHeight: "27px" }],
        mobile2: ["16px", { fontWeight: 600, lineHeight: "24px" }],
        mobile3: ["14px", { fontWeight: 400, lineHeight: "21px" }],
        mobile4: ["14px", { fontWeight: 600, lineHeight: "21px" }],
      },
    },
  },
  plugins: [
    function (pluginAPI: PluginAPI) {
      pluginAPI.addUtilities({
        ".custom-scrollbar": {
          "&::-webkit-scrollbar": {
            width: "6px",
            height: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#BFC4CE",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#ABB0BA",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#fff",
            borderRadius: "4px",
          },
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
      });
    },
  ],
} satisfies Config;
