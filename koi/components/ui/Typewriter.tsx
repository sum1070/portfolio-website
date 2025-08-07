'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TAnimation } from '@/lib/types';
import { animationTime } from "@/lib/utils";

// Define a sequence of text with typing/deleting options
interface TextSequence {
  text: string;
  deleteCount?: number; // How many characters to delete after typing (0 = delete all)
  pauseBeforeDelete?: number; // Pause before deleting (ms)
  pauseAfterDelete?: number; // Pause after deleting (ms)
}

interface TypewriterProps extends TAnimation {
  onComplete?: () => void;
  showCursor?: boolean;
  cursorBlinkSpeed?: number;
  deleteSpeed?: number;
  sequences?: TextSequence[];
  loop?: boolean;
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
  speed = animationTime.durationTypewriter,
  delay = animationTime.delayTypewriter,
  onComplete,
  showCursor = true,
  cursorBlinkSpeed = 500,
  deleteSpeed,
  sequences = [],
  loop = false,
  children
}: Readonly<TypewriterProps>) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const sequencesToType = sequences.length > 0
    ? sequences
    : [{ text: children && typeof children === 'string' ? children : text }];

  const currentSequence = sequencesToType[sequenceIndex];
  const currentText = currentSequence?.text || '';
  const actualDeleteSpeed = deleteSpeed || speed * 0.7

  // Initial delay before starting
  useEffect(() => {
    if (delay > 0 && !hasStarted) {
      const delayTimer = setTimeout(() => {
        setHasStarted(true);
      }, delay);
      return () => clearTimeout(delayTimer);
    } else if (delay === 0) {
      setHasStarted(true);
    }
  }, [delay, hasStarted]);

  useEffect(() => {
    if (!hasStarted || isPaused) return;

    if (!isDeleting) {
      // ---- Typing ------
      if (currentIndex >= currentText.length) {
        // start pause before deletion
        if (currentSequence.pauseBeforeDelete) {
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
            setIsDeleting(true);
          }, currentSequence.pauseBeforeDelete);
          return;
        }
        setIsDeleting(true);
        return;
      }

      // type the next character
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + currentText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else {
      // ---- Deleting ------
      const deleteAll = !currentSequence.deleteCount || currentSequence.deleteCount === 0;
      const targetLength = deleteAll ? 0 : currentText.length - (currentSequence.deleteCount || 0);

      if (displayedText.length <= targetLength) {
        // complete deletion
        if (currentSequence.pauseAfterDelete) {
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
            moveToNextSequence();
          }, currentSequence.pauseAfterDelete);
          return;
        }
        moveToNextSequence();
        return;
      }

      // del one character
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev.slice(0, -1));
      }, actualDeleteSpeed);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, hasStarted, isDeleting, displayedText, currentText, isPaused, speed, actualDeleteSpeed]);

  const moveToNextSequence = () => {
    const nextIndex = sequenceIndex + 1;

    if (nextIndex < sequencesToType.length) {
      // move to the next sequence
      setSequenceIndex(nextIndex);
      setCurrentIndex(0);
      setIsDeleting(false);
    } else if (loop) {
      // loop back to first sequence
      setSequenceIndex(0);
      setCurrentIndex(0);
      setIsDeleting(false);
    } else {
      // All sequences completed
      onComplete?.();
    }
  };

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: hasStarted ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {displayedText}
      {showCursor && (
        <Cursor blinkSpeed={cursorBlinkSpeed} />
      )}
    </motion.span>
  );
}

