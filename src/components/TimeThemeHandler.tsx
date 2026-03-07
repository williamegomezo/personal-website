"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export function TimeThemeHandler() {
  const { setTheme } = useTheme();
  const lastPeriodRef = useRef<"day" | "night" | null>(null);

  useEffect(() => {
    const checkTime = () => {
      const hours = new Date().getHours();
      const isDaytime = hours >= 6 && hours < 18;
      const currentPeriod = isDaytime ? "day" : "night";
      const targetTheme = isDaytime ? "light" : "dark";

      // If it's the first run, or we just crossed a boundary (e.g., just turned 6 PM)
      if (lastPeriodRef.current !== currentPeriod) {
        // Only override if the user hasn't explicitly set a preference 
        // OR if this is the very first time we detect the period.
        // next-themes stores manual sets in localStorage. 
        // If theme is 'system' or undefined, we definitely should set it.
        // For a better experience, we'll force the transition when the boundary is crossed.
        setTheme(targetTheme);
        lastPeriodRef.current = currentPeriod;
      }
    };

    checkTime();
    
    const interval = setInterval(checkTime, 60 * 1000); // Check every minute for boundary precision
    return () => clearInterval(interval);
  }, [setTheme]);

  return null;
}
