"use client";
import React, { useEffect, useState } from "react";
import { Spoiler } from "spoiled";

const ThemedSpoiler = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const update = () => setIsDark(root.classList.contains("dark"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <Spoiler
      theme={isDark ? "dark" : "light"}
      accentColor={isDark ? "white" : "#6b3d8b"}
    >
      {children}
    </Spoiler>
  );
};

export default ThemedSpoiler;
