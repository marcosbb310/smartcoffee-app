"use client";

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";
import { useEffect, useState } from "react";

// Define available themes
export const availableThemes = [
  "green",
  "purple",
  "blue",
  "red",
  "brown",
  "yellow",
] as const;
export type ThemeType = (typeof availableThemes)[number];

// Centralized color palettes
export const ZACKS_FAVORITES = [
  "#f11798",
  "#f68e5d",
  "#5c9ae0",
  "#72b155",
  "#ea566e",
  "#c26fcc",
  "#c48d63",
];

export const SUMMER_2025_COLORS = [
  "#fe610b",
  "#97ec37",
  "#ffcc5d",
  "#a7a95f",
  "#6a71f0",
  "#04b84f",
  "#ee7bab",
];

// Color utility functions
function darkenColor(color: string, percent: number): string {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) - amt;
  const G = ((num >> 8) & 0x00ff) - amt;
  const B = (num & 0x0000ff) - amt;
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
}

function getComplementaryColor(color: string): string {
  const num = parseInt(color.replace("#", ""), 16);
  const R = num >> 16;
  const G = (num >> 8) & 0x00ff;
  const B = num & 0x0000ff;
  return (
    "#" +
    (0x1000000 + (255 - R) * 0x10000 + (255 - G) * 0x100 + (255 - B))
      .toString(16)
      .slice(1)
  );
}

function getAnalogousColor(color: string): string {
  const num = parseInt(color.replace("#", ""), 16);
  let R = num >> 16;
  let G = (num >> 8) & 0x00ff;
  let B = num & 0x0000ff;

  // Shift hue by about 30 degrees (analogous color)
  // This creates a color that's closer to the original but still distinct
  const temp = R;
  R = Math.min(255, Math.max(0, Math.round(R * 0.8 + G * 0.2)));
  G = Math.min(255, Math.max(0, Math.round(G * 0.8 + B * 0.2)));
  B = Math.min(255, Math.max(0, Math.round(B * 0.8 + temp * 0.2)));

  return "#" + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

export const DEFAULT_COLOR = ZACKS_FAVORITES[1];

// Helper function to calculate all derived colors from a primary color
export function calculateDerivedColors(color: string) {
  const primaryColor = color;
  const secondaryColor = darkenColor(color, 20);
  const accentColor = darkenColor(color, 25);
  const chartColor = getAnalogousColor(accentColor);

  return {
    primary: primaryColor,
    secondary: secondaryColor,
    accent: accentColor,
    chart: chartColor,
  };
}

export function setColorVariables(color: string) {
  const root = document.documentElement;
  const primaryColor = color;
  const secondaryColor = darkenColor(color, 20);
  const accentColor = darkenColor(color, 25);
  const chartColor = getAnalogousColor(accentColor);

  root.style.setProperty("--color-primary", primaryColor);
  root.style.setProperty("--color-secondary", secondaryColor);
  root.style.setProperty("--color-accent", accentColor);
  root.style.setProperty("--color-chart", chartColor);
}

// Remove the synchronous theme setting to prevent hydration mismatches
// The theme will be set in the ThemeProvider component using useEffect

// Component to handle theme initialization
function ThemeInitializer() {
  useEffect(() => {
    // Apply saved theme colors on mount
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && savedTheme.startsWith("#")) {
      setColorVariables(savedTheme);
    } else {
      // Apply default colors if no theme is saved
      setColorVariables(DEFAULT_COLOR);
    }
  }, []);

  return null;
}

// Client-side wrapper to prevent hydration mismatches
function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme={DEFAULT_COLOR}
      enableSystem={false}
      storageKey="theme"
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <ClientThemeProvider>{children}</ClientThemeProvider>;
}

// Re-export useTheme from next-themes
export { useTheme } from "next-themes";
