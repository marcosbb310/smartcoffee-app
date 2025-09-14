"use client";

import { Button } from "@/components/shadcn/button";
import {
  DEFAULT_COLOR,
  setColorVariables,
  SUMMER_2025_COLORS,
  ZACKS_FAVORITES,
} from "@/providers/ThemeProvider";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

// Function to generate a random hex color
const generateRandomColor = (): string => {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
};

export function ColorThemePicker() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [color, setColor] = useState(theme || DEFAULT_COLOR);

  // Only show the component after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update CSS variables when color changes
  useEffect(() => {
    if (!mounted) return;
    setColorVariables(color);
  }, [color, mounted]);

  if (!mounted) return null;

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    setTheme(newColor);
  };

  const handleRandomize = () => {
    const randomColor = generateRandomColor();
    handleColorChange(randomColor);
  };

  return (
    <div className="flex flex-row gap-8">
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-4">
          <HexColorPicker color={color} onChange={handleColorChange} />

          {/* Color input and randomize button */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-row flex-items-center gap-2">
              <div
                className="w-9 h-8 rounded-md border"
                style={{ backgroundColor: color }}
              />
              <input
                type="text"
                value={color}
                onChange={(e) => handleColorChange(e.target.value)}
                className="flex h-8 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <Button
              onClick={handleRandomize}
              variant="one"
              size="sm"
              className="w-full h-10 text-sm"
            >
              <span className="flex flex-row gap-2">Randomize</span>
              <span className="flex flex-row gap-2">🎲</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Zacks favorites */}
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-medium text-muted-foreground">
            Zack's Favorites
          </h4>
          <div className="flex flex-wrap gap-3 max-w-[280px]">
            {ZACKS_FAVORITES.map((preset) => (
              <button
                key={preset}
                className={`w-12 h-12 aspect-square rounded-xl shadow shadow-md border-2 transition focus:outline-none ${color === preset ? "border-black scale-110" : "border-transparent"}`}
                style={{ backgroundColor: preset }}
                onClick={() => handleColorChange(preset)}
                aria-label={`Select color ${preset}`}
              />
            ))}
          </div>
        </div>

        {/* Summer 2025 colors */}
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-medium text-muted-foreground">
            Summer 2025
          </h4>
          <div className="flex flex-wrap gap-3 max-w-[280px]">
            {SUMMER_2025_COLORS.map((preset) => (
              <button
                key={preset}
                className={`w-12 h-12 aspect-square rounded-xl shadow shadow-md border-2 transition focus:outline-none ${color === preset ? "border-black scale-110" : "border-transparent"}`}
                style={{ backgroundColor: preset }}
                onClick={() => handleColorChange(preset)}
                aria-label={`Select color ${preset}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
