"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import {
  motion,
  animate,
  AnimatePresence,
} from "framer-motion";

const TILE = 100;
const GAP = 0;
const CELL = TILE + GAP;
const DEPTH = 80;
const RADIUS = 10;
const INSET = 14;
const SIDE_COLOR = "#E8D0FF";
const BORDER_COLOR = "#C2C2C2";

function useGridSize() {
  const [size, setSize] = useState({ cols: 15, rows: 9 });
  useEffect(() => {
    function update() {
      const cols = Math.ceil(window.innerWidth / CELL) + 2;
      const rows = Math.ceil(window.innerHeight / CELL) + 2;
      setSize({ cols, rows });
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return size;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function CubeTile({
  col,
  row,
  centerCol,
  centerRow,
  isCenter,
  isExiting,
  isReady,
  reducedMotion,
  onEnter,
  counterRef,
}: {
  col: number;
  row: number;
  centerCol: number;
  centerRow: number;
  isCenter: boolean;
  isExiting: boolean;
  isReady: boolean;
  reducedMotion: boolean;
  onEnter: () => void;
  counterRef: React.RefObject<HTMLSpanElement | null>;
}) {
  const dx = col - centerCol;
  const dy = row - centerRow;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx);

  const exitX = Math.cos(angle) * distance * 180;
  const exitY = Math.sin(angle) * distance * 180;
  const exitDelay = isCenter ? 0 : distance * 0.04;

  const waveDelay = ((col * 1.3 + row * 2.1) % 6) * 0.6;
  const waveDuration = 2.5 + ((col * 3 + row * 7) % 3) * 0.5;

  return (
    <motion.div
      initial={{ scale: 0.6 }}
      animate={
        isExiting
          ? {
              x: reducedMotion ? 0 : exitX,
              y: reducedMotion ? 0 : exitY,
              scale: reducedMotion ? 1 : 0.4,
            }
          : { scale: 1, x: 0, y: 0 }
      }
      transition={
        isExiting
          ? { duration: 0.5, delay: reducedMotion ? 0 : exitDelay, ease: "easeIn" }
          : { duration: 0.3, delay: Math.min(distance * 0.02, 0.6), ease: "easeOut" }
      }
      onClick={isCenter ? onEnter : undefined}
      style={{
        width: TILE,
        height: TILE,
        perspective: 800,
        transformStyle: "preserve-3d",
        cursor: isCenter && isReady ? "pointer" : "default",
      }}
    >
      {/* Inner wrapper — wave pop animation (translateZ only, no tilt) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transformStyle: "preserve-3d",
          transform: isCenter ? `translateZ(${DEPTH}px)` : undefined,
          animation:
            !isCenter && !isExiting && !reducedMotion
              ? `keyPress ${waveDuration}s ease-in-out ${waveDelay}s infinite normal backwards`
              : undefined,
        }}
      >
        {/* BACK FACE — lavender base, fills the full tile, always visible behind the front face */}
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: 0,
          background: isCenter ? "#5b21b6" : SIDE_COLOR,
          transform: "translateZ(0)",
        }} />

        {/* FRONT FACE — inset so the lavender back face shows as a border on all sides */}
        <div
          style={{
            position: "absolute",
            inset: INSET,
            borderRadius: RADIUS,
            background: isCenter ? "#7c3aed" : "white",
            border: `1px solid ${BORDER_COLOR}`,
            transform: `translateZ(${DEPTH}px)`,
            backfaceVisibility: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isCenter && (
            <AnimatePresence mode="wait">
              {!isReady ? (
                <motion.span
                  key="counter"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ color: "white", fontWeight: 700, fontSize: 22, fontVariantNumeric: "tabular-nums" }}
                >
                  <span ref={counterRef}>0</span>
                </motion.span>
              ) : (
                <motion.span
                  key="enter"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ color: "white", fontWeight: 600, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", textAlign: "center", lineHeight: 1.6 }}
                >
                  Click<br />to<br />enter
                </motion.span>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function CubeGridLanding({
  onEnter,
}: {
  onEnter: () => void;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const { cols, rows } = useGridSize();
  const centerCol = Math.floor(cols / 2);
  const centerRow = Math.floor(rows / 2);
  const [isReady, setIsReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reducedMotion) {
      setIsReady(true);
      return;
    }
    const controls = animate(0, 100, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => {
        if (counterRef.current) {
          counterRef.current.textContent = String(Math.round(v));
        }
      },
      onComplete: () => setIsReady(true),
    });
    return () => controls.stop();
  }, [reducedMotion]);

  const handleEnter = useCallback(() => {
    if (!isReady || isExiting) return;
    setIsExiting(true);
    const timeout = reducedMotion ? 400 : 900;
    setTimeout(onEnter, timeout);
  }, [isReady, isExiting, onEnter, reducedMotion]);

  const cubes = useMemo(() => {
    const list: { col: number; row: number; isCenter: boolean }[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        list.push({
          col: c,
          row: r,
          isCenter: c === centerCol && r === centerRow,
        });
      }
    }
    return list;
  }, [cols, rows, centerCol, centerRow]);

  const gridWidth = cols * CELL - GAP;
  const gridHeight = rows * CELL - GAP;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: "var(--background)" }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <style>{`
        @keyframes keyPress {
          0%, 100% { transform: translateZ(0px); }
          35%       { transform: translateZ(${DEPTH}px); }
          65%       { transform: translateZ(${DEPTH}px); }
        }
      `}</style>

      <div
        style={{
          width: gridWidth,
          height: gridHeight,
          position: "relative",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, ${TILE}px)`,
            gap: GAP,
            transformStyle: "preserve-3d",
          }}
        >
          {cubes.map(({ col, row, isCenter }) => (
            <CubeTile
              key={`${col}-${row}`}
              col={col}
              row={row}
              centerCol={centerCol}
              centerRow={centerRow}
              isCenter={isCenter}
              isExiting={isExiting}
              isReady={isReady}
              reducedMotion={reducedMotion}
              onEnter={handleEnter}
              counterRef={counterRef}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
