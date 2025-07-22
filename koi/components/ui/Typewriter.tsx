'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TAnimation } from '@/lib/types';

interface TypewriterProps extends TAnimation {
  onComplete?: () => void;
  showCursor?: boolean;
  cursorBlinkSpeed?: number;
}

interface CursorProps {
  cursorChar?: string;
  blinkSpeed?: number;
  blinkEnabled?: boolean;
}

export function Cursor({
  cursorChar = '|',
  blinkSpeed = 60,
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
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.1 }}
    >
      {cursorChar}
    </motion.span>
  );
}

export default function Typewriter({
  text = '',
  className = '',
  speed = 150,
  delay = 300,
  onComplete,
  showCursor = true,
  cursorBlinkSpeed = 500,
  children
}: Readonly<TypewriterProps>) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typingDone, setTypingDone] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Use `children` if it's string, else use `text` prop
  const textToType = children && typeof children === 'string' ? children : text;

  useEffect(() => {
    // --- delay timer ---
    if (delay > 0 && !hasStarted) {
      const delayTimer = setTimeout(() => {
        setHasStarted(true);
      }, delay);
      return () => clearTimeout(delayTimer);
    } else if (delay === 0) { // delay completed
      setHasStarted(true);
    }
  }, [delay, hasStarted]);

  useEffect(() => {
    if (!hasStarted || currentIndex >= textToType.length || !textToType) {
      if (currentIndex !== 0 && hasStarted) {
        // --- typing done ---
        setTypingDone(true);
        onComplete?.();
      }
      return;
    }

    // append the next char after speed ms
    const timer = setTimeout(() => {
      // --- typing ---
      setDisplayedText((prev) => prev + textToType[currentIndex]);
      setCurrentIndex((prev) => prev + 1); // increment index
    }, speed);

    return () => clearTimeout(timer);
  }, [currentIndex, textToType, speed, hasStarted, onComplete]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: hasStarted ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {displayedText}
      {showCursor && (
        <Cursor blinkSpeed={cursorBlinkSpeed}  />
      )}
    </motion.span>
  );

}

