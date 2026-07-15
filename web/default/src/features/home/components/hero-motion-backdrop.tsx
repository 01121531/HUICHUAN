/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

export function HeroMotionBackdrop() {
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 45, damping: 24 });
  const smoothY = useSpring(pointerY, { stiffness: 45, damping: 24 });
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 800], [0, 150]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const onPointerMove = (event: PointerEvent) => {
      pointerX.set(event.clientX - window.innerWidth / 2);
      pointerY.set(event.clientY - window.innerHeight / 2);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [pointerX, pointerY, prefersReducedMotion]);

  const orbX = useTransform(smoothX, (value) => value * 0.12);
  const orbY = useTransform(smoothY, (value) => value * 0.1);
  const inverseX = useTransform(smoothX, (value) => value * -0.08);
  const inverseY = useTransform(smoothY, (value) => value * -0.06);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <motion.div
        className="landing-aurora landing-aurora-primary absolute top-[-22rem] left-1/2 -z-20 h-[54rem] w-[78rem] max-w-none -translate-x-1/2 rounded-full"
        style={prefersReducedMotion ? undefined : { x: orbX, y: parallaxY }}
      />
      <motion.div
        className="landing-aurora absolute top-24 left-[4%] -z-10 size-[24rem] rounded-full bg-indigo-500/10 blur-[90px] dark:bg-indigo-400/10"
        style={prefersReducedMotion ? undefined : { x: inverseX, y: inverseY }}
      />
      <motion.div
        className="landing-aurora absolute top-32 right-[2%] -z-10 size-[26rem] rounded-full bg-fuchsia-500/10 blur-[100px] dark:bg-fuchsia-400/10"
        style={prefersReducedMotion ? undefined : { x: orbX, y: orbY }}
      />

      <svg
        viewBox="0 0 1200 720"
        className="absolute top-0 left-1/2 -z-10 h-[720px] w-[1200px] max-w-none -translate-x-1/2 opacity-55"
        fill="none"
      >
        <defs>
          <linearGradient
            id="hero-orbit-gradient"
            x1="130"
            y1="110"
            x2="1070"
            y2="610"
          >
            <stop stopColor="#6366F1" stopOpacity="0" />
            <stop offset=".45" stopColor="#8B5CF6" stopOpacity=".42" />
            <stop offset=".72" stopColor="#D946EF" stopOpacity=".2" />
            <stop offset="1" stopColor="#D946EF" stopOpacity="0" />
          </linearGradient>
          <filter
            id="hero-orbit-glow"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
          >
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <ellipse
          className="landing-orbit-line"
          cx="600"
          cy="330"
          rx="470"
          ry="205"
          stroke="url(#hero-orbit-gradient)"
          strokeWidth="1.25"
        />
        <ellipse
          className="landing-orbit-line landing-orbit-line-reverse"
          cx="600"
          cy="330"
          rx="360"
          ry="270"
          stroke="url(#hero-orbit-gradient)"
          strokeWidth="1"
          transform="rotate(-17 600 330)"
        />
        <circle
          className="landing-orbit-signal"
          cx="176"
          cy="244"
          r="3.5"
          fill="#8B5CF6"
          filter="url(#hero-orbit-glow)"
        />
        <circle
          className="landing-orbit-signal landing-orbit-signal-delayed"
          cx="960"
          cy="464"
          r="3"
          fill="#D946EF"
          filter="url(#hero-orbit-glow)"
        />
      </svg>
    </div>
  );
}
