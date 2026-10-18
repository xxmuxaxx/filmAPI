import type { ThemeConfig } from "antd";

export const filmTheme: ThemeConfig = {
  token: {
    colorPrimary: "#806b10",
    colorPrimaryHover: "#6b590d",
    colorPrimaryActive: "#574809",
    colorInfo: "#806b10",
    colorLink: "#806b10",
    colorLinkHover: "#6b590d",
    colorLinkActive: "#574809",
    colorText: "#080808",
    colorTextSecondary: "#62666b",
    colorBgLayout: "#f3f5f6",
    colorBorder: "#e1e3e5",
    colorError: "#b43232",
    colorSuccess: "#23714a",
    fontFamily: "Roboto, sans-serif",
    borderRadius: 4,
    controlHeight: 44,
  },
  components: {
    Button: { fontWeight: 700, primaryShadow: "none", defaultShadow: "none" },
    Form: {
      labelColor: "#080808",
      labelFontSize: 14,
      verticalLabelPadding: "0 0 6px",
      itemMarginBottom: 20,
    },
    Input: {
      paddingInline: 14,
      activeShadow: "0 0 0 2px rgba(163, 138, 23, .14)",
    },
    Modal: { padding: 28, titleFontSize: 26, titleLineHeight: 1.3 },
    Pagination: {
      itemActiveBg: "#806b10",
      itemActiveColor: "#fff",
      itemActiveColorHover: "#fff",
      itemSize: 36,
    },
  },
};
