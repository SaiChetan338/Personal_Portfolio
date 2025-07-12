import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ThemeToggleProps {
  initialTheme?: "dark" | "light";
  onThemeChange?: (theme: "dark" | "light") => void;
}

const ThemeToggle = ({
  initialTheme = "dark",
  onThemeChange,
}: ThemeToggleProps) => {
  const [theme, setTheme] = useState<"dark" | "light">(initialTheme);

  useEffect(() => {
    // Apply theme to document on mount and when theme changes
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");

    if (onThemeChange) {
      onThemeChange(theme);
    }
  }, [theme, onThemeChange]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="bg-background flex items-center justify-center p-2 rounded-full border border-border shadow-lg">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {theme === "dark" ? (
                  <Moon className="h-5 w-5 text-blue-400 filter drop-shadow-[0_0_3px_rgba(96,165,250,0.7)]" />
                ) : (
                  <Sun className="h-5 w-5 text-yellow-400 filter drop-shadow-[0_0_3px_rgba(250,204,21,0.7)]" />
                )}
              </motion.div>

              <Switch
                checked={theme === "light"}
                onCheckedChange={toggleTheme}
                className={`${
                  theme === "dark"
                    ? "bg-gray-800 data-[state=checked]:bg-blue-500"
                    : "bg-blue-100 data-[state=checked]:bg-blue-500"
                }`}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Switch to {theme === "dark" ? "light" : "dark"} mode</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ThemeToggle;
