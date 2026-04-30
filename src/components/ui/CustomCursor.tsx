"use client";

import { useEffect, useRef, useState } from "react";

const LERP = 0.12;
const GOLD = "#C9A96E";

export function CustomCursor() {
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);
  const [hover, setHover] = useState(false);
  const [isTouch, setIsTouch] = useState<boolean | null>(null);

  const targetX = useRef(0);
  const targetY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const rafId = useRef(0);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  useEffect(() => {
    if (isTouch !== false) return;

    const onMove = (e: MouseEvent) => {
      targetX.current = e.clientX;
      targetY.current = e.clientY;
      setCursorX(e.clientX);
      setCursorY(e.clientY);
      const under = document.elementFromPoint(e.clientX, e.clientY);
      setHover(!!under?.closest?.('[data-cursor="hover"]'));
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isTouch]);

  useEffect(() => {
    if (isTouch !== false) return;
    const tick = () => {
      ringX.current += (targetX.current - ringX.current) * LERP;
      ringY.current += (targetY.current - ringY.current) * LERP;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX.current}px, ${ringY.current}px, 0) translate(-50%, -50%)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [isTouch]);

  if (isTouch === null || isTouch) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 will-change-transform"
        style={{ zIndex: 9999 }}
        aria-hidden
      >
        <div
          className="relative"
          style={{
            width: 28,
            height: 28,
            border: `1px solid ${GOLD}`,
            borderRadius: "50%",
            transition: "transform 0.15s ease, opacity 0.15s ease",
            transform: hover ? "scale(2.5)" : "scale(1)",
            opacity: hover ? 0.4 : 1,
          }}
        >
          <div
            className="absolute"
            style={{
              width: 12,
              height: 1,
              top: "50%",
              left: -14,
              background: GOLD,
              transform: "translateY(-50%)",
            }}
            aria-hidden
          />
          <div
            className="absolute"
            style={{
              width: 12,
              height: 1,
              top: "50%",
              right: -14,
              background: GOLD,
              transform: "translateY(-50%)",
            }}
            aria-hidden
          />
          <div
            className="absolute"
            style={{
              width: 1,
              height: 12,
              left: "50%",
              top: -14,
              background: GOLD,
              transform: "translateX(-50%)",
            }}
            aria-hidden
          />
          <div
            className="absolute"
            style={{
              width: 1,
              height: 12,
              left: "50%",
              bottom: -14,
              background: GOLD,
              transform: "translateX(-50%)",
            }}
            aria-hidden
          />
        </div>
      </div>
      <div
        className="pointer-events-none fixed will-change-transform"
        style={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: GOLD,
          left: cursorX,
          top: cursorY,
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
        }}
        aria-hidden
      />
    </>
  );
}
