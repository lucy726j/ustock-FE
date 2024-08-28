"use client";

import { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import styled from "styled-components";

const MotionH1 = styled(motion.h1)`
  font-size: 25px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

interface HyperTextProps {
  text: string;
  duration?: number;
  framerProps?: Variants;
  className?: string;
  animateOnLoad?: boolean;
}

const numbers = "0123456789".split(""); // 숫자만 사용

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export default function HyperText({
  text,
  duration = 800,
  framerProps = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 3 },
  },
  className,
  animateOnLoad = true,
}: HyperTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [trigger, setTrigger] = useState(false);
  const interations = useRef(0);
  const isFirstRender = useRef(true);

  const triggerAnimation = () => {
    interations.current = 0;
    setTrigger(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!animateOnLoad && isFirstRender.current) {
        clearInterval(interval);
        isFirstRender.current = false;
        return;
      }
      if (interations.current < text.length) {
        setDisplayText((t) =>
          t
            .split("")
            .map((l, i) =>
              l === " "
                ? l
                : i <= interations.current
                ? text[i]
                : numbers[getRandomInt(10)]
            )
            .join("")
        );
        interations.current = interations.current + 0.1;
      } else {
        setTrigger(false);
        clearInterval(interval);
      }
    }, duration / (text.length * 10));
    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [text, duration, trigger, animateOnLoad]);

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  return (
    <div
      className="overflow-hidden py-2 flex cursor-default scale-100"
      onMouseEnter={triggerAnimation}
    >
      <MotionH1 className={`font-mono ${className}`} {...framerProps}>
        {displayText}
      </MotionH1>
    </div>
  );
}
