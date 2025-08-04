import { sounds } from '@/lib/utils';
import React, { useState } from 'react';
import useSound from 'use-sound';

export const TriangleArrowDown = ({ onClick, bounce = true }: { onClick?: () => void, bounce?: boolean }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [glimmer] = useSound(sounds.glimmer, { volume: 0.5 });
  const [sparkle] = useSound(sounds.sparkle, { volume: 0.5 });

  const handleClick = () => {
    setIsClicked(true);
    sparkle();

    if (onClick) { onClick(); }

    setTimeout(() => {
      setIsClicked(false);
    }, 300);
  };

  return (
    <button
      className={`${bounce ? "[animation:bounce_1.5s_infinite]" : ""} 
        cursor-pointer p-0 bg-transparent border-0 outline-none
        transition-transform hover:scale-110 duration-200`}
      onClick={handleClick}
      onMouseEnter={() => {
        setIsHovering(true);
        glimmer();
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}
      aria-label="Scroll down"
    >
      <div
        style={{
          width: 0,
          height: 0,
          margin: "0 auto",
          borderLeft: "12px solid transparent",
          borderRight: "12px solid transparent",
          borderTop: `16px solid ${isHovering ? 'var(--color-nice-purple1)' : 'var(--color-nice-purple0)'}`,
          transition: 'border-top-color 0.2s ease',
        }}
      ></div>
    </button>
  );
};

export const TriangleArrowUp = ({ onClick, bounce = true }: { onClick?: () => void, bounce?: boolean }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [tinkle] = useSound(sounds.tinkle, { volume: 0.5 });
  const [sparkle] = useSound(sounds.sparkle, { volume: 0.5 });

  const handleClick = () => {
    setIsClicked(true);
    tinkle();

    if (onClick) {
      onClick();
    }

    setTimeout(() => {
      setIsClicked(false);
    }, 300);
  };

  return (
    <button
      className={`${bounce ? "[animation:bounce_2s_infinite]" : ""} 
        cursor-pointer p-0 bg-transparent border-0 outline-none
        transition-transform hover:scale-110 duration-200`}
      onClick={handleClick}
      onMouseEnter={() => {
        setIsHovering(true);
        sparkle();
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}
      aria-label="Scroll up"
    >
      <div
        style={{
          width: 0,
          height: 0,
          margin: "0 auto",
          borderLeft: "12px solid transparent",
          borderRight: "12px solid transparent",
          borderBottom: `16px solid ${isHovering ? 'var(--color-nice-purple1)' : 'var(--color-nice-purple0)'}`,
          transition: 'border-bottom-color 0.2s ease',
        }}
      ></div>
    </button>
  );
};
