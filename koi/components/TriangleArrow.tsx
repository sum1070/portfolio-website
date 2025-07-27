import React from "react";

export const TriangleArrowDown = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button
      className="[animation:bounce_1.5s_infinite] cursor-pointer p-0 bg-transparent border-0 outline-none"
      onClick={onClick}
      aria-label="Scroll down"
    >
      <div
        style={{
          width: 0,
          height: 0,
          margin: "0 auto",
          borderLeft: "12px solid transparent",
          borderRight: "12px solid transparent",
          borderTop: "16px solid var(--color-nice-purple0)",
        }}
      ></div>
    </button>
  );
};

export const TriangleArrowUp = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button
      className="[animation:bounce_2s_infinite] cursor-pointer p-0 bg-transparent border-0 outline-none"
      onClick={onClick}
      aria-label="Scroll up"
    >
      <div
        style={{
          width: 0,
          height: 0,
          margin: "0 auto",
          borderLeft: "12px solid transparent",
          borderRight: "12px solid transparent",
          borderBottom: "16px solid var(--color-nice-purple0)",
        }}
      ></div>
    </button>
  );
};