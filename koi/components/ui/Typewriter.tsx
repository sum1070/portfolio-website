'use client';

import React, { useState, useEffect } from 'react';


interface TypewriterProps {
  text?: string;
  className?: string;
  speed?: number;
  onComplete?: () => void;
  showCursor?: boolean;
  cursorBlinkSpeed?: number
  children?: React.ReactNode // <T> children </T>
}

interface CursorProps {
    cursorChar?: string;
    blinkSpeed?: number;
    blinkEnabled?: boolean;
}

export function Cursor({
    cursorChar = '|',
    blinkSpeed = 500,
    blinkEnabled = true,
}: Readonly<CursorProps>) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (!blinkEnabled) {
            setVisible(true);
            return;
        }

        setVisible(true);
        const timer = setInterval(() => {
            setVisible((visible) => !visible);
        }, blinkSpeed);

        return () => clearInterval(timer);
    }, [blinkSpeed, blinkEnabled]);

    return (
        <span className={`inline-block transition-opacity duration-100 ${visible ? 'opacity-100' : 'opacity-0'}`}>
            {cursorChar}
        </span>
    );
}

export default function Typewriter({
  text = '',
  className = '',
  speed = 100,
  onComplete,
  showCursor = true,
  cursorBlinkSpeed = 500,
  children
}: Readonly<TypewriterProps>) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typingDone, setTypingDone] = useState(false);

  // Use `children` if it's string, else use `text` prop
  const textToType = children && typeof children === 'string' ? children : text;
  useEffect(() => {
    if (currentIndex >= textToType.length || !textToType) {
      if (currentIndex !== 0) {
        setTypingDone(true);
        onComplete?.();
      }
      return;
    }

    // append the next char after speed ms
    const timer = setTimeout(() => {
      setDisplayedText((prev) => prev + textToType[currentIndex]);
      setCurrentIndex((prev) => prev + 1); // increment index
    }, speed);

    return () => clearTimeout(timer);
  }, [currentIndex, textToType, speed]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && (
        <Cursor blinkSpeed={cursorBlinkSpeed} blinkEnabled={typingDone}/>
      )}
    </span>
  );

}

