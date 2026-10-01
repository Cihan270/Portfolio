"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cursor-controlled dry-brush scratch reveal.
 *
 * The top image is painted on a canvas; brush stamps are removed from it with
 * `destination-out`, so the bottom image (a plain <img> behind the canvas)
 * shows through. Both use the same cover-fit maths, so they stay aligned.
 *
 * - Nothing is revealed until the pointer actually moves over the band.
 * - Stamps are placed along the pointer path and overlap heavily, so a fast
 *   movement still draws one continuous stroke.
 * - A stamp does not fade: it physically shrinks and disappears after 2.7s.
 *   The mask is rebuilt every frame, so nothing is permanently scratched away.
 * - With reduced motion the top image is simply shown, with no interaction.
 */

interface Stamp {
  x: number;
  y: number;
  r: number;
  angle: number;
  born: number;
  seed: number;
}

const LIFETIME = 2.7; // seconds
const MAX_STAMPS = 320;
const BRUSH_FRACTION = 0.18; // of the smaller canvas dimension
const SPACING = 0.09; // of the brush radius
const EASE = 0.17;

/** Smallest variant that still covers the needed pixel width. */
function pickSource(base: string, widths: readonly number[], needed: number) {
  const width = widths.find((w) => w >= needed) ?? widths[widths.length - 1];
  return `${base}-${width}.webp`;
}

const srcSet = (base: string, widths: readonly number[]) =>
  widths.map((w) => `${base}-${w}.webp ${w}w`).join(", ");

export function ScratchReveal({
  top,
  bottom,
  widths,
  alt,
  label,
  className = "",
  children,
}: {
  /** Path without the width suffix, e.g. "/images/hero-plain". */
  top: string;
  bottom: string;
  widths: readonly number[];
  alt: string;
  label?: string;
  className?: string;
  /** Overlay content. It does not block the scratch, except on its buttons. */
  children?: React.ReactNode;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [hint, setHint] = useState(true);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const mask = document.createElement("canvas");
    const mctx = mask.getContext("2d");
    if (!mctx) return;

    const image = new Image();
    image.decoding = "async";
    const dprNow = Math.min(window.devicePixelRatio || 1, 2);
    const topSrc = pickSource(top, widths, wrap.getBoundingClientRect().width * dprNow);

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let loaded = false;
    // React runs effects twice in development. Without this guard the first,
    // discarded instance keeps its own animation loop running and paints the
    // untouched top image over the live one.
    let cancelled = false;

    const stamps: Stamp[] = [];
    let sx = 0; // smoothed follower
    let sy = 0;
    let tx = 0; // pointer target
    let ty = 0;
    let lastStampX = 0;
    let lastStampY = 0;
    let inside = false;
    let started = false;
    let lastTime = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = wrap.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      mask.width = canvas.width;
      mask.height = canvas.height;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    /** Same crop as CSS object-fit: cover with object-position: center. */
    const drawCover = (target: CanvasRenderingContext2D) => {
      const scale = Math.max(width / image.width, height / image.height);
      const w = image.width * scale;
      const h = image.height * scale;
      target.drawImage(image, (width - w) / 2, (height - h) / 2, w, h);
    };

    const brushRadius = () => Math.min(width, height) * BRUSH_FRACTION;

    /**
     * Procedural dry-brush outline: several frequencies of radius modulation,
     * drawn as a closed Catmull-Rom curve so the edge is organic, not polygonal.
     */
    const brushPath = (
      target: CanvasRenderingContext2D,
      x: number,
      y: number,
      r: number,
      angle: number,
      seed: number,
      t: number,
    ) => {
      const samples = r > 40 ? 48 : 30;
      const pts: Array<[number, number]> = [];
      const stretch = 1.16;
      const squash = 0.86;

      for (let i = 0; i < samples; i++) {
        const a = (i / samples) * Math.PI * 2;
        const radius =
          r *
          (1 +
            0.085 * Math.sin(3 * a + t + seed) +
            0.048 * Math.sin(5 * a - t * 1.15 + seed * 2.1) +
            0.022 * Math.sin(9 * a + t * 0.6 + seed * 3.7) +
            0.03 * Math.sin(13 * a + seed * 5.3) +
            0.018 * Math.sin(21 * a - seed * 1.7));
        // local frame: stretched along the direction of travel, then rotated
        const lx = Math.cos(a) * radius * stretch;
        const ly = Math.sin(a) * radius * squash;
        pts.push([
          x + lx * Math.cos(angle) - ly * Math.sin(angle),
          y + lx * Math.sin(angle) + ly * Math.cos(angle),
        ]);
      }

      target.beginPath();
      target.moveTo(pts[0][0], pts[0][1]);
      for (let i = 0; i < pts.length; i++) {
        const p0 = pts[(i - 1 + pts.length) % pts.length];
        const p1 = pts[i];
        const p2 = pts[(i + 1) % pts.length];
        const p3 = pts[(i + 2) % pts.length];
        // Catmull-Rom converted to a cubic Bézier segment
        target.bezierCurveTo(
          p1[0] + (p2[0] - p0[0]) / 6,
          p1[1] + (p2[1] - p0[1]) / 6,
          p2[0] - (p3[0] - p1[0]) / 6,
          p2[1] - (p3[1] - p1[1]) / 6,
          p2[0],
          p2[1],
        );
      }
      target.closePath();
    };

    /** Small torn gaps left behind by a dry brush. Never circles. */
    const holePath = (
      target: CanvasRenderingContext2D,
      x: number,
      y: number,
      r: number,
      angle: number,
      seed: number,
    ) => {
      const samples = 14;
      const pts: Array<[number, number]> = [];
      for (let i = 0; i < samples; i++) {
        const a = (i / samples) * Math.PI * 2;
        const radius = r * (1 + 0.35 * Math.sin(3 * a + seed * 2.4) + 0.2 * Math.sin(5 * a - seed));
        const lx = Math.cos(a) * radius * 2.1;
        const ly = Math.sin(a) * radius * 0.55;
        pts.push([
          x + lx * Math.cos(angle) - ly * Math.sin(angle),
          y + lx * Math.sin(angle) + ly * Math.cos(angle),
        ]);
      }
      target.beginPath();
      target.moveTo(pts[0][0], pts[0][1]);
      for (let i = 0; i < pts.length; i++) {
        const p0 = pts[(i - 1 + pts.length) % pts.length];
        const p1 = pts[i];
        const p2 = pts[(i + 1) % pts.length];
        const p3 = pts[(i + 2) % pts.length];
        target.bezierCurveTo(
          p1[0] + (p2[0] - p0[0]) / 6,
          p1[1] + (p2[1] - p0[1]) / 6,
          p2[0] - (p3[0] - p1[0]) / 6,
          p2[1] - (p3[1] - p1[1]) / 6,
          p2[0],
          p2[1],
        );
      }
      target.closePath();
    };

    const addStamps = (now: number) => {
      const r = brushRadius();
      const step = r * SPACING;
      let dx = sx - lastStampX;
      let dy = sy - lastStampY;
      let dist = Math.hypot(dx, dy);
      if (dist < step) return;

      const angle = Math.atan2(dy, dx);
      while (dist >= step) {
        lastStampX += Math.cos(angle) * step;
        lastStampY += Math.sin(angle) * step;
        stamps.push({
          x: lastStampX,
          y: lastStampY,
          r: r * (0.9 + Math.random() * 0.2),
          angle,
          born: now,
          seed: Math.random() * 100,
        });
        dx = sx - lastStampX;
        dy = sy - lastStampY;
        dist = Math.hypot(dx, dy);
      }
      if (stamps.length > MAX_STAMPS) stamps.splice(0, stamps.length - MAX_STAMPS);
    };

    const render = (now: number) => {
      if (cancelled) return;
      const t = now / 1000;
      ctx.clearRect(0, 0, width, height);
      drawCover(ctx);

      // Rebuild the mask from the stamps that are still alive.
      mctx.clearRect(0, 0, width, height);
      mctx.globalCompositeOperation = "source-over";
      mctx.fillStyle = "#000";

      let alive = 0;
      for (const s of stamps) {
        const age = t - s.born;
        const life = Math.max(0, 1 - age / LIFETIME);
        if (life <= 0) continue;
        const r = s.r * Math.pow(life, 0.85);
        if (r < 1.5) continue;
        alive++;
        brushPath(mctx, s.x, s.y, r, s.angle, s.seed, t);
        mctx.fill();
      }

      // Punch dry-brush gaps into the removal mask.
      mctx.globalCompositeOperation = "destination-out";
      const recent = stamps.slice(-60);
      for (const s of recent) {
        if (s.seed % 3 > 1) continue;
        const age = t - s.born;
        const life = Math.max(0, 1 - age / LIFETIME);
        if (life < 0.4) continue;
        const r = s.r * Math.pow(life, 0.85);
        holePath(
          mctx,
          s.x + Math.cos(s.seed) * r * 0.35,
          s.y + Math.sin(s.seed * 1.7) * r * 0.3,
          r * 0.1,
          s.angle,
          s.seed,
        );
        mctx.fill();
      }
      mctx.globalCompositeOperation = "source-over";

      // Remove the masked area from the top image.
      ctx.globalCompositeOperation = "destination-out";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(mask, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "source-over";

      if (stamps.length && alive === 0 && !inside) stamps.length = 0;
    };

    const frame = (time: number) => {
      const now = time / 1000;
      const dt = lastTime ? Math.min(now - lastTime, 0.05) : 1 / 60;
      lastTime = now;

      if (inside) {
        const k = 1 - Math.pow(1 - EASE, dt * 60);
        sx += (tx - sx) * k;
        sy += (ty - sy) * k;
        addStamps(now);
      }
      render(time);
      raf = requestAnimationFrame(frame);
    };

    const pointerPos = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onEnter = (e: PointerEvent) => {
      const { x, y } = pointerPos(e);
      // Snap, so no stroke connects from where the pointer was before.
      sx = tx = lastStampX = x;
      sy = ty = lastStampY = y;
      inside = true;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch" && !e.buttons && !started) return;
      const { x, y } = pointerPos(e);
      if (!inside) {
        sx = lastStampX = x;
        sy = lastStampY = y;
        inside = true;
      }
      tx = x;
      ty = y;
      if (!started) {
        started = true;
        setHint(false);
      }
    };

    const onLeave = () => {
      inside = false;
    };

    image.onload = () => {
      if (cancelled) return;
      loaded = true;
      resize();
      render(performance.now());
      setReady(true);
      if (!reduced) raf = requestAnimationFrame(frame);
    };
    image.src = topSrc;

    const observer = new ResizeObserver(() => {
      if (!loaded) return;
      resize();
      stamps.length = 0;
      render(performance.now());
    });
    observer.observe(wrap);

    if (!reduced) {
      canvas.addEventListener("pointerenter", onEnter);
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerdown", onMove);
      canvas.addEventListener("pointerleave", onLeave);
      canvas.addEventListener("pointercancel", onLeave);
    }

    return () => {
      cancelled = true;
      image.onload = null;
      observer.disconnect();
      canvas.removeEventListener("pointerenter", onEnter);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointercancel", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [top, widths]);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden bg-paper-2 ${className}`}>
      {/* Bottom image: same cover crop, revealed where the top image is scratched away */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${bottom}-${widths[widths.length - 1]}.webp`}
        srcSet={srcSet(bottom, widths)}
        sizes="100vw"
        alt={alt}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <canvas
        ref={canvasRef}
        aria-hidden
        className={`absolute inset-0 h-full w-full touch-pan-y transition-opacity duration-300 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />
      {hint && (
        <p className="pointer-events-none absolute right-4 bottom-4 hidden text-[0.65rem] tracking-[0.08em] text-ink/50 uppercase [@media(pointer:fine)]:block sm:right-6 sm:bottom-6">
          Move your cursor across
        </p>
      )}
      {children}
      {label && (
        <p className="pointer-events-none absolute bottom-4 left-4 text-[0.65rem] tracking-[0.08em] text-ink/45 uppercase sm:bottom-6 sm:left-6">
          {label}
        </p>
      )}
    </div>
  );
}
