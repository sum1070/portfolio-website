'use client';
import { preload } from "react-dom";
import { Hero, MouseTrail } from "@/components";
import { LINE_CIRCLE_IMAGE } from "@/components/decorations/shape/line-circle";
import useTrailStyle from "@/lib/hooks/useTrailStyle";

export default function Home() {
  // Preload the line-circle image so that it is ready when the Hero component mounts
  preload(LINE_CIRCLE_IMAGE, { as: "image", type: "image/webp" });
  const trailStyle = useTrailStyle();

  return (
    <>
      {trailStyle === "glow" && <MouseTrail />}
      {trailStyle !== "glow" && trailStyle !== "off" && <MouseTrail variant="pixel" shape={trailStyle} />}
      <Hero />
    </>
  );
}

