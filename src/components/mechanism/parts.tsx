/**
 * Static parts of the hero mechanism drawing. Moving parts receive a `ref`
 * (React 19 passes it as a normal prop) and are positioned by HeroMechanism.
 */
import type { Ref } from "react";
import { CAM_PATH, GEAR_A, GEAR_B, GEAR_C, PATHS, PAWL, PAWL_PATH, RADII, springPath, followerX } from "@/lib/mechanism";

export const INK = "#e6eefa";
export const PAPER = "#123766";
export const ACCENT = "#ffb547";
const MUTED = "#c9d7ec";
const CENTER_DASH = "14 4 3 4";

const ring = (n: number, radius: number, skipFirst = false) =>
  Array.from({ length: n }, (_, k) => (360 / n) * k)
    .filter((_, k) => !(skipFirst && k === 0))
    .map((deg) => [radius * Math.cos((deg * Math.PI) / 180), radius * Math.sin((deg * Math.PI) / 180)] as const);

function Holes({ n, radius, r, skipFirst }: { n: number; radius: number; r: number; skipFirst?: boolean }) {
  return ring(n, radius, skipFirst).map(([x, y], i) => (
    <circle key={i} cx={x.toFixed(2)} cy={y.toFixed(2)} r={r} fill="none" stroke={INK} strokeWidth="0.9" />
  ));
}

function PitchCircle({ r }: { r: number }) {
  return <circle r={r} fill="none" stroke={INK} strokeWidth="0.8" strokeDasharray="6 4" opacity="0.55" />;
}

/** Diagonal section hatching inside a vertical strip. */
function StripHatch({ x, y0, y1, w = 6, gap = 5 }: { x: number; y0: number; y1: number; w?: number; gap?: number }) {
  const lines = [];
  for (let y = y0; y + w <= y1 + 0.01; y += gap) lines.push(y);
  return lines.map((y) => (
    <line key={y} x1={x} y1={y + w} x2={x + w} y2={y} stroke={INK} strokeWidth="0.5" opacity="0.75" />
  ));
}

export function Cylinder() {
  return (
    <g>
      <rect x="253.38" y="30" width="60" height="12" fill="none" stroke={INK} strokeWidth="1.5" />
      {Array.from({ length: 8 }, (_, k) => (
        <line key={k} x1={255.4 + 7.5 * k} y1="42" x2={261.4 + 7.5 * k} y2="30" stroke={INK} strokeWidth="0.7" />
      ))}
      <path d="M259.38 42 V154 M307.38 42 V154" stroke={INK} strokeWidth="1.6" fill="none" />
      <path d="M253.38 42 V154 M313.38 42 V154" stroke={INK} strokeWidth="0.8" fill="none" />
      <StripHatch x={253.38} y0={42} y1={154} />
      <StripHatch x={307.38} y0={42} y1={154} />
      <line x1="283.38" y1="22" x2="283.38" y2="170" stroke={ACCENT} strokeWidth="0.8" strokeDasharray={CENTER_DASH} />
    </g>
  );
}

export function Piston({ ref, y }: { ref: Ref<SVGGElement>; y: number }) {
  return (
    <g ref={ref} transform={`translate(0 ${y.toFixed(2)})`}>
      <rect x="261.38" y="-24" width="44" height="36" fill={PAPER} stroke={INK} strokeWidth="1.6" />
      <line x1="261.38" y1="-17" x2="305.38" y2="-17" stroke={INK} strokeWidth="0.8" />
      <line x1="261.38" y1="-12" x2="305.38" y2="-12" stroke={INK} strokeWidth="0.8" />
      <circle cx="283.38" cy="0" r="4" fill={PAPER} stroke={INK} strokeWidth="1.3" />
    </g>
  );
}

interface GearProps {
  ref: Ref<SVGGElement>;
  angle: number;
}

function GearBody({ d }: { d: string }) {
  return <path d={d} fill={PAPER} stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />;
}

/** Gear A — 16 teeth, the ratchet wheel and the master gear. */
export function GearA({ ref, angle }: GearProps) {
  const lightening = ring(5, 42.6);
  return (
    <g transform={`translate(${GEAR_A.cx} ${GEAR_A.cy})`}>
      <g ref={ref} className="gear-hit" transform={`rotate(${angle})`}>
        <GearBody d={PATHS.gearA} />
        <PitchCircle r={RADII.A.pitch} />
        <circle r="20.6" fill="none" stroke={INK} strokeWidth="1.4" />
        <circle r="9.3" fill="none" stroke={INK} strokeWidth="1.2" />
        {lightening.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x.toFixed(2)} cy={y.toFixed(2)} r="12.3" fill="none" stroke={INK} strokeWidth="1.2" />
            <circle cx={x.toFixed(2)} cy={y.toFixed(2)} r="9.8" fill="none" stroke={INK} strokeWidth="0.5" opacity="0.6" />
          </g>
        ))}
        <circle r="57" fill="none" stroke={INK} strokeWidth="1" />
        <circle r="24.5" fill="none" stroke={INK} strokeWidth="0.7" opacity="0.8" />
        <Holes n={6} radius={15} r={1.9} />
        <path d="M-2.4 -9 V-12.2 H2.4 V-9" fill="none" stroke={INK} strokeWidth="1.1" />
      </g>
    </g>
  );
}

/** Gear B — 10 teeth, carries the crank pin. */
export function GearB({ ref, angle }: GearProps) {
  return (
    <g transform={`translate(${GEAR_B.cx} ${GEAR_B.cy})`}>
      <g ref={ref} className="gear-hit" transform={`rotate(${angle})`}>
        <GearBody d={PATHS.gearB} />
        <PitchCircle r={RADII.B.pitch} />
        <circle r="31" fill="none" stroke={INK} strokeWidth="1" />
        <Holes n={6} radius={21.5} r={2} skipFirst />
        <circle r="11" fill="none" stroke={INK} strokeWidth="1.4" />
        <circle r="5" fill="none" stroke={INK} strokeWidth="1.2" />
        <rect x="-6" y="-6" width="32" height="12" rx="6" fill={PAPER} stroke={INK} strokeWidth="1.5" />
        <circle cx="20" cy="0" r="3.5" fill={INK} />
        <circle r="4" fill={PAPER} stroke={INK} strokeWidth="1.3" />
      </g>
    </g>
  );
}

/** Gear C — 12 teeth, carries the cam. */
export function GearC({ ref, angle }: GearProps) {
  return (
    <g transform={`translate(${GEAR_C.cx} ${GEAR_C.cy})`}>
      <g ref={ref} className="gear-hit" transform={`rotate(${angle})`}>
        <GearBody d={PATHS.gearC} />
        <PitchCircle r={RADII.C.pitch} />
        <circle r="41" fill="none" stroke={INK} strokeWidth="1" />
        <Holes n={8} radius={38} r={1.4} />
        <circle r="14.9" fill="none" stroke={INK} strokeWidth="1.4" />
        <circle r="6.7" fill="none" stroke={INK} strokeWidth="1.2" />
        <path d={CAM_PATH} fill={PAPER} stroke={INK} strokeWidth="1.6" />
        <circle r="5" fill={PAPER} stroke={INK} strokeWidth="1.4" />
        <line x1="8" y1="0" x2="30" y2="0" stroke={ACCENT} strokeWidth="0.9" strokeDasharray="3 2" />
      </g>
    </g>
  );
}

export function ConnectingRod({ refOuter, refInner, x1, y1, y2 }: {
  refOuter: Ref<SVGLineElement>;
  refInner: Ref<SVGLineElement>;
  x1: number;
  y1: number;
  y2: number;
}) {
  const common = { x1: x1.toFixed(2), y1: y1.toFixed(2), x2: "283.38", y2: y2.toFixed(2), strokeLinecap: "round" as const };
  return (
    <>
      <line ref={refOuter} {...common} stroke={INK} strokeWidth="9" />
      <line ref={refInner} {...common} stroke={PAPER} strokeWidth="6" />
    </>
  );
}

export function CamFollower({ refFollower, refSpring, thetaC }: {
  refFollower: Ref<SVGGElement>;
  refSpring: Ref<SVGPathElement>;
  thetaC: number;
}) {
  const xf = followerX(thetaC);
  return (
    <>
      <rect x="434.92" y="280.32" width="12" height="9" fill={PAPER} stroke={INK} strokeWidth="1.4" />
      <rect x="434.92" y="303.32" width="12" height="9" fill={PAPER} stroke={INK} strokeWidth="1.4" />
      <line x1="426.92" y1="312.32" x2="454.92" y2="312.32" stroke={INK} strokeWidth="1.6" />
      {[0, 1, 2, 3, 4].map((k) => (
        <line key={k} x1={428.92 + 6 * k} y1="312.32" x2={422.92 + 6 * k} y2="320.32" stroke={INK} strokeWidth="0.8" />
      ))}
      <path ref={refSpring} d={springPath(xf)} fill="none" stroke={ACCENT} strokeWidth="1.5" strokeLinejoin="round" />
      <g ref={refFollower} transform={`translate(${xf.toFixed(2)} ${GEAR_C.cy})`}>
        <rect x="4" y="-3.5" width="124" height="7" fill={PAPER} stroke={INK} strokeWidth="1.3" />
        <rect x="106" y="-11" width="7" height="22" fill={PAPER} stroke={INK} strokeWidth="1.4" />
        <circle r="6" fill={PAPER} stroke={INK} strokeWidth="1.5" />
        <circle r="1.8" fill={INK} />
      </g>
    </>
  );
}

export function Pawl({ ref }: { ref: Ref<SVGGElement> }) {
  return (
    <g transform={`translate(${PAWL.pivot[0]} ${PAWL.pivot[1]})`}>
      <g transform={`rotate(${PAWL.angle})`}>
        <g ref={ref} transform="rotate(0)">
          <path d={PAWL_PATH} fill={PAPER} stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
          <line x1="9" y1="0" x2="34" y2="0" stroke={INK} strokeWidth="0.5" opacity="0.6" />
        </g>
      </g>
      <circle r="7" fill={PAPER} stroke={INK} strokeWidth="1.6" />
      <circle r="2.2" fill={INK} />
      <path d="M-6 10 q-10 8 -2 16 q8 8 -2 16" fill="none" stroke={ACCENT} strokeWidth="1.2" />
    </g>
  );
}

/* ---- tachometer: 0–120 RPM over a 270° scale ---- */
const TACH = { cx: 72, cy: 104, max: 120 } as const;
const tachAngle = (v: number) => 135 + (270 * v) / TACH.max;
const tp = (r: number, deg: number) =>
  [TACH.cx + r * Math.cos((deg * Math.PI) / 180), TACH.cy + r * Math.sin((deg * Math.PI) / 180)] as const;
function tachArc(r: number, v0: number, v1: number) {
  const [x0, y0] = tp(r, tachAngle(v0));
  const [x1, y1] = tp(r, tachAngle(v1));
  const large = tachAngle(v1) - tachAngle(v0) > 180 ? 1 : 0;
  return `M${x0.toFixed(2)} ${y0.toFixed(2)} A${r} ${r} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
}
/** Needle rotation (deg) for an RPM value; the needle points up at rotate(0). */
export const needleAngle = (rpm: number) => -135 + (270 * Math.min(rpm, TACH.max + 6)) / TACH.max;

export function Tachometer({ refNeedle, refReadout }: { refNeedle: Ref<SVGGElement>; refReadout: Ref<SVGTextElement> }) {
  const ticks = [];
  for (let v = 0; v <= TACH.max; v += 5) {
    const [len, w] = v % 20 === 0 ? [6, 1.2] : v % 10 === 0 ? [4, 0.8] : [2.4, 0.6];
    const [x0, y0] = tp(34, tachAngle(v));
    const [x1, y1] = tp(34 - len, tachAngle(v));
    ticks.push(<line key={v} x1={x0.toFixed(2)} y1={y0.toFixed(2)} x2={x1.toFixed(2)} y2={y1.toFixed(2)} stroke={INK} strokeWidth={w} />);
  }
  return (
    <g>
      <circle cx={TACH.cx} cy={TACH.cy} r="40" fill={PAPER} stroke={INK} strokeWidth="1.6" />
      <path d={tachArc(34, 0, TACH.max)} fill="none" stroke={INK} strokeWidth="0.7" />
      <path d={tachArc(31.6, 90, TACH.max)} fill="none" stroke={ACCENT} strokeWidth="3" opacity="0.85" />
      {ticks}
      {[0, 20, 40, 60, 80, 100, 120].map((v) => {
        const [x, y] = tp(22.5, tachAngle(v));
        return (
          <text key={v} x={x.toFixed(2)} y={(y + 2.1).toFixed(2)} textAnchor="middle" fontSize="6" fill={INK}>
            {v}
          </text>
        );
      })}
      <text x={TACH.cx} y={TACH.cy + 15} textAnchor="middle" fontSize="5" letterSpacing="0.6" fill={MUTED}>
        RPM
      </text>
      <rect x={TACH.cx - 12} y={TACH.cy + 19} width="24" height="10" fill={PAPER} stroke={INK} strokeWidth="0.8" />
      <text ref={refReadout} x={TACH.cx} y={TACH.cy + 26.4} textAnchor="middle" fontSize="7" fill={ACCENT}>
        002
      </text>
      <g transform={`translate(${TACH.cx} ${TACH.cy})`}>
        <g ref={refNeedle} transform={`rotate(${needleAngle(2).toFixed(1)})`}>
          <path d="M-2.2 5 L0 -29 L2.2 5 Z" fill={ACCENT} />
        </g>
        <circle r="4" fill={PAPER} stroke={INK} strokeWidth="1.3" />
      </g>
    </g>
  );
}

export function CenterLines() {
  const dash = { stroke: ACCENT, strokeWidth: 0.8, strokeDasharray: CENTER_DASH };
  const join = { stroke: ACCENT, strokeWidth: 0.8, strokeDasharray: "3 3" };
  return (
    <g>
      <line x1="94" y1={GEAR_A.cy} x2="286" y2={GEAR_A.cy} {...dash} />
      <line x1={GEAR_A.cx} y1="204" x2={GEAR_A.cx} y2="396" {...dash} />
      <line x1={GEAR_B.cx - 64} y1={GEAR_B.cy} x2={GEAR_B.cx + 64} y2={GEAR_B.cy} {...dash} />
      <line x1={GEAR_B.cx} y1={GEAR_B.cy - 64} x2={GEAR_B.cx} y2={GEAR_B.cy + 64} {...dash} />
      <line x1="280.92" y1={GEAR_C.cy} x2="432.92" y2={GEAR_C.cy} {...dash} />
      <line x1={GEAR_C.cx} y1="220.32" x2={GEAR_C.cx} y2="372.32" {...dash} />
      <line x1={GEAR_A.cx} y1={GEAR_A.cy} x2={GEAR_B.cx} y2={GEAR_B.cy} {...join} />
      <line x1={GEAR_B.cx} y1={GEAR_B.cy} x2={GEAR_C.cx} y2={GEAR_C.cy} {...join} />
    </g>
  );
}

export function Dimensions() {
  const r = RADII.A.tip;
  const x1 = GEAR_A.cx - r;
  const x2 = GEAR_A.cx + r;
  return (
    <g fontSize="9" fill={INK}>
      <line x1={x1} y1="402" x2={x2} y2="402" stroke={INK} strokeWidth="0.8" />
      <path d={`M${x1} 402 l8 -3 v6 Z M${x2} 402 l-8 -3 v6 Z`} fill={INK} />
      <line x1={x1} y1="384" x2={x1} y2="408" stroke={INK} strokeWidth="0.6" />
      <line x1={x2} y1="384" x2={x2} y2="408" stroke={INK} strokeWidth="0.6" />
      <text x={GEAR_A.cx} y="420" textAnchor="middle">
        Ø{(2 * r).toFixed(1)} · Z={GEAR_A.z} · m{GEAR_A.m}
      </text>
      <text x="377" y="380">
        i = {GEAR_A.z} : {GEAR_B.z} : {GEAR_C.z}
      </text>
    </g>
  );
}

const BALLOONS = [
  { n: 1, at: [44, 352], to: [81.8, 311.6] },
  { n: 2, at: [345.38, 60], to: [313.38, 80] },
  { n: 3, at: [506.92, 252.32], to: [486.92, 288.32] },
  { n: 4, at: [130, 48], to: [104, 78] },
] as const;

/** Numbered balloons pointing at each sub-mechanism, keyed to the caption. */
export function Balloons() {
  return (
    <g>
      {BALLOONS.map(({ n, at, to }) => (
        <g key={n}>
          <line x1={at[0]} y1={at[1]} x2={to[0]} y2={to[1]} stroke={INK} strokeWidth="0.8" />
          <circle cx={to[0]} cy={to[1]} r="2" fill={INK} />
          <circle cx={at[0]} cy={at[1]} r="11" fill={PAPER} stroke={INK} strokeWidth="1.2" />
          <text x={at[0]} y={at[1] + 4} textAnchor="middle" fontSize="11" fill={INK}>
            {n}
          </text>
        </g>
      ))}
    </g>
  );
}
