'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CursorProps, TypewriterProps } from '@/lib/types';
import { animationTime } from '@/utils';

// ///////////////////// Cursor /////////////////////
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

// ///////////////////// Typewriter /////////////////////
export default function Typewriter({
  text = '',
  className = '',
  speed = animationTime.durationTypewriter,
  delay = animationTime.delayTypewriter,
  onComplete,
  onTypeComplete,
  showCursor = true,
  cursorBlinkSpeed = 500,
  enableDelete = true,
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

  const moveToNextSequence = () => {
    const nextIndex = sequenceIndex + 1;

    if (nextIndex < sequencesToType.length) {
      // move next
      setSequenceIndex(nextIndex);
      setCurrentIndex(0);
      setIsDeleting(false);
    } else if (loop) {
      // loop back to first sequence
      setSequenceIndex(0);
      setCurrentIndex(0);
      setIsDeleting(false);
      onComplete?.();
    } else {
      // All sequences completed
      onComplete?.();
    }
  };

  useEffect(() => {
    // delay before typing
    if (delay > 0 && !hasStarted) {
      const delayTimer = setTimeout(() => {
        setHasStarted(true);
      }, delay);
      return () => clearTimeout(delayTimer);
    } else if (delay === 0) {
      setHasStarted(true);
    }
  }, [delay, hasStarted]);

  // --- Typing ---
  const typing = () => {
    if (currentIndex >= currentText.length) { // completed checker
      if (onTypeComplete) {
        onTypeComplete(currentText);
      }
      typingComplete();
      return null;
    }

    return setTimeout(() => {
      setDisplayedText(prev => prev + currentText[currentIndex]); // type the next char
      setCurrentIndex(prev => prev + 1);
    }, speed);
  };

  // --- Typing finished ---
  const typingComplete = () => {
    if (currentSequence.pauses?.beforeDelete) {
      setIsPaused(true);
      setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, currentSequence.pauses?.beforeDelete);
    } else {
      setIsDeleting(true);
    }
  };

  // --- deleting ---
  const deleting = () => {
    const deleteAll = !currentSequence.deleteCount || currentSequence.deleteCount === 0;
    const targetLength = deleteAll ? 0 : currentText.length - (currentSequence.deleteCount || 0);

    if (displayedText.length <= targetLength) {
      deletingComplete();
      return null;
    }

    return setTimeout(() => {
      setDisplayedText(prev => prev.slice(0, -1)); // remove the last char
    }, actualDeleteSpeed);
  };

  const deletingComplete = () => {
    if (currentSequence.pauses?.afterDelete) {
      setIsPaused(true);
      setTimeout(() => {
        setIsPaused(false);
        moveToNextSequence();
      }, currentSequence.pauses?.afterDelete);
    } else {
      moveToNextSequence();
    }
  };

  useEffect(() => {
    if (!hasStarted || isPaused) return;

    let timer = null;

    if (!isDeleting) {
      timer = typing();
    } else if (enableDelete) {
      timer = deleting();
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [currentIndex, hasStarted, isDeleting, displayedText, currentText, isPaused, speed, actualDeleteSpeed]);



  // ///////////////////// Rendering /////////////////////
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0.01 }}
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
