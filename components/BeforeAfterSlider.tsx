"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";

interface Props {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  label?: string;
  className?: string;
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Avant",
  afterAlt = "Après",
  label,
  className = "",
}: Props) {
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rangeId = `ba-range-${(label || beforeSrc).replace(/[^a-z0-9_-]/gi, "-")}`;

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    setPos((x / rect.width) * 100);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <figure className={`w-full ${className}`}>
      {label ? (
        <figcaption className="mb-2 text-sm font-medium text-neutral-700 text-center">
          {label}
        </figcaption>
      ) : null}
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-md bg-neutral-200 select-none touch-none cursor-ew-resize"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        role="img"
        aria-label={`${beforeAlt} / ${afterAlt}`}
      >
        <Image
          src={afterSrc}
          alt={afterAlt}
          fill
          className="object-cover pointer-events-none"
          sizes="(max-width: 768px) 100vw, 560px"
          draggable={false}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 560px"
            draggable={false}
          />
        </div>

        <span className="absolute top-3 left-3 z-10 rounded-full bg-black/55 text-white text-xs font-semibold px-2.5 py-1 backdrop-blur-sm pointer-events-none">
          Avant
        </span>
        <span className="absolute top-3 right-3 z-10 rounded-full bg-black/55 text-white text-xs font-semibold px-2.5 py-1 backdrop-blur-sm pointer-events-none">
          Après
        </span>

        <div
          className="absolute inset-y-0 z-20 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.35)] pointer-events-none"
          style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-lg border border-neutral-200 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M8 12H4M4 12L7 9M4 12L7 15"
                stroke="#404040"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 12H20M20 12L17 9M20 12L17 15"
                stroke="#404040"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <label className="sr-only" htmlFor={rangeId}>
          Curseur avant / après
        </label>
        <input
          id={rangeId}
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-x-3 bottom-3 z-30 w-[calc(100%-1.5rem)] opacity-0 h-10 cursor-ew-resize"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-label="Révéler avant ou après"
        />
      </div>
    </figure>
  );
}
