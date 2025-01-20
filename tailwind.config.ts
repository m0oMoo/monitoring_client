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
      colors: {
        dark: {
          bg: "#1E1E1E",
          bg_secondary: "#252525",
          text: "#E0E0E0",
          text_secondary: "#A8A8A8",
          border: "#333333",
        },
        gray: {
          900: "#111111",
          800: "#1F1F1F",
          700: "#2E2E2E",
          600: "#4B4B4B",
          500: "#6B6B6B",
          400: "#A0A0A0",
          300: "#C0C0C0",
          200: "#E0E0E0",
          100: "#F5F5F5",
        },
        primary: "#3B82F6",
        secondary: "#6366F1",
        accent: "#F472B6",
        error: "#EF4444",
        success: "#22C55E",
        warning: "#F59E0B",
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
        text_sm: ["12px", { fontWeight: 400, lineHeight: "18px" }],
        text_md: ["14px", { fontWeight: 400, lineHeight: "21px" }],
        text_lg: ["16px", { fontWeight: 500, lineHeight: "24px" }],
        text_bold: ["14px", { fontWeight: 600, lineHeight: "21px" }],
        // 모바일
        mobile_title_lg: ["18px", { fontWeight: 600, lineHeight: "27px" }],
        mobile_title_md: ["16px", { fontWeight: 600, lineHeight: "24px" }],
        mobile_text_md: ["14px", { fontWeight: 400, lineHeight: "21px" }],
        mobile_text_bold: ["14px", { fontWeight: 600, lineHeight: "21px" }],
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
