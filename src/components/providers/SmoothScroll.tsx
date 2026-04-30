"use client";

import { useEffect, useMemo, type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const easing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

function GsapScrollBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    gsap.registerPlugin(ScrollTrigger);
    gsap.ticker.lagSmoothing(0);
    const onScroll = () => {
      ScrollTrigger.update();
    };
    const offScroll = lenis.on("scroll", onScroll);
    const onTick: gsap.TickerCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    return () => {
      offScroll();
      gsap.ticker.remove(onTick);
    };
  }, [lenis]);

  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const options = useMemo(
    () => ({
      lerp: 0.075,
      duration: 1.2,
      easing,
      autoRaf: false,
    }),
    [],
  );

  return (
    <ReactLenis root options={options} autoRaf={false}>
      <GsapScrollBridge />
      {children}
    </ReactLenis>
  );
}
