import React from "react";

export const TriangleArrowDown = () => {
  return (
    <div
      className="[animation:bounce_1.5s_infinite]"
      style={{
        width: 0,
        height: 0,
        margin: "0 auto",
        borderLeft: "12px solid transparent",
        borderRight: "12px solid transparent",
        borderTop: "16px solid var(--color-nice-purple0)",
      }}
    ></div>
  );
};

export const TriangleArrowUp = () => {
  return (
    <div
      className="[animation:bounce_2s_infinite]"
      style={{
        width: 0,
        height: 0,
        margin: "0 auto",
        borderLeft: "12px solid transparent",
        borderRight: "12px solid transparent",
        borderBottom: "16px solid var(--color-nice-purple0)",
        animation: "bounce 2s infinite",
      }}
    ></div>
  );
};