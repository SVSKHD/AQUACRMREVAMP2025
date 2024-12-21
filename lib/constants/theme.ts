// Theme configuration constants
export const THEME_CONFIG = {
  light: {
    background: "hsl(0 0% 100%)",
    foreground: "hsl(0 0% 3.9%)",
    primary: "hsl(0 0% 9%)",
    secondary: "hsl(0 0% 96.1%)",
    muted: "hsl(0 0% 96.1%)",
    accent: "hsl(0 0% 96.1%)",
  },
  dark: {
    background: "hsl(0 0% 3.9%)",
    foreground: "hsl(0 0% 98%)",
    primary: "hsl(0 0% 98%)",
    secondary: "hsl(0 0% 14.9%)",
    muted: "hsl(0 0% 14.9%)",
    accent: "hsl(0 0% 14.9%)",
  },
};

export const THEME_NAMES = {
  light: "light",
  dark: "dark",
  system: "system",
} as const;